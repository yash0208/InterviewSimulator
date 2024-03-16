import React, { useState } from 'react';
import QuizForm from './QuizForm';
import QuizQuestion from './QuizQuestion';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "./assets/logo.png";
import {getDatabase, ref, set, push} from "firebase/database";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { unstable_HistoryRouter } from 'react-router-dom'; // Import useHistory hook

const firebaseConfig = {
    apiKey: "AIzaSyAIVEam2B1Ws23SW43S3ebkc5lA7aGoVzo",
    authDomain: "interviewsimulator-252d6.firebaseapp.com",
    projectId: "interviewsimulator-252d6",
    storageBucket: "interviewsimulator-252d6.appspot.com",
    messagingSenderId: "106778466397",
    appId: "1:106778466397:web:1340f64fdf73be004095b4",
    measurementId: "G-92QYXMMFTH"
};
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
export default function QuizPage() {

    const navigate=useNavigate();
    const [questions, setQuestions] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [name, setName] = useState('');

    const handleSubmit = (newQuestion) => {
        if (editMode) {
            setQuestions(questions.map(q => q === editQuestion ? newQuestion : q));
            setEditMode(false);
            setEditQuestion(null);
        } else {
            setQuestions([...questions, newQuestion]);
        }
    };

    const handleDelete = (questionToDelete) => {
        setQuestions(questions.filter(q => q !== questionToDelete));
    };

    const handleEdit = (questionToEdit) => {
        setEditMode(true);
        setEditQuestion(questionToEdit);
    };

    const handleSave = () => {
        // Implement logic to save the quiz
        console.log(questions.length);
        if(questions.length===0){
            alert('Please enter some questions');
        }
        else {
            if(name===''){
                alert('Please enter quiz name');
            }
            else {
                const user=auth.currentUser;
                const db = getDatabase();
                push(ref(db, 'interviews/'), {
                    creator: user.uid,
                    name: name,
                    questions: questions,
                });
                alert('Quiz saved');
                navigate('/interviewer');
            }
        }

        console.log('Quiz saved');
    };
    const handleBack = (e) => {
        navigate('/interviewer');
    };
    return (
        <>
            <Navbar className="custom-navbar" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" className="brand-name">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        {'       Create Quiz'}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Button className="custom-button mr-2" variant="outline-light" onClick={handleBack}>Back</Button>
                            <Button className="custom-button" variant="outline-light" onClick={handleSave}>Save Quiz</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container mt-5">
                <label htmlFor="question">Quiz Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <QuizForm onSubmit={handleSubmit} />
                <div className="mt-4">
                    {questions.map((question, index) => (
                        <QuizQuestion
                            key={index}
                            question={question}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
