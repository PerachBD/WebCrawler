// import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import CrawlerFormComponent from "./CrawlerFormComponent"
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080/";


function App() {
  const [response, setResponse] = useState("");

  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    // socket.emit("sbmitCrawlerParameters", "nothing");
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <div style={{ padding: 15 }}>
        <h2>Crawler Arguments</h2>
        <CrawlerFormComponent />
        <p>It's <time dateTime={response}>{response}</time></p>
      </div>
    </Provider>
  );
}
  

export default App;
