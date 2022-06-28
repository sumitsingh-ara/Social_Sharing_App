

export const NestedCommentView =({comment,nestedShow,setNestedShow}) => {

    return<>
     {comment.nestedcomments.length>0?
          <div className="badge align-items-center nestedDisplayChecker">
            <span className="text-primary">
              Load ({comment.nestedcomments.length}) Replies{" "}
              {nestedShow ? "ON" : "OFF"}
            </span>
            <span className="form-check form-switch">
              <input
                disabled={comment.nestedcomments.length === 0}
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onClick={() => {
                  setNestedShow(!nestedShow);
                }}
                defaultChecked={nestedShow}
              />
            </span>
          </div>:""}
    </>
}