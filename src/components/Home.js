import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { IconButton } from '@material-ui/core'
import {Mood} from '@material-ui/icons';
import {MoodBad} from '@material-ui/icons';
import { Link } from 'react-router-dom'

const Home = () => (
    <Fragment>
        <Helmet><title>Nhà</title></Helmet>
        <div id="home">
            <section>
                <div style={{textAlign: 'center'}}>
                    <IconButton>
                      <Mood color="secondary" className="Emoji"></Mood>
                        <MoodBad color="secondary" className="Emoji"></MoodBad>
                    </IconButton>
                </div>
                <h1>Nhận Diện</h1>
                <div className = "play-button-container">
                    <ul>
                        <li>
                            <Link className="play-button" to="/play/instructions">Chơi</Link>
                        </li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to = "/login" className="auth-buttons" id="login-button">Đăng nhập</Link>
                    <Link to = "/register" className="auth-buttons" id="signup-button">Đăng kí</Link>
                </div>
            </section>
        </div>
    </Fragment>
    
);
    
export default Home;