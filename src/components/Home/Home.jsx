import React from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import Login from "../Login/Login";

function Home(props) {
  return (
    <div>
      <div>
        <h1>
         {props.name ?(<></>):<Login/> } 
        </h1>
        <br />
        <h1>
         
        </h1>
      </div>


      <h2>{props.name ?<Weather/> : "Login please"}</h2>
    </div>
  );
}

export default Home;
