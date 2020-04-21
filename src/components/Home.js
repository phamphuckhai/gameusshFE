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

    async pasteState () {
        const {state} = this;
        const homeStats = {
          level: state.level  
          
        };
        setTimeout(() => {
            this.props.history.push('/play/quiz', homeStats);
        }, 1000);
        
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

    async setLevel(a){
        this.setState({level: a})
    }

    async changePage(a){
        await this.setLevel(a);
        console.log(this.state.level);
        await this.pasteState();
    }
    sEzFunc = () => {
        this.changePage(0);
    }

    ezFunc = () => {
        this.changePage(1);
    }

    mFunc = () => {
        this.changePage(2);
    }

    dfFunc = () => {
        this.changePage(3);
    }

    soDfFunc = () => {
        this.changePage(4);
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
                            <Link className="auth-buttons Hiden" id="soEz" ref={this.soEzRef} onClick={this.sEzFunc}>Cực Dễ</Link>
                            <Link className="auth-buttons Hiden" id="ez" ref={this.ezRef} onClick={this.ezFunc}>Dễ</Link>
                        </div>
                        <div className="Ali" style={{textAlign: 'center' }} >
                        <Link className="auth-buttons Hiden" id="me" ref={this.mRef} onClick={this.mFunc}>Trung bình</Link>
                        </div>
                        <div className="auth-container" >
                            <Link className="auth-buttons Hiden" id="df" ref={this.dfRef} onClick={this.dfFunc}>Khó</Link>
                            <Link className="auth-buttons Hiden" id="soDf" ref={this.soDfRef} onClick={this.soDfFunc}>Cực khó</Link>
                        </div>

                    </section>
                </div>
            </Fragment>
        );
    }
};

export default Home;