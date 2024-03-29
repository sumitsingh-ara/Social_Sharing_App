import "./UserProfile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export const UserProfile = ({ setEdit, edit, userDetails }) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };
  const { token } = useSelector((store) => store.auth);
  const { id } = useSelector((store) => store.users);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    twitter: "",
    instagram: "",
    github: "",
    linkedin: "",
    aboutme: "",
  });

  useEffect(() => {
    setFormData({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      twitter: userDetails.socialLinks.twitter,
      instagram: userDetails.socialLinks.instagram,
      github: userDetails.socialLinks.github,
      linkedin: userDetails.socialLinks.linkedin,
      aboutme: userDetails.aboutme,
    });
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("name", formData.name);
    formdata.append("twitter", formData.twitter);
    formdata.append("linkedin", formData.linkedin);
    formdata.append("instagram", formData.instagram);
    formdata.append("github", formData.github);
    formdata.append("aboutme", formData.aboutme);
    formdata.append("image", file);
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        id: id,
      },
      body: formdata,
      redirect: "follow",
    };
    try {
      let data = await fetch(
        "http://localhost:7448/social/user/update",
        requestOptions
      );
      data = await data.json();
      setLoading(false);
      if (data.status) {
        setEdit(!edit);
      } else alert("wrong credentials");
    } catch (err) {
      setLoading(false);
      alert("Failed to update,wrong credentials");
    }
  };

  return (
    <>
      {!loading ? (
        <div className="container editProfileViews rounded bg-white">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center">
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <img
                      width="150px"
                      type="file"
                      className="rounded-circle mt-1"
                      src={
                        userDetails.profilePic.image
                          ? userDetails.profilePic.image
                          : "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
                      }
                      alt="k"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </label>

                  <input id="file-input" type="file" onChange={saveFile} />
                </div>

                <span className="font-weight-bold">
                  {userDetails.name} ({userDetails.username})
                </span>
                <span className="text-black-50">{userDetails.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-8 border-right text-center">
              <form onSubmit={handleSubmit} className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-center">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Name</label>
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">About me</label>
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      id="aboutme"
                      className="form-control"
                      placeholder="Enter something about yourself"
                      maxLength="100"
                      value={formData.aboutme}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="enter email"
                      value={formData.email}
                      disabled={true}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Password</label>
                    <input
                      required
                      type="password"
                      id="password"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="enter your old password"
                      value={formData.password}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Linkedin</label>
                    <input
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="enter linkedin connect"
                      value={formData.linkedin}
                      id="linkedin"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Instagram</label>
                    <input
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="enter instagram connect"
                      value={formData.instagram}
                      id="instagram"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Twitter</label>
                    <input
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="enter twitter connect"
                      value={formData.twitter}
                      id="twitter"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Github</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="enter github connect"
                      value={formData.github}
                      onChange={handleChange}
                      id="github"
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={() => {
                      setEdit(!edit);
                    }}
                    className="btn btn-primary profile-button mx-2"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
          <div className="spinner-grow text-info" role="status"></div>
          <div className="spinner-grow text-light" role="status"></div>
          <div className="spinner-grow text-dark" role="status"></div>
        </>
      )}
    </>
  );
};
