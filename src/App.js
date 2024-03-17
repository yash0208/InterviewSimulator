import  logo from "./logo.svg";
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
import TextInterview from "./TextInterview";
import Text from "./Text";
import MockInterviewScreen from "./MockInterviewScreen";
import Header from "./Header";
import ThankYou from "./ThankYou";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="auth" element={<Authentication/>}/>
          <Route path="thank you" element={<ThankYou/>}   />
          <Route path="interviewer" element={<InterviewerScreen />} />
          <Route path="candidate" element={<CandidateScreen />} />

          <Route path="auth/candidate" element={<CandidateScreen />} />
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
              path="auth/candidate/mock"
              element={<MockInterviewScreen />}
          />
          <Route
            path="/candidate/video-interview"
            element={<VideoInterview />}
          />
           <Route
            path="/candidate/text-interview"
            element={<TextInterview />}
          />
           <Route
            path="/candidate/text-interview/text"
            element={<Text />}
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
