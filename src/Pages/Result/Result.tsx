import { Link } from "react-router-dom";
import "../../Styles/result.css";

const Result = () => {
  return (
    <div className="result-holder">
      <div className="imoji-holder">
        <img src="" alt="" />
        <p className="score-comment">Better luck next time</p>
      </div>
      <div className="result-summary">
        <h4 className="final-result">You score is : 8/10</h4>
        <h4 className="final-result">You attempted : 8 questions</h4>
        <h4 className="final-result">Wrong answers : 8 </h4>
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
