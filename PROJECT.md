Quiz App
This project is a quiz app built with React, TypeScript, and Vite. It provides an interactive platform for users to participate in quizzes.

Features:

1. Full Screen Mode:
   o The game can only be played in fullscreen mode. Any attempt to exit fullscreen mode will trigger a warning, asking the user if they want to quit or continue playing.

2. Timer and Scoring:
   o A timer counts down during the quiz.
   o Users earn points based on correct answers and completion time.
   o When the timer runs out, the user is redirected.

3. Current Question Tracker:
   o If the user refreshes the page in the middle of the game, the page reloads to the question they were on.

4. Results Page:
   o After completing a quiz, users see their score and a summary of correct and incorrect answers.
   Implementation Details

Implementation Details

1. Timer:
   o The time is stored in local storage.
   o Using setInterval, the countdown is initiated, and the updated time is displayed to the user.
2. Current Question Tracking:
   o Redux Toolkit is used to track the current question.
   o The selected question is stored when the user views it.

3. Redux Toolkit (RTK):
   o RTK is utilized to manage:
    Entry permission
    Selected questions
    Score tracking
    User messages based on the score
    Current question ID

4. Swiper.js:
   o A powerful touch slider library that facilitates displaying questions and options.
   Feel free to customize this description further to match your specific project details. Good luck with your quiz app! 😊
