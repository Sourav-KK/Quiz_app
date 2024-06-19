import { useDispatch } from "react-redux";
import { denyEntry } from "../../Redux/Slices/Auth";
import {
  removeMessage,
  resetAnswers,
  ressetCurrQustion,
  scoreReset,
} from "../../Redux/Slices/Selected_Answers";

const usePlayDismiss = () => {
  const dispatch = useDispatch();

  const dismiss = () => {
    dispatch(ressetCurrQustion());
    dispatch(resetAnswers());
    dispatch(scoreReset());
    dispatch(removeMessage());
    dispatch(denyEntry());
  };
  return dismiss;
};

export default usePlayDismiss;
