import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Instructions from "../../Components/Home/Instructions";
import Playbtn from "../../Components/Home/Playbtn";
import type { RootState } from "../../Utilities/Redux/Store";
import { denyEntry } from "../../Utilities/Redux/Slices/Auth";
import {
  resetAnswers,
  scoreReset,
  removeMessage,
} from "../../Utilities/Redux/Slices/Selected_Answers";
import "../../Styles/App.css";

function App() {
  const Nav = useNavigate();

  const allowEntry = useSelector((state: RootState) => state.Auth.isAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("timer");
    dispatch(resetAnswers());
    dispatch(scoreReset());
    dispatch(removeMessage());

    if (allowEntry) {
      dispatch(denyEntry());

      Nav("/");
    }
    return () => {
      allowEntry;
    };
  }, [allowEntry, dispatch, Nav]);

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
