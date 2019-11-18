import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { flexbox } from '@material-ui/system';

const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instruction - Quiz App</title></Helmet>
        <div>
            <h1>
                Hướng dẫn cách chơi
            </h1>
            <div style={{display: flexbox, fontSize: 20}}>
                <span className="left"><Link to ="/">Thôi! Quay lại</Link></span>
                <span className="right"><Link to ="/play/quiz">Chơi luôn!</Link></span>
            </div>
        </div>
    </Fragment>
);

export default QuizInstructions;