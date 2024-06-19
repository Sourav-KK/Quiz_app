const useQuitAlertDismiss = () => {
  const dismissed = () => {
    document.body.requestFullscreen();
  };

  return dismissed;
};

export default useQuitAlertDismiss;
