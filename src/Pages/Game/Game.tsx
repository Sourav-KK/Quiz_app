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
import { alllowEntry } from "../../Utilities/Redux/Slices/Auth";
import {
  addAnswer,
  removeAnswer,
  resetAnswers,
  setCurrQustion,
} from "../../Utilities/Redux/Slices/Selected_Answers";
import useScoreCounter from "../../Utilities/useScoreCounter";
import useTimerCalculator from "../../Utilities/useTimerCalculator";

// import Swal from "sweetalert2";
import { QuizI } from "../../Utilities/Interface";
import Options from "../../Components/Game/Options";
import CountDown from "../../Components/Game/CountDown";
import ButtonHolders from "../../Components/Game/ButtonHolders";
import useAlert from "../../Utilities/CustomHooks/useAlert";
import useQuitAlertConfirm from "../../Utilities/CustomHooks/Quit/useQuitAlertConfirm";
import useQuitAlertDismiss from "../../Utilities/CustomHooks/Quit/useQuitAlertDismiss";
import useSubmitConfirm from "../../Utilities/CustomHooks/Submit/useSubmitConfirm";
import useSubmitDismiss from "../../Utilities/CustomHooks/Submit/useSubmitDismiss";
import { infoIcon, warningIcon, Swal } from "../../Utilities/SweetAlert/Icons";
import useTimerAlert from "../../Utilities/CustomHooks/useTimerAlert";
import Question from "../../Components/Game/Question";
import useRefreshAlert from "../../Utilities/CustomHooks/Refresh/useRefreshAlert";

const Game = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const scoreCalculator = useScoreCounter();

  // custom hooks
  const alertBox = useAlert();
  const quitConfirm = useQuitAlertConfirm();
  const quitDimiss = useQuitAlertDismiss();
  const submitConfirm = useSubmitConfirm();
  const submitDismiss = useSubmitDismiss();
  const timerAlertBox = useTimerAlert();
  const refreshAlertBox = useRefreshAlert();

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
      refreshAlertBox({ setStates: setIsReloaded });
    }
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

      timerAlertBox();
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
    // adding scoreCalculator to the dependency array causes the app to crash and misbehave because of infite renders
  }, [timer, dispatch, Nav, allowEntry]);

  const handleQuit = () => {
    alertBox({
      title: "Are you sure you want to exit?",
      icon: warningIcon,
      confirmHookCall: quitConfirm,
      dismiss: quitDimiss,
    });
  };

  const handleSubmit = () => {
    const score = scoreCalculator();

    if (score) {
      alertBox({
        title: "Ready to submit?",
        icon: infoIcon,
        confirmHookCall: submitConfirm,
        dismiss: submitDismiss,
      });
    } else {
      // error alert & redirect to home page
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

            <Question elem={elem} />

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
