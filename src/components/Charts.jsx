import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";


export const Charts = ({ data }) => {
  const [temps, setTemps] = useState([]);

 

  useEffect(() => {
    let arr = [];

   
    for(let i = 0; i < data.length; i++) {
      // console.log(data[i].temp.day)
      arr.push(data[i].temp.day)
    }

   
    setTemps([...arr]);
  }, [data]);

  

  const obj = {
    options: {
      chart: {
        
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: { enabled: true },
      stroke: {
        curve: "smooth",
        lineCap: "round",
      },
      xaxis: {
        categories: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      },
      yaxis:{opposite:false}
    },
    series: [
      {
        name: "Temperature",
       
        data: temps || [45, 52, 38, 45, 19, 23, 2], 
      },
    ],
  };
  return (
    <>
      
      
        <div >
          <Chart
            options={obj.options}
            series={obj.series}
            type="area"
            width="100%"
            height="300px"
          />
        </div>
      
    </>
  );
};
