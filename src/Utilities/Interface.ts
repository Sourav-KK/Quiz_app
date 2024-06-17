interface QuizI {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface OptionsI {
  elem: QuizI;
  handleSelection: (QuestionId: string, selectedAns: string) => void;
  selectedAnswers: {
    id: string;
    ans: string;
  }[];
}

interface ButtonHoldersI {
  handleQuit: () => void;
  handleSubmit: () => void;
  handleResetAnswers: () => void;
  handleRemoveAnswer: (questionId: string) => void;
  elem: QuizI;
  selectedAnswers: {
    id: string;
    ans: string;
  }[];
}
export type { OptionsI, QuizI, ButtonHoldersI };
