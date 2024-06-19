import Swal, { SweetAlertIcon } from "sweetalert2";

const useAlert = () => {
  const alertBox = ({
    title,
    icon,
    confirmHookCall,
    dismiss,
  }: {
    title: string;
    icon: SweetAlertIcon;
    confirmHookCall: () => void;
    dismiss: () => void;
  }) =>
    Swal.fire({
      title: `${title}`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmHookCall();
      } else if (result.isDismissed) {
        result.dismiss === Swal.DismissReason.cancel;
        dismiss();
      }
    });

  return alertBox;
};

export default useAlert;
