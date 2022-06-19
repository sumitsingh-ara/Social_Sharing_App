import "./Todo.css";
import { useState, useEffect } from "react";
export const Comments = () => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getAllComments = async () => {
      try {
        let data = await fetch("");
      } catch (err) {
        console.log(err);
      }
    };
  }, [comment]);

  const postComment = async () => {
    if (comment.trim() === "") return;
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div class="container mt-1">
        <div class="row  d-flex justify-content-center">
          <div class="col-md-8">
            <div class="headings d-flex justify-content-between align-items-center mb-3">
              <h5>Comments(6)</h5>

              <div class="buttons">
                <span class="badge bg-white d-flex flex-row align-items-center">
                  <span class="text-primary">Comments "ON"</span>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                    />
                  </div>
                </span>
              </div>
            </div>

            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <img
                    alt="images"
                    src="https://i.imgur.com/hczKIze.jpg"
                    width="30"
                    class="user-img rounded-circle mr-2"
                  />
                  <span>
                    <small class="font-weight-bold text-primary">
                      james_olesenn
                    </small>{" "}
                    <small class="font-weight-bold">
                      Hmm, This poster looks cool
                    </small>
                  </span>
                </div>

                <small>2 days ago</small>
              </div>

              <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                  <span class="dots"></span>
                  <small>Translate</small>
                </div>

                <div class="icons align-items-center">
                  <i class="fa fa-star text-warning"></i>
                  <i class="fa fa-check-circle-o check-icon"></i>
                </div>
              </div>
            </div>

            <div class="card p-3 mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <img
                    alt="images"
                    src="https://i.imgur.com/C4egmYM.jpg"
                    width="30"
                    class="user-img rounded-circle mr-2"
                  />
                  <span>
                    <small class="font-weight-bold text-primary">
                      olan_sams
                    </small>{" "}
                    <small class="font-weight-bold">
                      Loving your work and profile!{" "}
                    </small>
                  </span>
                </div>

                <small>3 days ago</small>
              </div>

              <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                  <span class="dots"></span>
                  <small>Translate</small>
                </div>

                <div class="icons align-items-center">
                  <i class="fa fa-check-circle-o check-icon text-primary"></i>
                </div>
              </div>
            </div>

            <div class="card p-3 mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <img
                    alt="images"
                    src="https://i.imgur.com/0LKZQYM.jpg"
                    width="30"
                    class="user-img rounded-circle mr-2"
                  />
                  <span>
                    <small class="font-weight-bold text-primary">
                      rashida_jones
                    </small>{" "}
                    <small class="font-weight-bold">
                      Really cool Which filter are you using?{" "}
                    </small>
                  </span>
                </div>

                <small>3 days ago</small>
              </div>

              <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                  <span class="dots"></span>
                  <small>Translate</small>
                </div>

                <div class="icons align-items-center">
                  <i class="fa fa-user-plus text-muted"></i>
                  <i class="fa fa-star-o text-muted"></i>
                  <i class="fa fa-check-circle-o check-icon text-primary"></i>
                </div>
              </div>
            </div>

            <div class="card p-3 mt-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <img
                    alt="images"
                    src="https://i.imgur.com/ZSkeqnd.jpg"
                    width="30"
                    class="user-img rounded-circle mr-2"
                  />
                  <span>
                    <small class="font-weight-bold text-primary">
                      simona_rnasi
                    </small>{" "}
                    <small class="font-weight-bold text-primary">
                      @macky_lones
                    </small>{" "}
                    <small class="font-weight-bold text-primary">
                      @rashida_jones
                    </small>{" "}
                    <small class="font-weight-bold">Thanks </small>
                  </span>
                </div>

                <small>3 days ago</small>
              </div>

              <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                  <span class="dots"></span>
                  <small>Translate</small>
                </div>

                <div class="icons align-items-center">
                  <i class="fa fa-check-circle-o check-icon text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
