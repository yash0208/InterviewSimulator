import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref } from "firebase/database";
import * as Components from "./AudioComponents.js";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const StyledTextInput = styled.textarea`
  width: 70%;
  height: 200px; /* Adjust height to fit 10 lines */
  padding: 10px;
  border: none;
  background-color: #F3F3F3;
  border-radius: 5px;
  box-shadow: 7px 4px 37px -15px rgba(0,0,0,0.89);
  outline: none;
  resize: vertical; /* Allow vertical resizing */
`;

function VideoInterview() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null); // Set initial state to null
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        alert(
            "This is a mock interview consisting 3 sections Video, audio, and text answers. At the end, you will be able to check the complete report for your answers."
        );
        const fetchData = async () => {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, 'interviews/MockInterview/questions'));
            if (snapshot.exists()) {
                const interviewsData = [];
                snapshot.forEach((childSnapshot) => {
                    interviewsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
                });
                setQuestions(interviewsData);
                setQuestion(interviewsData[0]); // Set the initial question after fetching data
            }
        };

        fetchData();
    }, []);

    const goBack = () => navigate("/candidate");

    const startRecording = () => {
        // Logic to start recording
    };

    const submitRecording = () => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        if (questionIndex < questions.length - 1) {
            setQuestion(questions[questionIndex + 1]);
        } else {
            alert("All questions answered. Submitting recording...");
        }
    };

    if (!question) {
        return null; // Render nothing until questions are fetched
    }

    let bannerText = '';
    let buttonText = '';
    if (question.section === 'video') {
        bannerText = 'Video Question';
        buttonText = 'Start Recording (15s)';
    } else if (question.section === 'audio') {
        bannerText = 'Audio Question';
        buttonText = 'Start Recording (1min)';
    } else if (question.section === 'text') {
        bannerText = 'Text Question';
        buttonText = 'Start Typing';
    }

    return (
        <>
            <GlobalStyle />
            <Components.ContainerWrapper>
                <Components.Banner>{bannerText}</Components.Banner>
                <Components.BlockQuote>
                    <Components.Paragraph class="quotation">
                        {question.question}
                    </Components.Paragraph>
                </Components.BlockQuote>
                {question.section === 'text' && (
                    <StyledTextInput
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                    />
                )}
                <Components.Button onClick={startRecording}>
                    {buttonText}
                </Components.Button>
                <Components.Button onClick={submitRecording}>
                    Submit Recording
                </Components.Button>
                <Components.Message>{question.message}</Components.Message>
                <Components.Anchor href="#">How does it work?</Components.Anchor>
                <Components.BackButton onClick={goBack}>Back</Components.BackButton>
            </Components.ContainerWrapper>
        </>
    );
}

export default VideoInterview;
