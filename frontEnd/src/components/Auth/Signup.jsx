import { Link,Navigate } from "react-router-dom";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {registerNew} from "../../Redux/Auth/action";
export const Signup = () => {
  const [available,setAvailable] = useState(null);
  const dispatch = useDispatch();
  const {isAuth,message} = useSelector((store) => store.auth)
  const [formData,setFormData] = useState({
    username:"punisher",
    name:"Sumit Singh",
    email:"sumit47919@gmail.com",
    password:"123456789",
    profilePic:""
  })

  useEffect(() => {
    setAvailable(null)
  }, [])
  


  if(isAuth) {
    return <Navigate to="/"></Navigate>
  }
  const handleChange=(e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  const handleSubmit =(e) => {
    e.preventDefault();
    dispatch(registerNew(formData));
    
  }
  return (
    <>
      <section className="vh-60">
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
                        required
                          type="text"
                          placeholder="Choose a username"
                          id="username"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-2">
                        {available===true?"Available":available===false?"Not available":""}
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
                      <div>
                        {message}
                      </div>
                      <div className="d-flex justify-content-center">
                        <input
                        onChange={handleChange}
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-4 mb-4"
                          value="Register"
                        >
                        </input>
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
