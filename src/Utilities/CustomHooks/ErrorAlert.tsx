// import Swal from "sweetalert2";
// import { errorIcon } from "../../Utilities/SweetAlert/Icons";

// const useErrorAlert = () => {
//   const errAlert = () => {
//     let timerInterval: number;

//     Swal.fire({
//       title: "Unexpected",
//       html: "I will close in <b></b> milliseconds.",
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: () => {
//         Swal.showLoading();
//         const timer = Swal.getPopup().querySelector("b");
//         timerInterval = setInterval(() => {
//           timer.textContent = `${Swal.getTimerLeft()}`;
//         }, 100);
//       },
//       willClose: () => {
//         clearInterval(timerInterval);
//       },
//     }).then((result) => {
//       /* Read more about handling dismissals below */
//       if (result.dismiss === Swal.DismissReason.timer) {
//         console.log("I was closed by the timer");
//       }
//     });
//   };
//   return errAlert;
// };

// export default useErrorAlert;
