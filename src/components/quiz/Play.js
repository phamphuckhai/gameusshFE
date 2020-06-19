import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import M from 'materialize-css';
import Button from '@material-ui/core/Button';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { withStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { Link } from 'react-router-dom';

// import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import correctNotification from '../../assets/audio/correct.wav';
import incorrectNotification from '../../assets/audio/incorrect.mp3';

//firebase
import { db } from '../../services/firebase';
import { ThreeSixtySharp, FontDownload, Bluetooth } from '@material-ui/icons';




const styles = theme => ({
    button: {

        margin: theme.spacing(),
    },
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
});




class Play extends Component {
    //     constructor(props){
    //         super(props);
    //         this.state = {
    //             questions: null
    //         }
    //     }

    //     componentDidMount(){
    //             db.collection('questions')
    //       .get()
    //       .then(snapshot => {
    //           console.log(snapshot);
    //           const questions = []
    //           snapshot.forEach(doc => {

    //               const data = doc.data();
    //               questions.push(data);
    //           })
    //           console.log(questions );
    //          this.setState({questions: questions})
    //         })
    //       .catch(error => console.log(error));
    // }


    //     render(){
    //        return(
    //            <div className="app">

    //            </div>
    //        )
    //     }
    // }
    // export default Play

    constructor(props) {

        super(props);
        // shuffle(questions);
        this.state = {
            level: 0,
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
            hints: 5,
            fiftyFifty: 0.5,
            useFiftyFifty: false,
            time: {},
            hint: false,
            bsound: true,
            colecItem: "",
            sound: true,
        };
        this.divRef = React.createRef();
        this.interval = null;
        this.wrongSound = React.createRef();
        this.correctSound = React.createRef();
        this.restartScrollbar = React.createRef();

    }

    async chooseLevel() {
        let colecItem = '';
        if (this.state.level == 0) {
            colecItem = "questions"
        } else if (this.state.level == 1) {
            colecItem = "questions1"
        } else if (this.state.level == 2) {
            colecItem = "questions2"
        } else if (this.state.level == 3) {
            colecItem = "questions3"
        } else if (this.state.level == 4) {
            colecItem = "questions4"
        }
        this.setState({ colecItem: colecItem });
    }

    async initQuestion() {
        await this.initLevel();
        var questions = [];
        await this.chooseLevel();
        console.log('im constructor');
        // await db.collection(colecItem)
        await db.collection(this.state.colecItem)
            .get()
            .then(snapshot => {
                console.log(snapshot);
                snapshot.forEach(doc => {

                    const data = doc.data();
                    questions.push(data);
                })
                console.log(questions);
                this.setState({ questions: questions })
            })
            .catch(error => console.log(error));
    }

    async initLevel() {
        const { state } = this.props.location;
        this.setState({
            level: state.level,
            sound: state.sound
        });
    }
    

    displayFirst = () => {
        console.log('im componentdidmount');
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {

    }


    async componentDidMount() {
        await this.initQuestion();
        await this.chooseMode(this.state.questions)
        this.displayFirst();

    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        console.log('im displayquestion');

        let { currentQuestionIndex } = this.state;
        if (currentQuestionIndex + 1 > questions.length) {
            setTimeout(
                function () {
                    this.props.history.push('/play/end');
                    this.setState({ position: 1 });
                }
                    .bind(this), 300
            );

        } else {
            if (this.state.hint === true)
                this.divRef.current.classList.add('hide');
            if (!isEmpty(this.state.questions)) {
                questions = this.state.questions;
                currentQuestion = questions[currentQuestionIndex];
                nextQuestion = questions[currentQuestionIndex + 1];
                previousQuestion = questions[currentQuestionIndex - 1];
                const answer = currentQuestion.answer;
                this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    answer,
                    hint: false
                });
            }
        }

    };

    handleOptionClick = (e) => {
        const { sound } = this.state;

        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            if (sound) {
                this.correctSound.current.play();
                this.correctAnswer();
            }else{
                this.correctAnswer();
            }
        } else {
            if (sound) {
                this.wrongSound.current.play();
                this.wrongAnswer();
            }
            else{
                this.wrongAnswer();
            }
          
        }

        this.restartScrollbar.current.scrollTo(0, 0);
    }

    soundClick = () => {
        const { sound } = this.state;
        this.setState({ sound: !sound });
    }
    
    handleQuitButtonClick = () => {
        if (window.confirm('Bạn có muốn thoát?')) {
            this.props.history.push('/');
        }
    };

    handleHintClick = () => {
        if (this.state.hint === false)
            this.divRef.current.classList.remove('hide');
        else
            this.divRef.current.classList.add('hide');
        this.setState(prevState => ({
            hint: !prevState.hint
        }));
    }

    correctAnswer = () => {
        M.toast({
            html: 'Đúng rồi!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswer: prevState.correctAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)

            }
        }
        );
    }

    wrongAnswer = () => {
        try{
            navigator.vibrate(500);
        }
        catch(error){
            //don't do anything
        }
       
        M.toast({
            html: 'Sai rồi! Tiếc quá!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswer: prevState.wrongAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)

            }
        }
        );
    }

    startTimer = () => {
        const countDownTime = Date.now() + 150000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    // alert('Hết giờ!!!!');;
                    // this.props.history.push('/');
                    this.endGame();
                });

            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }

    endGame = () => {
        alert('Kết thúc!');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswer: state.correctAnswer,
            wrongAnswer: state.wrongAnswer,
            fiftyFifty: 2 - state.fiftyFifty,
            level: state.level
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quizSummary', playerStats);
        }, 1000);
    }
    render() {
        //    console.log(this.state.questions)
        const { classes } = this.props;
        const { currentQuestion,
            currentQuestionIndex,
            numberOfQuestions,
            correctAnswer,
            time,
            score,
            sound
        } = this.state;

        return (
            <Fragment>
                <Helmet><title>Trắc nghiệm</title></Helmet>
                <Fragment>
                    <audio ref={this.correctSound} src={correctNotification}></audio>
                    <audio ref={this.wrongSound} src={incorrectNotification}></audio>
                </Fragment>
                <div className="questions" >
                    <h3><b>Chọn đáp án đúng</b></h3>
                    <div className="lifeline-container">
                        <p>
                            <span>Số đáp án đúng: <span className="">{correctAnswer}</span></span>
                        </p>
                        <Link onClick={this.soundClick} className="" style={{marginBottom: 10}}>
                            {sound ? <VolumeUpIcon /> : <VolumeOffIcon />}
                        </Link> 
                    </div>
                    <div className="space-flex">

                        <span className="">Số câu: {currentQuestionIndex + 1}/{numberOfQuestions}</span>
                        <span className="timer">{time.minutes}:{time.seconds}<TimerIcon></TimerIcon></span>

                    </div>
                    <br></br>
                    <div>
                        <div className="scrollBar" ref={this.restartScrollbar}>
                            <img src={currentQuestion.image} alt="Picture" id="myImage" />
                            <h5 style={{ textAlign: 'left' }}><b>{currentQuestion.title}</b></h5>
                            <h5>{currentQuestion.question}</h5>
                        </div>

                        <span className="extra hide" ref={this.divRef}>Nguồn: {currentQuestion.hint}</span>
                    </div>

                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionI}</p>
                    </div>

                    <div className="button-container space-flex" >
                        <Button
                            onClick={this.handleQuitButtonClick}
                            variant="contained"
                            color="yellow"
                            className={classes.button}
                            startIcon={<ExitToAppIcon />}
                        >
                            Thoát
                        </Button>



                        <Button
                            onClick={this.handleHintClick}
                            variant="contained"
                            color="yellow"
                            className={classes.button}
                            startIcon={<EmojiObjectsIcon />}
                        >
                            Gợi ý
                        </Button>
                    </div>
                </div>

            </Fragment>

        );

    }

    //Init shuffle question function
    async shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }


    }

    async chooseIncorrect(mainArray, array, ic) {
        var i = 0;
        while (mainArray.length < ic) {
            if (array[i].answer == 'Sai')
                mainArray.push(array[i])
            i += 1;
        }
    }

    async chooseCorrect(mainArray, array, c) {
        var i = 0;
        while (mainArray.length < c) {
            if (array[i].answer == 'Đúng')
                mainArray.push(array[i])
            i += 1;
        }
    }

    async chooseMode(array) {
        console.log('im in choose mode');
        console.log(array);
        this.shuffle(array);
        var rad = Math.floor(Math.random() * 2) + 0;
        var mainArray = [];
        //Mode 1 => 4 sai 6 dung
        if (rad == 1) {
            await this.chooseIncorrect(mainArray, array, 4);
            await this.chooseCorrect(mainArray, array, 10);
            await this.shuffle(mainArray);
            this.setState({ questions: mainArray });

        }
        else if (rad == 0) {
            await this.chooseCorrect(mainArray, array, 4);
            await this.chooseIncorrect(mainArray, array, 10);
            await this.shuffle(mainArray);
            this.setState({ questions: mainArray });
        }
        console.log(rad)
        console.log(mainArray)

    }

}



export default withStyles(styles)(Play);