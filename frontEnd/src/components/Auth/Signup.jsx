import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  registerNew,
  checkUsername,
  setMessage,resetMessage
} from "../../Redux/Auth/action";
export const Signup = () => {
  const [file, setFile] = useState();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };
  const dispatch = useDispatch();
  const { isAuth, message, available, loading } = useSelector(
    (store) => store.auth
  );
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(resetMessage())
    if(formData.username.trim().length>4){
      dispatch(setMessage("Checking"))
      dispatch(
        checkUsername({
          username: formData.username,
        })
      )
    }else if(formData.username.trim()){
      dispatch(setMessage("Username must be of 5 chars"))
    }else{
      dispatch(resetMessage())
    }
    //eslint-disable-next-line
  },[formData?.username])

  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }
  const handleChange = (e) => {
    dispatch(resetMessage())
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password.length <=7  || formData.password.length >=21)return alert("Please choose a password between 8 to 20 characters");
    var formdata = new FormData();
    formdata.append("username", formData.username);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("name", formData.name);
    formdata.append("image", file);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    
    // fetch("http://localhost:7448/social/register", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    //e.preventDefault();
    // let newData ={...formData,image:image}
    if (available === true) dispatch(registerNew(requestOptions));
  };
  return (
    <>
      <section className="vh-80">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body">
                    <h2 className="text-uppercase text-center mb-2">
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                        <input
                          value={formData.username}
                          onChange={handleChange}
                          pattern="[^\s]+"
                          required
                          type="text"
                          placeholder="username without spaces"
                          id="username"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-2">
                        <input
                          value={formData.name}
                          onChange={handleChange}
                          required
                          type="text"
                          placeholder="Enter your name here"
                          id="name"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <input
                          value={formData.email}
                          onChange={handleChange}
                          required
                          type="email"
                          id="email"
                          placeholder="Enter email address"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <input
                          value={formData.password}
                          onChange={handleChange}
                          required
                          type="password"
                          placeholder="Enter password here"
                          id="password"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-2">
                        <label className="form-control" htmlFor="image">
                          Upload profile image
                        </label>
                        <input
                          onChange={saveFile}
                          type="file"
                          placeholder="Upload image"
                          name="image"
                          id="image"
                          className="form-control form-control-lg d-none"
                        />
                      </div>
                      <div>
                        {loading ? (
                          <>
                          <div className="spinner-grow" role="status"></div>
                          {message}
                          </>
                        ) : (
                          <span className={`p2 ${message==="available"?"text-success":"text-danger"}`}>
                            {message}
                          </span>
                        )}
                      </div>
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-4 mb-4"
                          value="Register"
                        ></input>
                      </div>

                      <p className="text-center text-muted mt-2 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
