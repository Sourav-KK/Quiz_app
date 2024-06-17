import { OptionsI } from "../../Utilities/Interface";

const Options = ({ elem, handleSelection, selectedAnswers }: OptionsI) => {
  return (
    <div className="option-holder">
      {elem.options.map((item, index) => (
        <button
          type="button"
          key={index}
          onClick={() => handleSelection(elem.id, item)}
          className="option-btn"
          style={
            selectedAnswers.some((answer) => answer.ans === item)
              ? {
                  background: "#0f3396",
                }
              : {
                  background: "#547ae3",
                }
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Options;
