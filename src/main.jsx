import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import './main.css'

const clerkPubKey = 'pk_test_ZW5nYWdlZC1wcmltYXRlLTY2LmNsZXJrLmFjY291bnRzLmRldiQ';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}  >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
