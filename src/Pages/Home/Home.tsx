import { useEffect } from "react";
import Instructions from "../../Components/Home/Instructions";
import Playbtn from "../../Components/Home/Playbtn";
import "../../Styles/App.css";
import type { RootState } from "../../Utilities/Redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { denyEntry } from "../../Utilities/Redux/Slices/Auth";
import { useNavigate } from "react-router-dom";

function App() {
  const Nav = useNavigate();

  const allowEntry = useSelector((state: RootState) => state.Auth.isAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allowEntry) {
      dispatch(denyEntry());

      Nav("/");
    }
    return () => {
      allowEntry;
    };
  }, []);

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
