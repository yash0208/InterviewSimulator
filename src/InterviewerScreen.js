import {Button, Card, Container, Nav, Navbar, Modal, Form} from 'react-bootstrap';
import logo from './assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {useEffect, useState} from "react";
import {child, get, getDatabase, push, ref, set} from "firebase/database";
import {useNavigate} from "react-router-dom"; // Import custom CSS file
import './interviewer_css.css'
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

export default function InterviewerScreen(){
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [interviews, setInterviews] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [assigningQuiz, setAssigningQuiz] = useState(null);
    const [selectedinterviews, selectedsetInterviews] = useState([]);
    const [selectedselectedQuiz, selectedsetSelectedQuiz] = useState(null);
    const [filtered,setFilteredInterviews]=useState([]);
    const [interviewDetails,setInterviewDetails]=useState();
    const [names, setNames] = useState({});
    const [InterviewIds, setInterviewIds] = useState({});

    const getName = async (userId) => {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `users/${userId}`));
        const username = snapshot.val().username;
        setNames(prevNames => ({
            ...prevNames,
            [userId]: username
        }));
    };
    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, 'interviews'));
            if (snapshot.exists()) {
                const interviewsData = [];
                snapshot.forEach((childSnapshot) => {
                    const intv=childSnapshot.val();
                    if(intv.creator===user.uid){
                        interviewsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
                    }
                });
                setInterviews(interviewsData);
            }
            const snapshot2 = await get(child(dbRef, 'completed-interviews/'+user.uid));
            if (snapshot2.exists()) {
                const interviewsData2 = [];

                snapshot2.forEach((childSnapshot) => {
                    const intv=childSnapshot.val();
                    const key=childSnapshot.key;
                    interviewsData2.push({ id: childSnapshot.key, ...childSnapshot.val() });

                });
                selectedsetInterviews(interviewsData2);
                console.log(selectedinterviews.length);
            }
            for(let i=0;i<selectedinterviews.length;i++){
                console.log("Key:"+selectedinterviews[i].id);
                const snapshot3 = await get(child(dbRef, 'completed-interviews/'+user.uid+"/"+selectedinterviews[i].id)).then();
                if (snapshot3.exists()) {
                    const interviewsData2 = [];

                    snapshot3.forEach((childSnapshot) => {
                        const intv=childSnapshot.val();
                        const key=childSnapshot.key;
                        interviewsData2.push({ id: childSnapshot.key, ...childSnapshot.val() });
                        setInterviewIds(prevNames => ({
                            ...prevNames,
                            [key]: selectedinterviews[i].id
                        }));
                    });
                    setFilteredInterviews(interviewsData2);
                    console.log(selectedinterviews.length);
                }
            }
        };


        fetchData();
        const user=auth.currentUser;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                console.log(snapshot.val().companyName)
                setName(snapshot.val().username);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        filtered.forEach(interview => {
            if (!names[interview.id]) {
                getName(interview.id);
            }
        });
    }, []);

    // useEffect(() => {
    //     const filtered = selectedinterviews.filter(interview => interview.creator === auth.currentUser.uid);
    //     setFilteredInterviews(filtered);
    //     console.log(filtered.length);
    // }, [interviews, auth.currentUser.uid]);
    const handleCardClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowModal(true);
    };
    // async function getName(userid) {
    //     const dbRef = ref(getDatabase());
    //     let name2='';
    //     await get(child(dbRef, `users/${userid}`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //             console.log(snapshot.val().companyName)
    //             name2 = snapshot.val().username;
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    //     return name2;
    // }
    // const getName = async (userId) => {
    //     const dbRef = ref(getDatabase());
    //     const snapshot = await get(child(dbRef, `users/${userId}`));
    //     console.log(snapshot.val().username);
    //     return snapshot.exists() ? snapshot.val().username : "No data available";
    // };
    const handleNavigate= (e)=>{
        navigate('create_quiz');
    }
    const handleNavigateSignOut= (e)=>{
        auth.signOut().then(function() {

            navigate('/');
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    }

    const handleCardClick2 = (quiz) => {
        console.log(quiz);
        navigate('interviewReport',{state:{paramName:quiz}});
    };

    const handleAssign = (quizId) => {
        // Logic to assign the quiz
        console.log(`Quiz with ID ${selectedQuiz.id} assigned`);
        const dbRef = ref(getDatabase());
        const db = getDatabase();
        push(ref(db, 'assignedQuizzes/'), {
            email: email,
            creator: auth.currentUser.uid,
            quiz: selectedQuiz,
            quizId: selectedQuiz.id,
        });
        alert(`Quiz assigned to :${email}`);
        setShowModal(false);
        setEmail('');
    };
    return(
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
                        {name}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Button className="custom-button" variant="outline-light" onClick={handleNavigate}>Create Interview</Button>
                            <Button className="custom-button" variant="outline-light" onClick={handleNavigateSignOut}>Sign Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5" >
                <h2>Created Interviews</h2>
                <div className="d-flex flex-wrap">
                    {interviews.map((interview) => (
                        <Card key={interview.id} className="m-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{interview.name}</Card.Title>
                                <Button variant="primary" onClick={() => handleCardClick(interview)}>View Details</Button>
                                <Button style={{marginLeft: '20px'}} variant="success" onClick={() => handleCardClick2(interview)} className="ml-2">Assign</Button>

                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
            <Container className="mt-5" >
                <h2>Completed Interviews</h2>
                <div className="d-flex flex-wrap">
                    {filtered.map((interview) => (

                        <Card key={interview.key} className="m-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{names[interview.id]}</Card.Title>
                                {/*<Card.Body>*/}
                                {/*    <div>{names[interview.id]}</div>*/}
                                {/*</Card.Body>*/}
                                {/*<Button variant="primary" onClick={() => handleCardClick(interview)}>View Details</Button>*/}
                                <Button style={{marginLeft: '20px'}} variant="success" onClick={() => handleCardClick2(auth.currentUser.uid+"/"+ InterviewIds[interview.id]+"/"+interview.id)} className="ml-2">View Report</Button>

                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedQuiz?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Questions:</h5>
                    <ul>
                        {selectedQuiz?.questions.map((question, index) => (
                            <li key={index}>{question.question} - {question.section}</li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
            {/* Modal to enter email address */}
            <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAssign}>Assign</Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
