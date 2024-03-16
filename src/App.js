import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { Authentication } from "./Authentication/Authentication";
import "./fonts.css";
import InterviewerScreen from "./InterviewerScreen";
import QuizPage from "./QuizPage";
import CandidateScreen from "./CandidateScreen";
import AudioInterview from "./AudioInterview";
import VideoInterview from "./VideoInterview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="interviewer" element={<InterviewerScreen />} />
          <Route path="candidate" element={<CandidateScreen />} />
          <Route path="interviewer/create_quiz" element={<QuizPage />} />
          <Route
            path="interviewer/create_quiz/interviewer"
            element={<InterviewerScreen />}
          />
          <Route
            path="/candidate/audio-interview"
            element={<AudioInterview />}
          />
          <Route
            path="/candidate/video-interview"
            element={<VideoInterview />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
