import { useParams } from "react-router-dom";
import { useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import {resetPasswordCall} from "../../Redux/Auth/action";
export const ResetPassword = () => {
    const dispatch = useDispatch();
    const{id,token} = useParams();
    const {loading,message,error} = useSelector((store) => store.auth)
    console.log(id,token);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const payload ={
    user:{
        id: id,
        token: token
    },
    body:{
        password: password,
        password2: password2
    }
  }

  return (
    <>
      <section className="vh-70 mobileViewResetPassword">
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                        type="password"
                        placeholder="Enter password"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        value={password2}
                        onChange={(e) => {
                          setPassword2(e.target.value);
                        }}
                        required
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="text-info h5">
                        {loading? <div className="spinner-grow" role="status">
          </div>:error?message:""}
                    </div>

                    <button className="btn btn-success mt-3" onClick={() => {
                        dispatch(resetPasswordCall(payload))
                    }}>
                      Reset Password
                    </button>
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
