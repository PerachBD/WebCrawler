import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import sbmitCrawlerForm from "./sbmitCrawlerForm";
import SimpleForm from "./formComponent";


function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: 15 }}>
        <h2>Crawler Arguments</h2>
        <SimpleForm onSubmit={sbmitCrawlerForm} />
      </div>
    </Provider>
  );
}

export default App;
