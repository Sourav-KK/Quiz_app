import "../../Styles/App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div className="start-holder">
        <div className="heading-holder">
          <h2>Quiz app</h2>
        </div>
        <div className="flex">
          <button type="button">
            <Link to={"/play"}>Play</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
