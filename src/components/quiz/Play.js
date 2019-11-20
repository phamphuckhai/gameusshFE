import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import M from 'materialize-css';
import Button from '@material-ui/core/Button';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { withStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import correctNotification from '../../assets/audio/correct.wav';
import incorrectNotification from '../../assets/audio/incorrect.mp3';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
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


    constructor(props) {
        shuffle(questions);
        super(props);
        this.state = {
            questions,
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
            tim: {},
            hint: false,
            bsound: true
        };
        this.divRef = React.createRef()
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
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
                answer
            });
        }
    };

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            document.getElementById('correct-sound').play();
            this.correctAnswer();
        } else {
            document.getElementById('incorrect-sound').play();
            this.wrongAnswer();
        }
    }

    handleQuitButtonClick = () => {
        if (window.confirm('Bạn có muốn thoát?')) {
            this.props.history.push('/');
        }
    };

    handleHintClick = () =>{
        if(this.state.hint===false)
            this.divRef.current.classList.add('hide');
        else 
            this.divRef.current.classList.remove('hide');
        this.setState(prevState=>({
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
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        );
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Sai rồi! Tiếc quá!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswer: prevState.wrongAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        }
        );
    }

    render() {

        const { classes } = this.props;
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, correctAnswer } = this.state;

        return (
            <Fragment>
                <Helmet><title>Trắc nghiệm</title></Helmet>
                <Fragment>
                    <audio id="correct-sound" src={correctNotification}></audio>
                    <audio id="incorrect-sound" src={incorrectNotification}></audio>
                </Fragment>
                <div className="questions" >
                    <h2>Chọn đáp án đúng</h2>
                    <div className="lifeline-container">
                        <p>
                            <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon "><span className="lifeline">{correctAnswer}</span></span>
                        </p>
                    </div>
                    <div className="space-flex">

                        <span className="">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        <span className="timer">0:30<TimerIcon></TimerIcon></span>

                    </div>
                    <br></br>
                    <div className="scrollBar">
                        <h5 ref={this.divRef}>{currentQuestion.question}</h5>
                        <span className="extra">Nguồn: {currentQuestion.source}</span>
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
    
}

function shuffle(array) {
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

    return array;
}

export default withStyles(styles)(Play);