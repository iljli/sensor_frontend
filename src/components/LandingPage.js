import react from "react";
import M from "materialize-css";
import { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import SideNav from "./SideNav";

const Landing = () => {
  return (
    <div className="main1">
      <div class="row">
        <div class="col s8">
          <div className="charts">
            <div className="barchart1">
              <Bar
                data={{
                  labels: ["Temperature", "Humidity", "Pressure"],
                  datasets: [
                    {
                      label: "BACKYARD SENSOR",
                      data: [12, 89, 800],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="barchart1">
              <Bar
                data={{
                  labels: ["Temperature", "Humidity", "Pressure"],
                  datasets: [
                    {
                      label: "POTATO FIELD",
                      data: [28, 30, 13],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="barchart1">
              <Bar
                data={{
                  labels: ["Temperature", "Humidity", "Pressure"],
                  datasets: [
                    {
                      label: "GARDEN SENSOR",
                      data: [12, 19, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
        <div class="col s4 sideMenu">
          <SideNav />
        </div>
      </div>
    </div>
  );
};

export default Landing;
