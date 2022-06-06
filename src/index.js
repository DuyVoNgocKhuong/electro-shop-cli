import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "antd/dist/antd.less";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import SplashScreen from "./components/SplashScreen/SplashScreen";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
