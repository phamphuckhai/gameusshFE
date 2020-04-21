import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import { IconButton } from '@material-ui/core'
import { Mood } from '@material-ui/icons';
import { MoodBad } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { green } from '@material-ui/core/colors';


class Home extends Component {
    constructor(props) {

        super(props);
        this.state = {
            level: 0,
            textPlay: 'Chơi'
        };
        this.soEzRef = React.createRef();
        this.ezRef = React.createRef();
        this.mRef = React.createRef();
        this.dfRef = React.createRef();
        this.soDfRef = React.createRef();
        this.playRef = React.createRef();
    }

    handleOnClick = () => {
        this.soEzRef.current.classList.remove('Hiden');
        this.ezRef.current.classList.remove('Hiden');
        this.mRef.current.classList.remove('Hiden');
        this.dfRef.current.classList.remove('Hiden');
        this.soDfRef.current.classList.remove('Hiden');
        // this.playRef.current.
        this.setState({textPlay: 'Vui lòng chọn mức độ chơi! '});

    }
    render() {
        return (
            <Fragment>
                <Helmet><title>Nhà</title></Helmet>
                <div id="home">
                    <section>
                        <div style={{ textAlign: 'center' }}>
                            <IconButton>
                                <Mood color="secondary" className="Emoji mod"></Mood>
                                <MoodBad color="secondary" className="Emoji badmod"></MoodBad>
                            </IconButton>
                        </div>
                        <h1>Nhận Diện</h1>
                        <div className="play-button-container">
                            <ul>
                                <li>
                                    <Link className="play-button" onClick={this.handleOnClick} ref={this.playRef}>{this.state.textPlay}</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="auth-container" >
                            <Link to="/play/quiz" className="auth-buttons Hiden" id="soEz" ref={this.soEzRef}>Cực Dễ</Link>
                            <Link to="/play/quiz" className="auth-buttons Hiden" id="ez" ref={this.ezRef}>Dễ</Link>
                        </div>
                        <div className="Ali" style={{textAlign: 'center' }} >
                        <Link to="/play/quiz" className="auth-buttons Hiden" id="me" ref={this.mRef}>Trung bình</Link>
                        </div>
                        <div className="auth-container" >
                            <Link to="/play/quiz" className="auth-buttons Hiden" id="df" ref={this.dfRef}>Khó</Link>
                            <Link to="/play/quiz" className="auth-buttons Hiden" id="soDf" ref={this.soDfRef}>Cực khó</Link>
                        </div>

                    </section>
                </div>
            </Fragment>
        );
    }
};

export default Home;