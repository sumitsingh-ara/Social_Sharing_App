import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import "./Singleuser.css";
import {UserProfile} from './UserProfile';
export const SingleUser = () => {
  const { ids } = useParams();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {token} = useSelector((store) => store.auth);
  const [messageShow,setMessageShow] = useState(false);
  const {id,userName} = useSelector((store) => store.users);
  const [edit,setEdit] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        let data = await fetch(
          `https://socialsharekaro.herokuapp.com/social/user/specificuser/${ids}`
        );
        data = await data.json();
        setUserDetails(data);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    getData();
  }, [ids,edit]);

  const verifyEmail = async() => {
    setLoading(true);
    try{
      let data = await fetch(`https://socialsharekaro.herokuapp.com/social/user//specificuser/emailverify/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
          data = await data.json();
          setLoading(false);
          if(data.status)setMessageShow("Mail sent ,please check your mail");
          else{
            setMessageShow("Mail not sent,try again")
            setTimeout(() => {
              setMessageShow(false);
            },2000)
          }
    }catch(err) {
      setError(true);
    }
  };

  return (
    <div className="frame">
      {loading ? (
        <div className="spinner-grow mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <>
          <h1>SOmething went wrong</h1>
        </>
      ) :!edit ?(
        <>
          <input id="slider" className="customSlider" type="checkbox" />
          <label htmlFor="slider"></label>

          <div className="wrapper">
            {userName===ids&&<button onClick={()=>{
              setEdit(!edit)
            }} className="btn btn-outline-success">Edit profile</button>}
            <div className="profile">
              <img
                alt="profile"
                src={
                  userDetails.profilePic.image
                    ? userDetails.profilePic.image
                    : "https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif"
                }
                className="thumbnail"
              />
              <div className="check">
                {userDetails.accountStatus.verified ? (
                  <i className="fas fa-check"></i>
                ) : (
                  ""
                )}
              </div>
              <span className="name">
                {userDetails.name}{" "}
                <span style={{ fontSize: "2.5vh" }}>
                  ({userDetails.username} )
                </span>
              </span>
              <p className="m-0">
                {" "}
                <small className="text-muted">
                  {userDetails.accountStatus.verified ? (
                    <i className="fa fa-solid fa-certificate text-success">
                      verified user
                    </i>
                  ) :userName===ids? (
                    <i onClick={verifyEmail}
                      style={{ cursor: "pointer" }}
                      className="fa fa-solid fa-certificate text-danger"
                    >
                      {messageShow?messageShow: "Not verfied user (verify now )"}
                    </i>
                  ): <i
                  class="fa fa-solid fa-certificate text-danger"
                >
                  Not verfied user
                </i>}
                </small>
              </p>
              <p className="title">
                {userDetails.profession?.setUserDetails.profession}
              </p>
              <p className="description text-wrap">
                {userDetails.aboutme?userDetails.aboutme:""}
              </p>
              <button type="button" className="btn">
                <a
                  className="text-decoration-none text-white"
                  href={`mailto:${userDetails.email}`}
                >
                  Contact me
                </a>
              </button>
            </div>

            <div className="social-icons">
              <div className="icon">
                <a href={userDetails.socialLinks.github}>
                <i class="fab fa-brands fa-github"></i>
                </a>
                <h4>
                  {userDetails.postCount >= 1000
                    ? `${(userDetails.postCount / 1000).toFixed(2)}K`
                    : userDetails.postCount}
                </h4>
                <p>Total Posts</p>
              </div>
              <div className="icon">
                <a href={userDetails.socialLinks.instagram}>
                <i class="fab fa-brands fa-instagram"></i>
                </a>
                <h4>
                  {userDetails.likesCount >= 1000
                    ? `${(userDetails.likesCount / 1000).toFixed(2)}K`
                    : userDetails.likesCount}
                </h4>
                <p>Total Likes</p>
              </div>
              <div className="icon">
                <a href={userDetails.socialLinks.linkedin}>
                <i class="fab fa-brands fa-linkedin"></i>
                </a>
                <h4>
                  { userDetails.likesCount * userDetails.views/userDetails.postCount}
                </h4>
                <p>Popularity</p>
              </div>
              
              <div className="icon">
                <a href={userDetails.socialLinks.twitter}>
                <i class="fa fa-brands fa-twitter"></i>
                </a>
                <h4>
                  {userDetails.views >= 1000
                    ? `${(userDetails.views / 1000).toFixed(2)}K`
                    : userDetails.views}
                </h4>
                <p>Total Views</p>
              </div>
            </div>
          </div>
        </>
      ):<UserProfile setEdit={setEdit} edit={edit} userDetails={userDetails}/>}
    </div>
  );
};
