import { useSelector } from "react-redux";
import { useState } from "react";
export const ContactAdmin = () => {
  const [username, setUsername] = useState("");
  const [deta, setDeta] = useState("");
  const { admin } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  return (
    <section className="mx-auto w-75" style={{ marginTop: "15vh" }}>
      <h2 className="h1-responsive font-weight-bold text-center my-4">
        Contact us
      </h2>
      <p className="text-center w-responsive mx-auto mb-5">
        Do you have any questions? Please do not hesitate to contact us
        directly. Our team will come back to you within a matter of hours to
        help you.
      </p>
      <div className="container">
        <a href="geo:124.028582,-29.201930" target="blank" className="m-5">
          <i className="fas fa-map-marker-alt fa-2x"></i>
        </a>

        <a href="tel:+918507547919" className="text-decoration-none m-5">
          <i className="fas fa-phone mt-4 fa-2x"></i>
        </a>

        <a href="mailto:singhsumitkumar503@gmail.com" className="m-5">
          <i className="fas fa-envelope mt-4 fa-2x"></i>
        </a>
      </div>
      {admin && (
        <div className="m-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username of the person blocking"
          />
          <input
            type="text"
            value={deta}
            onChange={(e) => setDeta(e.target.value)}
          />
          <button
            onClick={() => {
              let method = deta === "true" ? true : false;
              const ban = async () => {
                try {
                  let data = await fetch(
                    `https://socialsharekaro.herokuapp.com/banuser/${username}`,
                    {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        deta: method,
                      }),
                    }
                  );
                  data = await data.json();
                  console.log(data);
                } catch (err) {
                  console.log(err.message);
                }
              };
              ban();
            }}
            className="btn btn-danger"
          >
            Ban/Unban user
          </button>
        </div>
      )}
      <h1
        className="h4"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        Made with ❤️ by{" "}
        <a
          href="https://www.linkedin.com/in/sumit-singh-ara/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sumit
        </a>{" "}
      </h1>
    </section>
  );
};
