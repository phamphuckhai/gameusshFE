import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import End from './components/quiz/End';


function App() {
  return (
   <Router>
     <Route path = "/" exact component = {Home}/>
     <Route path = "/play/instructions" exact component = {QuizInstructions}/>
     <Route path = "/play/Quiz" exact component = {Play}/>
     <Route path = "/play/end" exact component = {End}/>
   </Router>
  );
}


export default App;
