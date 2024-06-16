import { Link } from "react-router-dom";

const Playbtn = () => {
  return (
    <div className="flex">
      <button type="button">
        <Link to={"/play"}>Play</Link>
      </button>
    </div>
  );
};

export default Playbtn;
