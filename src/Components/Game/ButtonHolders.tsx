import { ButtonHoldersI } from "../../Utilities/Interface";

const ButtonHolders = ({
  handleQuit,
  handleResetAnswers,
  handleRemoveAnswer,
  elem,
  selectedAnswers,
  handleSubmit,
}: ButtonHoldersI) => {
  return (
    <>
      <div className="quiz-btn-holder">
        <button type="button" className="quit-btn" onClick={handleQuit}>
          Quit
        </button>
        <button
          onClick={() => handleRemoveAnswer(elem.id)}
          className="remove-btn"
          disabled={!selectedAnswers.some((answer) => answer.id === elem.id)}
        >
          Remove Answer
        </button>
        <button type="button" className="quit-btn" onClick={handleResetAnswers}>
          Reset
        </button>
      </div>

      <div className="submit-btn-container">
        {elem.id === "10" && (
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!(selectedAnswers.length > 0)}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default ButtonHolders;
