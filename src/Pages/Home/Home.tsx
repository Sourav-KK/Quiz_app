import Instructions from "../../Components/Home/Instructions";
import Playbtn from "../../Components/Home/Playbtn";
import "../../Styles/App.css";

function App() {
  return (
    <div className="main">
      <div className="start-holder">
        <div className="heading-holder">
          <h2 className="home-Heading">Quiz app</h2>
        </div>
        <div className="instruction-remainder">
          <p>Please read the instructions carefully before playing</p>
        </div>

        <Playbtn />
        <hr />
        <Instructions />
      </div>
    </div>
  );
}

export default App;
