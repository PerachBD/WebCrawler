// import React from "react";
import CrawlerFormComponent from "./CrawlerFormComponent"
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Control } from "./controlComponent";
const ENDPOINT = "http://localhost:8080/";

const socket = socketIOClient(ENDPOINT);

function App() {
  const [response, setResponse] = useState("");
  const [query_result, setquery_result] = useState("");

  
  useEffect(() => {
   
    socket.on("FromAPI", data => {
      console.log('Get from Server');
      console.log(data);
      setResponse(data);
    });
    socket.on("query_result", data => {
      console.log(data);
      setquery_result(data);
    });
    
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  const sendToServer = (event) => {
    console.log(`event:`, event);
    console.log('try send to server');
    socket.emit('sbmitCrawlerParameters', event);
  }

  return (
    <div>
      <Control />
      {/* <button onClick={sendToServer}>send</button>
      <div style={{ padding: 15 }}>
        <h2>Crawler Arguments</h2>
        <CrawlerFormComponent onRequest={sendToServer}/>
        <p>It's <time dateTime={response}>{response}</time></p>
        <p>{query_result}</p>
      </div>*/}
    </div> 
  );
}
  

export default App;
