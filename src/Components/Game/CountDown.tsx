const CountDown = ({ timeerr }: { timeerr: string }) => {
  return (
    <div className="time-holder">
      <p className="time">⏱ {timeerr} ⏱</p>
    </div>
  );
};

export default CountDown;
