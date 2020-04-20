import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { IconButton } from '@material-ui/core'
import Play from './Play';


class End extends Component {

    constructor(props) {
        super(props);
        this.state= {
           
        }
      }
      
    setScore(score){
        return(
            this.setState({
                score
            })
        )
    }
    render(){
        const {score} = this.state;
        console.log(score);
        return(
    <h5>{score}</h5>
        );
    }

}
    
export default End;