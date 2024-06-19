import { alllowEntry } from "../../Redux/Slices/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useReloadConfirm = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const confirm = () => {
    dispatch(alllowEntry());
    document.exitFullscreen();
    setIsReloaded(true);
    Nav("/");
  };
  return confirm;
};

export default useReloadConfirm;
