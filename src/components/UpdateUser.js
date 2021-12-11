import { useState, React, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import M from "materialize-css";
import man from "../pictures/700.png"


const Update_user = () => {

  const { userData: loggedInUser } = useUserContext();
  const [userData, setUserData] = useState(loggedInUser);

  // console.log(loggedInUser);

  function notification(sensorId) {
    M.toast({ html: 'Userdata updated', classes: 'rounded' })
  }

  function postToBackend(data) {
    const { REACT_APP_BACKEND_URL } = process.env;

    const apiUrl = `${REACT_APP_BACKEND_URL}/users/update_userdata`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
      body: JSON.stringify(data)
    };

    fetch(apiUrl, options)
      .then((res => res.json()))
      .then(data => notification(data._id))
      .catch((err) => console.log(err));
  }

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    // console.log(userData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUserData = {
      _id: userData._id,
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password
    }

    // console.log(updatedUserData);
    postToBackend(updatedUserData);

  };



  useEffect(() => {
    M.updateTextFields(); // to shift the labels up
  }, [])

  return (
    <div className="container6">
      {/* <img className="man" src={man} /> */}
      <div class="row" className="container7">
        <form class="col s6 right-align" onSubmit={handleSubmit}>
          <div class="row">
            <div class=" input-field col s12">
              <input
                id="username"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="username"
                value={userData?.username}
              />
              <label >Username</label>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="first_name"
                value={userData?.first_name}
              />
              <label >First Name</label>
            </div>
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="last_name"
                value={userData?.last_name}
              />
              <label >Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                onChange={handleInputChange}
                name="password"
                value={userData?.password}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                onChange={handleInputChange}
                name="email"
                value={userData?.email}
              />
              <label >Email</label>
            </div>
          </div>
          {/* <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            pulse
          >
            UPDATE USER
            <i class="material-icons right">send</i>
          </button> */}


          <button className=" my_button1 btn waves-effect waves-light #26c6da cyan lighten-1" type="submit" name="action">Change Userdata
            <i class="material-icons right">send</i>
          </button>

        </form>
      </div>
    </div>
  );
};

export default Update_user;
