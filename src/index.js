import React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

import { CurrentUserDataProvider } from "./contexts/CurrentUserProvider.jsx";
import { CommentsDataProvider } from "./contexts/CommentsProvider.jsx";

import App from "./App.jsx";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <CurrentUserDataProvider>
    <CommentsDataProvider>
      <App />
    </CommentsDataProvider>
  </CurrentUserDataProvider>
);

