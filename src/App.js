import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="Author">
            <FormAuthor />
          </div>
          <div className="Post">
            <FormPost />
          </div>
        </ div>
      </ div>
    );
  }
}

class FormAuthor extends Component {
  render(){
    return(
      <form>
        <div><input type="text" placeholder="Author Name" /></ div>
        <div className="form-button"><button type="submit"> Add </ button></ div>
      </form>
    )
  }
}

class FormPost extends Component {
  render(){
    return(
      <form>
        <div><input type="text" placeholder="Post Title" /></ div>
        <div><input type="textarea" placeholder="Post Body" /></ div>
        <div className="form-button"><button type="submit"> Post </ button></ div>
      </ form>
    )
  }
}



export default App;
