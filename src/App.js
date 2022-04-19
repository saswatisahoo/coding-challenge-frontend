import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Map from "./Map";


function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  // const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  // const [error, setError] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((result) => {
      result.json().then((resp) => {
        // console.warn("result",resp)
        setData(resp);
      });
    });
  }, []);


  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
    fetch(
      "https://jsonplaceholder.typicode.com/users?" +
        new URLSearchParams({
          name: value,
        })
    ).then((result) => {
      result.json().then((resp) => {
        console.warn("resulttest", resp);
        Object.entries(resp).map(([key, value]) => {
          setId(value.id);
          setLat(value.address.geo.lat);
          setLng(value.address.geo.lng);
        });
      });
    });
  };

  function showData() {
 //Validation
    if (name == "" ) {
      console.log("Please select a user!!");
      alert("Please select a user!!");
      return;
    } 
    else if(title == "") {
      console.log("Please enter title!!");
      alert("Please enter title!!");
      return;
    } 
    else if(body == "") {
      console.log("Please enter body!!");
      alert("Please enter body!!");
      return;
    } 
    // POST request using fetch with error handling
    let data = { id, title, body };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    };
    // console.warn("resulttestAll", { id, title, body });
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <lable>
            Name:{" "}
            <select placeholder="select user" onChange={onChange}>
              <option > </option>
              {data.map((data) => (
                <option name={data.name}>{data.name}</option>
              ))}
            </select>
          </lable>
          <br />
          <br />

          <lable>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
            />
          </lable>
          <br />
          <br />
          <label>
            Body:
            <input
              type="text"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              name="body"
            />
          </label>
          <br />
          <br />

          <div>
            <button onClick={showData}>Submit</button>
          </div>
          <br />
          <br />
          <div classname="App-Map">
            <Map UserName={name} lat={lat} lng={lng}></Map>
          </div>
          <br/><br/>
        </form>
      </header>
    </div>
  );
}

export default App;
