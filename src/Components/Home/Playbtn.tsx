import { useDispatch } from "react-redux";
import { alllowEntry } from "../../Utilities/Redux/Slices/Auth";
import { useNavigate } from "react-router-dom";
import "../../Styles/Playbtn.css";

const Playbtn = () => {
  const Nav = useNavigate();

  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(alllowEntry());
    Nav("/play");
  };

  return (
    <div className="playbtnholder">
      <button type="button" onClick={handlePlay} className="play-btnn">
        Play
      </button>
    </div>
  );
};

export default Playbtn;
