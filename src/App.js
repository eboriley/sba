import './App.css';
import {useState} from 'react';
import Student from './components/Students'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
        <Student/>
        </Switch>
      
      </Router>
      
    </div>
  );
}

export default App;

