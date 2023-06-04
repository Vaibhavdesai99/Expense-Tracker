import React, { useContext, useEffect, useRef, useState } from "react";
import "./Profile.css";
import AuthContext from "../Store/AuthContext";
import GitHubLogo from "@iconscout/react-unicons/icons/uil-github";
import InternetLogo from "@iconscout/react-unicons/icons/uil-browser";

const Profile = () => {
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.token;
  //console.log(idToken);

  const name = useRef();
  const photo_URL = useRef();

  // Form Submit Handler :
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredFullName = name.current.value;
    const enteredPhotoUrl = photo_URL.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            displayName: enteredFullName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("Successfully Updated User Details");
        console.log(data);
        name.current.value = "";
        photo_URL.current.value = "";
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
        console.log("something is wrong ");
      }
    } catch (error) {
      console.log("went wrong ", error);
    }
  };

  // Get request  :Edit User Details : pre-filled input fields
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          const userProfile = data.users[0];
          setFullName(userProfile.displayName);
          setPhotoUrl(userProfile.photoUrl);
        } else {
          const errorData = await response.json();
          setError(errorData.error.message);
        }
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    };

    fetchUserProfile();
  }, [idToken]);

  return (
    <div className="mainDiv">
      <div style={{ fontWeight: "bold", marginTop: "1rem" }}>
        Winners never quit , Quitters never Wins
      </div>
      <hr />
      <form onSubmit={formSubmitHandler}>
        <h1
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          Contact Details
        </h1>

        <div className="container">
          <div className="name">
            <GitHubLogo size="3rem" color="black" />
            <label>Full Name </label>
            <input
              type="text"
              ref={name}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="PhotoURL">
            <InternetLogo size="3rem" color="black" />
            <label>Profile Photo URL </label>
            <input
              type="url"
              ref={photo_URL}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="btn">
          <button type="submit">Update</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Profile;
