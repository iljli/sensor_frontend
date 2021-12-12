import { React, useState } from 'react';
import M from "materialize-css";
import { useUserContext } from "../context/UserContext";

/*
    ToDo:
    - check if sensor already exists (but: id is unique)
*/


//*************************************************************
const CreateSensor = props => {
    const [sensorData, setSensorData] = useState();
    const { userData: loggedInUser } = useUserContext();
    const [newSensorId, setNewSensorId] = useState();

    function notification(sensorId) {
        M.toast({ html: 'New sensor created', classes: 'rounded' })

        console.log(`New Sensor ID:${sensorId}`);
        setNewSensorId(sensorId);
    }

    function postToBackend(sensorData) {
        const { REACT_APP_BACKEND_URL } = process.env;

        const apiUrl = `${REACT_APP_BACKEND_URL}/sensordata/create_sensor`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
            body: JSON.stringify(sensorData)
        };

        fetch(apiUrl, options)
            .then((res => res.json()))
            .then(data => notification(data._id))
            .catch((err) => console.log(err));
    }

    const handleInputChange = (event) => {
        setSensorData({ ...sensorData, [event.target.name]: event.target.value });
        console.log(sensorData);
    }

    // console.log(loggedInUser._id)

    const handleSubmit = (event) => {
        event.preventDefault();

        const newSensor = {
            name: sensorData.sensorname,
            location: {
                loc_name: sensorData.location,
                loc_lat: sensorData.latitude,
                loc_lng: sensorData.longitude,
            },
            config: {
                measurement_intervals: sensorData.interval,
                alarms:                                        // ToDo: here only one arrayelement is used
                    [
                        {
                            treshold: sensorData.treshold,
                            measurement_type: sensorData.measurement,
                            operator: sensorData.operator,
                        }
                    ]
            },
            is_active: "true", // ToDo: needs to be set - sensorData.is_active
            user_id: loggedInUser._id,
        }

        console.log(newSensor);

        postToBackend(newSensor);
    }

    return (
        <div>
            <div className="row">
                <div class="col s2 m3 l4">

                </div>

                <form className="col s8 m6 l4 right-align" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="sensorname" type="text" className="validate"
                                onChange={handleInputChange}
                                name="sensorname"
                                value={sensorData?.sensorname}
                                required={true}
                            />
                            <label htmlFor="sensorname">Sensorname</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="location" type="text" className="validate"
                                onChange={handleInputChange}
                                name="location"
                                value={sensorData?.location}
                            />
                            <label htmlFor="location">Location</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="longitude" type="number" className="validate"
                                onChange={handleInputChange}
                                name="longitude"
                                value={sensorData?.longitude}
                            />
                            <label htmlFor="longitude">Longitude</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="latitude" type="number" className="validate"
                                onChange={handleInputChange}
                                name="latitude"
                                value={sensorData?.latitude}
                            />
                            <label htmlFor="latitude">Latitude</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="interval" type="number" className="validate"
                                onChange={handleInputChange}
                                name="interval"
                                value={sensorData?.interval}
                                required="true"
                            />
                            <label htmlFor="interval">Interval [minutes]</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <select className="browser-default" onChange={handleInputChange} name="measurement" value={sensorData?.treshold} >
                                <option value="temperature" disabled>Measurement</option>
                                <option value="temperature">Temperature</option>
                                <option value="humidity">Humidity</option>
                                <option value="pressure">Pressure</option>
                            </select>
                        </div>
                        <div className="input-field col s4">
                            <select className="browser-default" onChange={handleInputChange} name="operator" value={sensorData?.operator} >
                                <option value=">" disabled>Operator</option>
                                <option value=">">greater as</option>
                                <option value="<">lower than</option>
                            </select>
                        </div>
                        <div className="input-field col s4">
                            <input id="treshold" type="number" className="validate"
                                onChange={handleInputChange}
                                name="treshold"
                                value={sensorData?.treshold} />
                            <label htmlFor="treshold">treshold</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Create Sensor
                        <i className="material-icons right" />
                    </button>
                </form>

                <div class="col s2 m3 l4">

                </div>
            </div>
            Sensor Id of new sensor: {newSensorId && newSensorId}
        </div>
    )
}


export default CreateSensor
