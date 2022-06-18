import { Link, Navigate,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tryLogin } from "../../Redux/Auth/action";
import "./Auth.css";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordBox, setPasswordBox] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const { isAuth, message, loading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "sumit47919@gmail.com",
    password: "123456789",
  });
  const [resetEmail, setResetEmail] = useState("");
  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tryLogin(formData));
  };
  const sendPassword = async () => {
    console.log("sendo",resetEmail)
    let data
    try{
       data = await fetch("http://localhost:7448/social/resetpassword",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          "email":resetEmail
        })
      })
      data = await data.json()
      setResetMessage(data.message)
    }catch(error){
      //  console.log("Eror from sender",error)
      setResetMessage(error.message)
    }
  };
  return<>
   {passwordBox ? 
    <section className="vh-60">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <h2 className="text-uppercase h4 text-center mb-4">
                    Reset your password
                  </h2>
                    <div className="form-outline mb-4">
                      <input
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                        }}
                        required
                        type="email"
                        placeholder="Enter email here"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <button onClick={()=>{ 
                        sendPassword()
                      }}>Send Password</button>
                    </div>
                    <div className="text-info h5">{resetMessage} <Link to={`https://mail.google.com/mail/u/0/#inbox`} target="_blank">Check Mail</Link></div>
                 
                  <button className="btn btn-danger mt-3" onClick={()=>{
                    navigate(-1)
                  }} >
                    GO Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   : 
    <section className="vh-60">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <h2 className="text-uppercase h4 text-center mb-4">
                    Login with email and password
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
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

                    <div className="form-outline mb-4">
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
                      {loading ? (
                        <div className="spinner-grow" role="status"></div>
                      ) : (
                        <span className="text-danger p2">
                          {message === "Wrong Credentials" ? (
                            <>
                              {message}{" "}
                              <button className="btn btn-danger" onClick={() =>{
                                setPasswordBox(true)
                              }}>Reset Password</button>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-4 m-4 mb-2"
                        value="Login"
                      ></input>
                      <button className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body mt-4 mb-2">
                        Login with google
                      </button>
                    </div>
                    <p className="text-center text-muted mt-4 mb-4">
                      Don't have an account?{" "}
                      <Link to="/signup" className="fw-bold text-body">
                        <u>Signup here</u>
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
}</>
};
