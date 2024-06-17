import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/result.css";
import { RootState } from "../../Utilities/Redux/Store";

const Result = () => {
  const totScore = useSelector((state: RootState) => state.Answers.totalScore);
  const message = useSelector((state: RootState) => state.Answers.message);

  return (
    <div className="result-holder">
      <div className="imoji-holder">
        <img src="" alt="" />
        <p className="score-comment">{message}</p>
      </div>
      <div className="result-summary">
        <h4 className="final-result">You score is : {totScore}/10</h4>
      </div>

      <div className="return-btn-holder">
        <button type="button">
          <Link to={"/"}>Home</Link>
        </button>
      </div>
    </div>
  );
};

export default Result;
