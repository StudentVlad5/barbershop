import "modern-normalize";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { App } from "./components/App/App";

import AOS from "aos";

// window.global = { BASE_URL: 'http://localhost:3030/api' };
window.global = { BASE_URL: "https://rich-rose-shoulder-pads.cyclic.app/api" };
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"Loading"} persistor={persistor}>
        <BrowserRouter basename="barbershop">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
