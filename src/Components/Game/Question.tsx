import { QuizI } from "../../Utilities/Interface";

const Question = ({ elem }: { elem: QuizI }) => {
  return (
    <div className="question-holder">
      <h3>
        {elem.id}.{elem.question}
      </h3>
    </div>
  );
};

export default Question;
