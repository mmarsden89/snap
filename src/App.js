import "./App.scss";
import Terminal from "./Components/Terminal/Terminal.js";

function App() {
  return (
    <div className="App">
      <Terminal />
      <div className="deprecated">
        Snap has been deprecated. Thanks for checking it out!
      </div>
    </div>
  );
}

export default App;
