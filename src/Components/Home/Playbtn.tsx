import { useDispatch } from "react-redux";
import { alllowEntry } from "../../Utilities/Redux/Slices/Auth";
import { useNavigate } from "react-router-dom";

const Playbtn = () => {
  const Nav = useNavigate();

  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(alllowEntry());
    Nav("/play");
  };

  return (
    <div className="flex">
      <button type="button" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
};

export default Playbtn;
