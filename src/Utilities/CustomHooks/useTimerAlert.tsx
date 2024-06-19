import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ressetCurrQustion } from "../Redux/Slices/Selected_Answers";

const useTimerAlert = () => {
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const timerAlert = () => {
    Swal.fire({
      icon: "info",
      title: "Times up !!!",
      text: "Press OK to see results!",
      allowEscapeKey: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("is confirmed");
        document.exitFullscreen();
        dispatch(ressetCurrQustion());
        Nav("/result");
      }
    });
  };
  return timerAlert;
};

export default useTimerAlert;
