import "./Todo.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export const Comments = ({comment}) => {
    const {userName} = useSelector((store) => store.users);
    const url="https://media1.giphy.com/media/Oj5w7lOaR5ieNpuBhn/giphy.gif?cid=ecf05e47tnn5gp3m9bsqxf6zdnubk6e51c2o50ao8vpryyhz&rid=giphy.gif&ct=g"
  return (
    <>
      <div className="container mt-1">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                  <img
                    alt="images"
                    src={url}
                    width="38"
                   
                    className="img-fluid img-responsive rounded-circle mr-2 "
                  />
                  <span>
                    <small className="font-weight-bold text-primary">
                    <Link to={`/user/${comment.user.username}`}>
                 {comment.user.username}
                </Link>
                    </small>{" "}
                    <small className="font-weight-bold">
                     {comment.comment}
                    </small>
                  </span>
                </div>

                <small>2 days ago</small>
              </div>

              <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="reply px-4">
                  {userName===comment.user.username?<small>Delete</small>:""}
                  <span className="dots"></span>
                  <small>Reply</small>
                  <span className="dots"></span>
                  {userName===comment.user.username?<small>Edit</small>:""}
                </div>
                <div className="icons align-items-center">
                  <i className="fa fa-star text-warning"></i>
                  <i class="fa fa-light fa-thumbs-up text-secondary hover-on-like" ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
