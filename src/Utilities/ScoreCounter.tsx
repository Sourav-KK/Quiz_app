import Quiz_content from "../Utilities/Questions.json";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Utilities/Redux/Store";
import {
  scoreIncrement,
  addMessage,
  removeMessage,
} from "./Redux/Slices/Selected_Answers";

const ScoreCounter = () => {
  console.log("in score counter");
  const dispatch = useDispatch();

  const totScore = useSelector((state: RootState) => state.Answers.totalScore);

  const answers = useSelector(
    (state: RootState) => state.Answers.selectedAnswers
  );
  dispatch(removeMessage());

  try {
    if (answers.length > 0) {
      answers.forEach((elem) => {
        const question = Quiz_content.find((q) => q.id === elem.id);

        // If question found and selected answer matches correct answer
        if (question && elem.ans === question.answer) {
          console.log("same anser");
          dispatch(scoreIncrement());
        }
      });

      if (totScore === 0) {
        dispatch(addMessage("Keep trying"));
      }

      if (totScore < 3) {
        dispatch(addMessage("Better luck next time"));
      }

      if (totScore < 10 && totScore > 2) {
        dispatch(addMessage("Great"));
      }

      if (totScore === 10) {
        dispatch(addMessage("Excellent!!!"));
      }

      return true;
    }

    dispatch(addMessage("An error occured. Please try again"));

    return false;
  } catch (error) {
    console.error("errorin score counter");
  }
};

export default ScoreCounter;
