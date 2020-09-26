import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';


class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswer: 0,
            wrongAnswers: 0,
            fiftyFiftyUsed: 0,
            level: 0,
            mucDo: '',
            setting: [],
            time:{},
            sound: true,
        };
    }

    async setStateFromLoc(){
        const { state } = this.props.location;
        try {
            this.setState({
                // score: (state.score / state.numberOfQuestions) * 0.8 * 100,
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswer: state.correctAnswer,
                wrongAnswers: state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                level: state.level,
                setting: state.setting,
                time: state.time,
            });
        }
        catch (err) {
            //do not enything
        }
        
      

    }

    async setSetting(){
        // const {time, setting, score}= this.state;
        // var timer = time.minutes * 60 * 1000 + time.seconds*1000;
        // console.log(timer/setting[0].time);
        // if((timer/setting[0].time) > 0.5)
        // {
        //     this.setState({
        //         score: score + 20,
        //     });
        // }
        // else if((timer/setting[0].time) == 0)
        // {
        //     this.setState({
        //         score: score,
        //     });
        // }
        // else{
        //     {
        //         this.setState({
        //             score: score + 10,
        //         });
        //     }
        // }
    }

    async setNameLevel(){
        console.log(this.state.level)
        console.log(this.state.score)
        console.log(this.state.setting)
        console.log(this.state.time)
        var mucDo;
        if(this.state.level == 0)
        {
            mucDo = 'Cực dễ'
        }else if(this.state.level == 1)
        {
            mucDo = 'Dễ'
        }else if(this.state.level == 2)
        {
            mucDo = 'Trung bình'
        }else if(this.state.level == 3)
        {
            mucDo = 'Khó'
        }else if(this.state.level == 4)
        {
            mucDo = 'Cực khó'
        }
        console.log(mucDo)
        this.setState({mucDo: mucDo});
    }

    async componentDidMount() {
       await this.setStateFromLoc();
       await this.setSetting();
       await this.setNameLevel();
        
    }

    handleBackPlayClick = () => {
        const {state} = this;
        const playerStats = {
            level: state.level,
            sound: state.sound,
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quiz', playerStats);
        }, 1000);
    }

    render() {
        const { state, score } = this.props.location;
        let stats, title;
        let remark = "Chúc mừng bạn đã đạt danh hiệu";
        let img = "";
        const userscore = this.state.score;
        if (userscore < 40) {
            title = '"GÀ MỜ"';
            img = "https://i.imgur.com/CxUV2at.png";
        }
        else if (userscore >= 40 && userscore < 60) {
            title = '"TÂN BINH ĐỌC TIN"'
            img = "https://i.imgur.com/aJ7Yl8L.png";
        }
        else if (userscore >= 60 && userscore < 80) {
            title = '"NGƯỜI ĐỌC BÁO CHĂM CHỈ"'
            img = "https://i.imgur.com/EnWDcm3.png"
        }
        else if (userscore >= 80 && userscore <= 100) {
            title = '"THÁNH SOI TIN"'
            img = "https://i.imgur.com/hEAAaQ2.png"
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
                        <h4 style={{color: 'red'}}>{title}<img className="icon-1" src={img}></img></h4>
                        
                        <h2>Điểm của bạn: {this.state.score.toFixed(0)}&#37;</h2>

                        {/* <span className="stat left">Mức độ</span>
                        <span className="right">{this.state.mucDo}</span><br /> */}

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
                                <Link ontouchmove to="/">Quay về trang chủ</Link>
                            </li>
                            <li>
                                <Link ontouchmove onClick={this.handleBackPlayClick}>Chơi lại</Link>
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
                <Helmet><title>Thành tích</title></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary;