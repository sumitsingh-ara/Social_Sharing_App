import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Singleuser.css";
export const SingleUser = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    
  useEffect(() => {
    setLoading(true);
    const getData = async() => {
        try{
            let data = await fetch(`http://localhost:7448/social/user/specificuser/${id}`);
            data = await data.json();
            setUserDetails(data)
            setLoading(false);
        }catch(err){
            setError(true);
        }
      }
    getData()
  },[id])

  
  return (
    <div className="frame">
        {loading?<div className="spinner-grow mt-5" role="status">
  <span className="sr-only">Loading...</span>
</div> :error?<><h1>SOmething went wrong</h1></>: <>
      <input id="slider" className="customSlider" type="checkbox" />
      <label htmlFor="slider"></label>

      <div className="wrapper">

        <div className="profile">
          <img
          alt="profile"
            src={userDetails.profilePic.image?userDetails.profilePic.image:"https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif"}
            className="thumbnail"
            
          />
          <div className="check">
            {userDetails.accountStatus.verified?<i className="fas fa-check"></i>:""}
          </div>
          <span className="name">{userDetails.name}</span>
          <p className="m-0"> <small className="text-muted">{userDetails.username} {userDetails.accountStatus.verified? <i class="fa fa-solid fa-certificate text-success"></i>:""}</small></p>
          <p className="title">{userDetails.profession?.setUserDetails.profession}</p>
          <p className="description">
            {userDetails.aboutme?.userDetails.aboutme}
          </p>
          <button type="button" className="btn">
            <a className="text-decoration-none text-white"  href={`mailto:${userDetails.email}`}>Contact me</a>
          </button>
        </div>

        <div className="social-icons">
          <div className="icon">
            <a href="/">
              <i className="fab fa-dribbble"></i>
            </a>
            <h4>{userDetails.postCount >= 1000
              ? `${(userDetails.postCount / 1000).toFixed(2)}K`
              : userDetails.postCount}</h4>
            <p>Posts</p>
          </div>

          <div className="icon">
            <a href="/">
              <i className="fab fa-behance"></i>
            </a>
            <h4>{userDetails.likesCount >= 1000
              ? `${(userDetails.likesCount / 1000).toFixed(2)}K`
              : userDetails.likesCount}</h4>
            <p>Likes</p>
          </div>

          <div className="icon">
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <h4>{userDetails.views >= 1000
              ? `${(userDetails.views / 1000).toFixed(2)}K`
              : userDetails.views}</h4>
            <p>Views</p>
          </div>
        </div>
      </div>
      </> }
       
    </div>
  );
};
