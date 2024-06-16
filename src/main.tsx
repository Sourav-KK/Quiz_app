import React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./Utilities/Redux/Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
