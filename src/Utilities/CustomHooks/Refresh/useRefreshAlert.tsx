import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { alllowEntry } from "../../Redux/Slices/Auth";

const useRefreshAlert = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const refresh = ({
    setStates,
  }: {
    setStates: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    Swal.fire({
      title: "Refreshing the page can reset your game data. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        document.exitFullscreen();
        dispatch(alllowEntry());
        setStates(true);
        Nav("/");
      }
      if (result.dismiss) {
        document.body.requestFullscreen();
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
  };

  return refresh;
};

export default useRefreshAlert;
