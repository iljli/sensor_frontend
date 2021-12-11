import { React, useState, useEffect } from "react";
import M from "materialize-css";
// import { TextInput, Button } from 'react-materialize';
import { useUserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
// import { useHistory } from "react-router-dom";
import outline2 from "../pictures/outline2.png"

/* ToDo:
    - activate button only if username and e-mail is provided
    - check if user already exist - do on backend
    - not sure about the intervall of (selectedSensor.config?.measurement_intervals)
*/

const ListSensors = (props) => {
  const { userData: loggedInUser } = useUserContext();
  const [userData, setUserData] = useState(loggedInUser);
  const [listOfSensors, setListOfSensors] = useState();
  const [selectedSensor, setSelectedSensor] = useState();

  // const history = useHistory();

  const errorHandler = (error) => {
    console.log(`Error Message: ${error.message}`); // does not actual handle the error
  };

  const getListOfSensors = (event) => {
    if (!loggedInUser) {
      // history.push('/login');
      throw new Error("User is not logged in");
    }

    const { REACT_APP_BACKEND_URL } = process.env;
    const apiUrl = `${REACT_APP_BACKEND_URL}/users/list_userdata/`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(userData),
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `An error has occured during the request. HTTP status code: ${response.status}`
          );
        return response.json();
      }, errorHandler)
      .then((value) => {
        setListOfSensors(value[0].sensors);
        // console.log(listOfSensors);
      });
  };

  const handleSelectSensor = (data) => {
    // console.log({ selectedSensor: data.sensor });
    setSelectedSensor(data.sensor);
    // console.log(data.sensor.sensors);
    // console.log(selectedSensor);
  };

  useEffect(getListOfSensors, [selectedSensor, loggedInUser]);

  return (
    // <div className="container4">

    <div className=" row" className="container4">


      <h4 className="info_123">Please select a sensor :</h4>
      <div className="sensor_list collection with-header  col s4">
        {listOfSensors &&
          listOfSensors.map((sensor, index) => (
            <a
              href="#!"
              className=" link_1 collection-item"
              key={index}
              onClick={() => handleSelectSensor({ sensor })}
            >
              <p className="sensor_list1"> {sensor?.name} - {sensor.location?.loc_name} </p>
            </a>
          ))}
      </div>

      {/* ToDo: intervall not sure */}


      <div className="selected_sensor col s6 m6">
        <div className=" my_card card ">
          <div className="my_card1 card-content ">
            {selectedSensor ? (
              <>
                <span className="card-title">
                  {selectedSensor && selectedSensor?.name}
                </span>
                <p>
                  Location:{" "}
                  {selectedSensor && selectedSensor.location?.loc_name}
                </p>
                <p>
                  Latitude:{" "}
                  {selectedSensor && selectedSensor.location?.loc_lat}{" "}
                  Longitude:{" "}
                  {selectedSensor && selectedSensor.location?.loc_lng}
                </p>
                <p>
                  Measurement intervall:{" "}
                  {selectedSensor &&
                    Math.round(
                      selectedSensor.config?.measurement_intervals / 60000
                    )}{" "}
                  Minutes
                </p>
                <div>
                  Alarms:
                  {selectedSensor &&
                    selectedSensor.config?.alarms.map((alarm, index) => (
                      <>
                        {" "}
                        <div>
                          Treshold {index + 1}: {alarm?.operator}
                          {alarm?.treshold} {alarm?.measurement_type}{" "}
                        </div>
                      </>
                    ))}
                </div>
              </>
            ) : <h4> </h4>}
          </div>
          {selectedSensor && (
            <div className="container5 card-action">
              <NavLink className="waves-effect waves-light btn-small" to={`/graph/${selectedSensor?._id}`}>
                Graph
              </NavLink>

              {/* <a class="waves-effect waves-light btn-small">
                                Configure a sensor
                            </a> */}
              {/* ToDo */}
              <NavLink className="waves-effect waves-light btn-small" to={`/createSensor`} >
                Create new Sensor
              </NavLink>


              {/* <a class="waves-effect waves-light btn-small">Delete a Sensor</a> */}
              {/* ToDo */}
            </div>
          )}
        </div>
      </div>



    </div >
    // </div>
  );
};

export default ListSensors;
