import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import outline1 from "../pictures/outline1.png"

const Login = () => {

  const history = useHistory();

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const { setUserData } = useUserContext();

  const { REACT_APP_BACKEND_URL } = process.env;  // ToDo: ohter url in app needs to read this 

  const url = `${REACT_APP_BACKEND_URL}/users/login`;

  //  const oneUser = users && users.map((user)=>` The username is ${user.username}` )
  const login = (e) => {
    e.preventDefault();
    if (!userInput.username || !userInput.password) {
      return alert("Please enter a username and a password");
    }
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("ERROR");
      })
      .then((data) => {
        setUserData(data);
        history.push('/listSensors')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    // e.target contains value + name + ...
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  // console.log(userInput);

  return (
    <div className=" container9 row" >
      <div className="container col s4 login_container">

        <div className="con1">
          <h3 className="loginHeading"> Login into your account: </h3>
          <form>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={userInput.username}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={userInput.password}
            />
          </form>
          <button
            className="my_button2 #fdd835 yellow right darken-1 btn waves-effect waves-light login_button pulse"
            type="submit"
            onClick={login}
          >
            Login
            <i className="material-icons right " />
          </button>
        </div>
      </div>
      <div className="container10 col s6 ">
        <img className="outline1" src={outline1} />
      </div>
    </div>
  );
};

export default Login;
