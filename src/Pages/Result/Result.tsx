import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Utilities/Redux/Store";
import { denyEntry } from "../../Utilities/Redux/Slices/Auth";
import {
  resetAnswers,
  removeMessage,
  scoreReset,
} from "../../Utilities/Redux/Slices/Selected_Answers";
import "../../Styles/result.css";

const Result = () => {
  const totScore = useSelector((state: RootState) => state.Answers.totalScore);
  const message = useSelector((state: RootState) => state.Answers.message);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(denyEntry());
    return () => {};
  }, [dispatch]);

  const handleCLick = () => {
    dispatch(resetAnswers());
    dispatch(removeMessage());
    dispatch(scoreReset());
    Navigate("/");
  };

  return (
    <div className="result-holder">
      <div className="imoji-holder">
        <p className="score-comment">{message}</p>
      </div>
      <div className="result-summary">
        <h4 className="final-result">
          You score: <span className="score-point">{totScore}</span>
          /10
        </h4>
      </div>

      <div className="return-btn-holder">
        <button type="button" onClick={handleCLick} className="gohomebtn">
          Home
        </button>
      </div>
    </div>
  );
};

export default Result;
