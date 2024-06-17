import { useDispatch } from "react-redux";
import { alllowEntry, denyEntry } from "../../Utilities/Redux/Slices/Auth";
import { useNavigate } from "react-router-dom";
import "../../Styles/Playbtn.css";
import Swal from "sweetalert2";

const Playbtn = () => {
  const Nav = useNavigate();

  const dispatch = useDispatch();

  const handlePlay = () => {
    Swal.fire({
      title: "Permission to switch to fullscreen mode?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(alllowEntry());
        document.documentElement.requestFullscreen();
        Nav("/play");
      } else {
        dispatch(denyEntry());
        Nav("/");
      }
    });
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
