import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Singleuser.css";
export const SingleUser = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();
    const [loading,setLoading] = useState(true);
    
  useEffect(() => {
    setLoading(true);
    const getData = async() => {
        try{
            let data = await fetch(`http://localhost:7448/social/user/specificuser/${id}`);
            data = await data.json();
            setUserDetails(data)
            setLoading(false);
        }catch(err){
            console.log(err);
        }
      }
    getData()
  },[id])

  
  return (
    <div className="frame">
        {loading?<div className="spinner-grow" role="status">
  <span className="sr-only">Loading...</span>
</div> : <>
      <input id="slider" className="customSlider" type="checkbox" />
      <label htmlFor="slider"></label>

      <div className="wrapper">

        <div className="profile">
          <img
          alt="profile"
            src={userDetails.profilePic?userDetails.profilePic:"https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif"}
            className="thumbnail"
            
          />
          <div className="check">
            <i className="fas fa-check"></i>
          </div>
          <span className="name">{userDetails.name}</span>
          <p className="m-0"> <small className="text-muted">{userDetails.username}</small></p>
          <p className="title">{userDetails.profession?.setUserDetails.profession}</p>
          <p className="description">
            {userDetails.aboutme?.userDetails.aboutme}
          </p>
          <button type="button" className="btn">
            Follow
          </button>
        </div>

        <div className="social-icons">
          <div className="icon">
            <a href="/">
              <i className="fab fa-dribbble"></i>
            </a>
            <h4>12.8k</h4>
            <p>Followers</p>
          </div>

          <div className="icon">
            <a href="/">
              <i className="fab fa-behance"></i>
            </a>
            <h4>12.8k</h4>
            <p>Followers</p>
          </div>

          <div className="icon">
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <h4>12.8k</h4>
            <p>Followers</p>
          </div>
        </div>
      </div>
      </> }
       
    </div>
  );
};
