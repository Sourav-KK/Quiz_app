import Quiz_content from "../Utilities/Questions.json";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Utilities/Redux/Store";
import {
  scoreIncrement,
  addMessage,
  removeMessage,
  scoreReset,
} from "./Redux/Slices/Selected_Answers";

const useScoreCounter = () => {
  const dispatch = useDispatch();

  const totScore = useSelector((state: RootState) => state.Answers.totalScore);
  const answers = useSelector(
    (state: RootState) => state.Answers.selectedAnswers
  );

  
  const scoreCalulate = () => {
    try {
      dispatch(removeMessage());

      if (answers.length > 0) {
        answers.forEach((elem) => {
          const question = Quiz_content.find((q) => q.id === elem.id);

          // If question found and selected answer matches correct answer
          if (question && elem.ans === question.answer) {
            dispatch(scoreIncrement());
          }
        });

        if (totScore === 0) {
          dispatch(addMessage("Can do better"));
        } else if (totScore < 3) {
          dispatch(addMessage("Keep trying"));
        } else if (totScore < 10 && totScore > 2) {
          dispatch(addMessage("Great"));
        } else if (totScore === 10) {
          dispatch(addMessage("Excellent!!!"));
        }
        return true;
      } else {
        dispatch(addMessage("You havn't answerd any questions"));
        return false;
      }
    } catch (error) {
      console.error("errorin score counter");
      // dispatch(addMessage("An error occurred. Please try again"));
      // dispatch(scoreReset());
      return false;
    }
  };
  return scoreCalulate;
};

export default useScoreCounter;
