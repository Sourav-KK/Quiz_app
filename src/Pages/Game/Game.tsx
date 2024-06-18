import { useEffect, useState } from "react";
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
import { alllowEntry, denyEntry } from "../../Utilities/Redux/Slices/Auth";
import {
  addAnswer,
  removeAnswer,
  removeMessage,
  resetAnswers,
  ressetCurrQustion,
  scoreReset,
  setCurrQustion,
} from "../../Utilities/Redux/Slices/Selected_Answers";
import useScoreCounter from "../../Utilities/useScoreCounter";
import useTimerCalculator from "../../Utilities/useTimerCalculator";

import Swal from "sweetalert2";
import Options from "../../Components/Game/Options";
import { QuizI } from "../../Utilities/Interface";
import CountDown from "../../Components/Game/CountDown";
import ButtonHolders from "../../Components/Game/ButtonHolders";

const Game = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const scoreCalculator = useScoreCounter();

  const [quizs, setQuizs] = useState<QuizI[]>([]);

  const [timer, setTimer] = useState(
    parseInt(localStorage.getItem("timer") || "600") // Sets default timer
  );
  const timeerr = useTimerCalculator(timer);

  const allowEntry = useSelector((state: RootState) => state.Auth.isAuthorized);

  const currQustionId = useSelector(
    (state: RootState) => state.Answers.currentQuestion
  );

  const selectedAnswers = useSelector(
    (state: RootState) => state.Answers.selectedAnswers
  );

  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    if (window.performance.navigation) {
      console.log("page reloaded");

      Swal.fire({
        title: "Refreshing the page can reset your game data. Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(alllowEntry());
          document.exitFullscreen();
          setIsReloaded(true);
          Nav("/");
        }
        if (result.isDismissed) {
          document.body.requestFullscreen();
          result.dismiss === Swal.DismissReason.cancel;
        } else {
          document.body.requestFullscreen();
          result.dismiss === Swal.DismissReason.cancel;
        }
      });
    }
    return () => {
      setIsReloaded(false);
    };
  }, [isReloaded]);

  useEffect(() => {
    //check user is authorised
    if (!allowEntry) {
      Nav("/");
    }
    // check if fullscreen is exited
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        Swal.fire({
          title:
            "Game will be terminated if you exit fullscreeen mode. Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(alllowEntry());
            document.exitFullscreen();
            Nav("/");
          } else {
            result.dismiss === Swal.DismissReason.cancel;
          }
        });
      }
    };
    setQuizs(Quiz_content);

    localStorage.setItem("timer", timer.toString());

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // timer function
    if (timer <= 0) {
      clearInterval(intervalId);
      const score = scoreCalculator();
      console.log(score);

      Swal.fire({
        icon: "info",
        title: "Times up !!!",
        text: "Press OK to see results!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(ressetCurrQustion());
            document.exitFullscreen();
            Nav("/result");
          } else {
            dispatch(ressetCurrQustion());
            document.exitFullscreen();
            Nav("/result");
          }
        })
        .catch((err) => {
          console.error("err in sweeet laert:", err);
          dispatch(ressetCurrQustion());
          document.exitFullscreen();
          Nav("/result");
        });
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
    // adding scoreCalculator to the dependency array causes the app to crash and misbehave because of infite renders
  }, [timer, dispatch, Nav, allowEntry]);

  const handleQuit = () => {
    Swal.fire({
      title: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        document.exitFullscreen();
        dispatch(ressetCurrQustion());
        dispatch(resetAnswers());
        dispatch(scoreReset());
        dispatch(removeMessage());
        // dispatch(alllowEntry());
        Nav("/");
      } else {
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
  };

  const handleSubmit = () => {
    const score = scoreCalculator();
    console.log("score value", score);

    if (score) {
      dispatch(ressetCurrQustion());
      dispatch(resetAnswers());
      dispatch(denyEntry());
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

  const handleCurrentQ = (Qid: number) => {
    console.log("Qid:", Qid);
    dispatch(setCurrQustion(Qid));
  };

  return (
    <div className="swiper-holder">
      <Swiper
        className="mySwiper"
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        initialSlide={!isReloaded ? currQustionId : 0}
        onRealIndexChange={(element) => handleCurrentQ(element.activeIndex)}
        slidesPerView={"auto"}
        spaceBetween={20}
      >
        {quizs.map((elem) => (
          <SwiperSlide
            key={elem.id}
            className="quiz-holder"
            id={elem.id + "qstn"}
          >
            <CountDown timeerr={timeerr} />

            <div className="question-holder">
              <h3>
                {elem.id}.{elem.question}
              </h3>
            </div>

            <Options
              elem={elem}
              handleSelection={handleSelection}
              selectedAnswers={selectedAnswers}
            />

            <ButtonHolders
              elem={elem}
              handleQuit={handleQuit}
              handleRemoveAnswer={handleRemoveAnswer}
              handleResetAnswers={handleResetAnswers}
              selectedAnswers={selectedAnswers}
              handleSubmit={handleSubmit}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Game;
