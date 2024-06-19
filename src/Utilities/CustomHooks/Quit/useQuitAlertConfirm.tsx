import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeMessage,
  resetAnswers,
  ressetCurrQustion,
  scoreReset,
} from "../../Redux/Slices/Selected_Answers";

const useQuitAlertConfirm = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const confirmFn = () => {
    document.exitFullscreen();
    dispatch(ressetCurrQustion());
    dispatch(resetAnswers());
    dispatch(scoreReset());
    dispatch(removeMessage());
    Nav("/");
  };
  return confirmFn;
};

export default useQuitAlertConfirm;
