import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSistrix } from "react-icons/fa";
import { Charts } from "../components/Charts";
import axios from "axios";
import "./data.css";
import { Input } from "@chakra-ui/input";
import { LineChart, Line, XAxis } from "recharts";

export const Search = () => {
  const [city, setCity] = useState("Bangalore");
  const [datas, setDatas] = useState([]);
  const [singleDay, setSingleDay] = useState("");

  let riseDate = new Date(singleDay.sys?.sunrise * 1000);
  let setDate = new Date(singleDay.sys?.sunset * 1000);

  const sunData = [
    { name: riseDate, sunAct: singleDay.sys?.sunrise, value: 0 },
    { name: "", sunAct: "", value: 5 },
    { name: setDate, sunAct: singleDay.sys?.sunrise, value: 0 },
  ];

  const getCity = () => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c654cd32f0421daf4f1ea2aaaf2c917&units=metric`
        )
        .then((res) => {
          sevenDaysData(res.data.coord.lat, res.data.coord.lon);
          setSingleDay(res.data);
          //  console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  // console.log(singleDay, "r")

  const sevenDaysData = (lat, lon) => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9c654cd32f0421daf4f1ea2aaaf2c917&units=metric`
        )
        .then((res) => {
          console.log(res.data);
          setDatas(res.data.daily);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {}
  };

  useEffect(() => {
    getCity();
  }, []);

  // console.log(datas[0].temp.day)

  return (
    <div className="main">
      <div className="inputBox">
        <FaMapMarkerAlt className="mapIcon" />
        <Input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={getCity}
        />
        <FaSistrix className="searchIcon" />
      </div>

      <div className="sevenDay">
        {datas.map((e, i) => (
          <div>
            <p>
              {new Date(`${e.dt}` * 1000).toLocaleString("en", {
                weekday: "short",
              })}
            </p>
            <div className="daily-temp">
              <p>{Math.round(e.temp.max)}°</p>
              <p>{Math.round(e.temp.min)}°</p>
            </div>
            <div className="daily-img">
              <img
                src={`https://openweathermap.org/img/wn/${e?.weather[0]?.icon}@2x.png`}
                alt=""
              />
            </div>
            <p>{e.weather[0]?.main}</p>
          </div>
        ))}
      </div>
      <div className="graph-div">
        <div className="current-temp-img">
          <strong>{Math.round(singleDay.main?.temp)}°C</strong>
          <div className="current-img">
            <img
              src={`https://openweathermap.org/img/wn/${datas[0]?.weather[0]?.icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
        <Charts data={datas} />
      </div>

      <div className="graph-div">
        <div className="pressHumid">
          <div>
            <div className="pressure">Pressure</div>
            <div>{singleDay.main?.pressure} hpa</div>
          </div>
          <div>
            <div className="humidity">Humidity</div>
            <div>{singleDay.main?.humidity} %</div>
          </div>
        </div>
        <div className="riseSet">
          <div>
            <div className="sunrise">Sunrise</div>
            <div>{riseDate.toLocaleTimeString()}</div>
          </div>
          <div>
            <div className="sunset">Sunset</div>
            <div>{setDate.toLocaleTimeString()}</div>
          </div>
        </div>

        <LineChart
          width={400}
          height={200}
          data={sunData}
          style={{ margin: "auto" }}
        >
          <XAxis dataKey="name" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#eccb87"
            strokeWidth={2}
          />
        </LineChart>
      </div>
      <div>
        <iframe
          className="map"
          src={`https://maps.google.com/maps?q=${city}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
};
