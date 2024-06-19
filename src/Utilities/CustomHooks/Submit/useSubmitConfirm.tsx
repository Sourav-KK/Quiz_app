import { useDispatch } from "react-redux";
import { denyEntry } from "../../Redux/Slices/Auth";
import { useNavigate } from "react-router-dom";
import {
  removeMessage,
  resetAnswers,
  ressetCurrQustion,
} from "../../Redux/Slices/Selected_Answers";

const useSubmitConfirm = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const submit = () => {
    document.exitFullscreen();
    dispatch(ressetCurrQustion());
    dispatch(resetAnswers());
    dispatch(removeMessage());
    dispatch(denyEntry());
    Nav("/result");
  };
  return submit;
};

export default useSubmitConfirm;
