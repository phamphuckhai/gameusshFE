import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswer: 0,
            wrongAnswers: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        try {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswer: state.correctAnswer,
                wrongAnswers: state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
        catch (err) {
            //do not enything
        }
    }

    render() {
        const { state, score } = this.props.location;
        let stats, remark;
        const userscore = this.state.score;
        if (userscore <= 30) {
            remark = 'Còn kém! Hãy cố gắng hơn nữa!'
        }
        else if (userscore > 30 && userscore <= 50) {
            remark = 'Lần sau hãy cố lên!'
        }
        else if (userscore > 50 && userscore < 70) {
            remark = 'Bạn có thể làm tốt hơn nữa!'
        }
        else if (userscore >= 70 && userscore <= 80) {
            remark = 'Bạn đã làm rất tốt!'
        }
        else {
            remark = 'Bạn thật tuyệt vời!'
        }
        if (state !== undefined) {
            stats = (
                <Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Thành tích</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Điểm của bạn: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Tổng số câu hỏi</span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />

                        <span className="stat left">Tổng số câu hỏi bạn đã trả lời</span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

                        <span className="stat left">Tổng số câu hỏi đã trả lời đúng</span>
                        <span className="right">{this.state.correctAnswer}</span><br />
                    </div>
                    <section className='quiz-summmary'>
                        <ul>
                            <li>
                                <Link to="/">Quay về trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/play/quiz">Chơi lại</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            );

        }
        else {

            stats = (
                <section>
                    <h1>LỖI !!!!!!!</h1>
                    <ul>
                        <li>
                            <Link to="/">Quay về trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/play/quiz">Chơi lại</Link>
                        </li>
                    </ul>
                </section>

            );
        }
        return (
            <Fragment>
                <Helmet><title>Thành tích</title>></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary;