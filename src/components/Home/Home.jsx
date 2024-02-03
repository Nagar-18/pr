import React from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";

function Home(props) {
  return (
    <div>
      <div>
        <h1>
         {props.name ?(<></>):<Link to="/login">Login</Link> } 
        </h1>
        <br />
        <h1>
         {props.name ?(<></>):<Link to="/Signup">Signup</Link> } 
        </h1>
      </div>


      <h2>{props.name ?<Weather/> : "Login please"}</h2>
    </div>
  );
}

export default Home;
