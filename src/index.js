import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
