window.global = window;

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ClickSpark from "./components/elements/ClickSpark.jsx";
import ContextProvider from "./socket/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <ContextProvider>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={400}
      >
        <App />
      </ClickSpark>
    </ContextProvider>
  </div>
);
