import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alllowEntry } from "../../Redux/Slices/Auth";

const usePlayAlertConfirm = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const playAlert = () => {
    dispatch(alllowEntry());
    document.documentElement.requestFullscreen();
    Nav("/play");
  };
  return playAlert;
};

export default usePlayAlertConfirm;
