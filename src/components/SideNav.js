import react from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import SensorSideNavCard from "./SensorSideNavCard";

const UserManagement = () => {
  const sensors = [
    {
      id: 1,
      name: "Garden Sensor",
      picture:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple111/v4/30/78/80/3078803a-228a-4b3c-0ef9-7b63d8cb7c29/source/256x256bb.jpg",
    },
    {
      id: 2,
      name: "Backyard Sensor",
      picture:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple111/v4/30/78/80/3078803a-228a-4b3c-0ef9-7b63d8cb7c29/source/256x256bb.jpg",
    },
    {
      id: 3,
      name: "Potato field sensor",
      picture:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple111/v4/30/78/80/3078803a-228a-4b3c-0ef9-7b63d8cb7c29/source/256x256bb.jpg",
    },
  ];

  return (
    <div>
      <ul className="collection">
        {sensors.map((sensor) => {
          return <SensorSideNavCard key={sensor.id} {...sensor} />;
        })}
      </ul>
    </div>
  );
};

export default UserManagement;
