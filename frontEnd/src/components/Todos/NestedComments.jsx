import {Link,useNavigate,useParams} from "react-router-dom";
import {useState,useRef} from "react";
import {useSelector,useDispatch} from "react-redux";
import {makeNestedNewCommentOnReply,deleteNestedCommentReplies,editingNestedReply} from "../../Redux/Comments/action"
export const NestedComments = ({replies,comment}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userName } = useSelector((store) => store.users);
    const {token } = useSelector((store) => store.auth);
    const {postId} = useParams();
    const [nestedReply, setNestedReply] = useState(false);
  const [nestedEdit, setNestedEdit] = useState(false);
  const nestedReplies = useRef(null);
  const [nestedNestComment, setNestedNestComment] = useState("");
    const url =
    "https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif";
    return(
        <div
        className="container mainCommentBoxNested"
      >
        <div className=" userCommentorDetails">
          <div>
            {" "}
            <img
              className="img-fluid img-responsive rounded-circle mr-2"
              src={url}
              width="38"
              alt="profile"
            />
          </div>
          <div style={{fontSize:"2vh"}}> Replied by&nbsp;
            <Link to={`/user/${replies.user}`}>
            {userName === replies.user?"you":replies.user}
            </Link>
           
          </div>
          <div>2 hours ago</div>
        </div>
        {/* comment view */}
        <div className="commentContainer mt-1 text-center">
          {replies.comment}
        </div>
        {/* options buttons */}
        <div className="commentOptioner">
          <div className="realOptionsComment reply px-2 ">
            {userName === replies.user ? (
              <small>
                <i
                  onClick={() => {
                   dispatch(deleteNestedCommentReplies({
                    token:token,
                    commentId:comment._id,
                    repliedId:replies.uniqueId,
                    postId:postId
                   }))
                  }}
                  className="fa fa-solid fa-trash px-2"
                ></i>
              </small>
            ) : (
              ""
            )}

            <small>
              <i
                onClick={() => {
                  if (!token) return navigate("/login");
                  setNestedEdit(false);
                  setNestedReply(!nestedReply);
                  setTimeout(() => {
                    nestedReplies.current.focus();
                  }, 50);
                }}
                className="fa fa-solid fa-reply px-2"
              ></i>
            </small>
            {userName === replies.user ? (
              <small>
                <i
                  onClick={() => {
                    if (!token) return navigate("/login");
                    setNestedReply(false);
                    setNestedEdit(!nestedEdit);
                    setTimeout(() => {
                      nestedReplies.current.focus();
                    }, 50);
                  }}
                  className="fa fa-solid fa-pen px-2 border-r-4 rounded-circle"
                ></i>
              </small>
            ) : (
              ""
            )}
            <small>
              <i className="fa fa-light fa-thumbs-up hover-on-like px-2"></i>
            </small>
          </div>
        </div>
        {/* reply or edit boxes */}
        {!nestedReply && !nestedEdit ? (
          ""
        ) : (
          <div className="input-group ">
            <input
              ref={nestedReplies}
              value={nestedNestComment}
              placeholder="reply"
              onChange={(e) => {
                setNestedNestComment(e.target.value);
              }}
              type="text"
              className="form-control"
            />
            <div className="input-group-append">
              {nestedReply ? (
                <button
                  onClick={() => {
                    if(!nestedNestComment.trim()) return;
                    dispatch(
                      makeNestedNewCommentOnReply({
                        id: userName,
                        token: token,
                        commentId: comment._id,
                        comment: nestedNestComment,
                        postId: postId
                      })
                    );
                    setNestedNestComment("")
                  }}
                  className="btn btn-outline-secondary"
                  type="button"
                >
                  Reply
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>{
                    if(!nestedNestComment.trim())return;
                    dispatch(editingNestedReply({
                      id: userName,
                      token: token,
                      commentId: comment._id,
                      editedcomment: nestedNestComment,
                      repliedId:replies.uniqueId,
                      postId: postId
                    }))
                    setNestedNestComment("")
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
}