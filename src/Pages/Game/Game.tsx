import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz_content from "../../Utilities/Questions.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../Styles/swiper.css";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Utilities/Redux/Store";
import { denyEntry } from "../../Utilities/Redux/Slices/Auth";
import {
  addAnswer,
  removeAnswer,
  resetAnswers,
} from "../../Utilities/Redux/Slices/Selected_Answers";
import useScoreCounter from "../../Utilities/useScoreCounter";

interface QuizI {
  id: string;
  question: string;
  options: string[];
  answer: string;
}
const Game = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const scoreCalculator = useScoreCounter();

  const [quizs, setQuizs] = useState<QuizI[]>([]);
  const [timer, setTimer] = useState(
    parseInt(localStorage.getItem("timer") || "6000") // Set default timer value
  );
  const intervalId = useRef(0); // Redirect when the timer reaches 0

  const allowEntry = useSelector((state: RootState) => state.Auth.isAuthorized);

  const selectedAnswers = useSelector(
    (state: RootState) => state.Answers.selectedAnswers
  );

  useEffect(() => {
    setQuizs(Quiz_content);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (window.confirm("Are you sure you want to exit fullscreen?")) {
          Nav("/"); // Redirects user if they confirm
        } else {
          document.documentElement.requestFullscreen(); // Keeps the user in fullscreen mode
        }
      }
    };

    if (!allowEntry) {
      Nav("/");
    } else {
      document.body.requestFullscreen();

      localStorage.setItem("timer", timer.toString());
      if (timer === 0) {
        Nav("/result"); // Replace with your desired path
      } else {
        // Set up the interval only if the timer is not yet finished
        intervalId.current = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      clearInterval(intervalId.current);
    };
  }, [allowEntry, Nav, timer]);

  const handleQuit = () => {
    const confirmQuit = window.confirm("Are you sure you want to quit?");
    if (confirmQuit) {
      dispatch(resetAnswers());
      dispatch(denyEntry());
      Nav("/");
    }
  };

  const handleSubmit = async () => {
    const score = scoreCalculator();
    console.log("score value", score);

    if (score) {
      Nav("/result");
    } else {
      console.error("error in score counter");
    }
  };

  const handleSelection = (QuestionId: string, selectedAns: string) => {
    dispatch(addAnswer({ id: QuestionId, ans: selectedAns }));
  };

  const handleRemoveAnswer = (questionId: string) => {
    dispatch(removeAnswer(questionId));
  };

  const handleResetAnswers = () => {
    dispatch(resetAnswers());
  };

  return (
    <div className="swiper-holder">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {quizs.map((elem) => (
          <SwiperSlide key={elem.id} className="quiz-holder">
            <div className="question-holder">
              <h3>
                {elem.id}.{elem.question}
              </h3>
            </div>

            <div className="option-holder">
              {elem.options.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleSelection(elem.id, item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="quiz-btn-holder">
              <button type="button" className="quit-btn" onClick={handleQuit}>
                Quit
              </button>

              {selectedAnswers.some((answer) => answer.id === elem.id) && (
                <button onClick={() => handleRemoveAnswer(elem.id)}>
                  Remove Answer
                </button>
              )}
              <button
                type="button"
                className="quit-btn"
                onClick={handleResetAnswers}
              >
                Reset
              </button>
              {elem.id === "10" && selectedAnswers.length > 0 && (
                <>
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Game;
