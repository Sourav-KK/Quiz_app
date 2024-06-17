import React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./Utilities/Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
