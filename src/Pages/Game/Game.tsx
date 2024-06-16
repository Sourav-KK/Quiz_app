import { useEffect, useState } from "react";
import Quiz_content from "../../Utilities/Questions.json";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../Styles/swiper.css";

import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../Utilities/Redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { denyEntry } from "../../Utilities/Redux/Slices/Auth";

interface QuizI {
  id: string;
  question: string;
  options: string[];
  answer: string;
}
const Game = () => {
  const Nav = useNavigate();
  const allowEntry = useSelector((state: RootState) => state.Auth.isAuthorized);
  const dispatch = useDispatch();

  const [quizs, setQuizs] = useState<QuizI[]>([]);

  useEffect(() => {
    setQuizs(Quiz_content);

    if (!allowEntry) {
      Nav("/");
    }
    return () => {
      allowEntry;
    };
  }, [allowEntry, Nav]);

  console.log(quizs, "qwizess");

  const handleQuit = () => {
    alert("are you sure");
    dispatch(denyEntry());
    Nav("/");
  };

  return (
    <div className="swiper-holder">
      <Swiper
        pagination={{
          type: "fraction",
        }}
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
              {elem.options.map((item) => (
                <button type="button">{item}</button>
              ))}
            </div>

            <div className="quiz-btn-holder">
              <button type="button" className="quit-btn" onClick={handleQuit}>
                Quit
              </button>
              {elem.id === "10" && (
                <>
                  <button type="button" className="submit-btn">
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
