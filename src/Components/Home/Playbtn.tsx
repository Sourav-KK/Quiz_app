import useAlert from "../../Utilities/CustomHooks/useAlert";
import usePlayAlertConfirm from "../../Utilities/CustomHooks/Play/usePlayAlertConfirm";
import { infoIcon } from "../../Utilities/SweetAlert/Icons";
import usePlayDismiss from "../../Utilities/CustomHooks/Play/usePlayDismiss";

const Playbtn = () => {
  const alertBox = useAlert();
  const onSubmitConfirm = usePlayAlertConfirm();
  const dismissCall = usePlayDismiss();

  const handlePlay = () => {
    alertBox({
      title: "Permission to switch to fullscreen mode?",
      icon: infoIcon,
      confirmHookCall: onSubmitConfirm,
      dismiss: dismissCall,
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
