import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // {this.props.store}
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="CurrentAuthor">
            <CurrentAuthor store={this.props.store}/>
          </div>
          <div className="Author">
            <FormAuthor store={this.props.store}/>
          </div>
          <div className="Author">
            <ContainerAuthors store={this.props.store}/>
          </div>
          <div className="Post">
            <FormPost store={this.props.store} />
          </div>
          <div className="Post">
            <ContainerPosts store={this.props.store}/>
          </div>
        </ div>
      </ div>
    );
  }
}

/*
/$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$
/$$__  $$| $$  | $$|__  $$__/| $$  | $$ /$$__  $$| $$__  $$ /$$__  $$
| $$  \ $$| $$  | $$   | $$   | $$  | $$| $$  \ $$| $$  \ $$| $$  \__/
| $$$$$$$$| $$  | $$   | $$   | $$$$$$$$| $$  | $$| $$$$$$$/|  $$$$$$
| $$__  $$| $$  | $$   | $$   | $$__  $$| $$  | $$| $$__  $$ \____  $$
| $$  | $$| $$  | $$   | $$   | $$  | $$| $$  | $$| $$  \ $$ /$$  \ $$
| $$  | $$|  $$$$$$/   | $$   | $$  | $$|  $$$$$$/| $$  | $$|  $$$$$$/
|__/  |__/ \______/    |__/   |__/  |__/ \______/ |__/  |__/ \______/

*/


class FormAuthor extends Component {
  //this.props.store
  handleOnSubmitNewAuthor(event){
    event.preventDefault()
    var authorInput = document.getElementById('author-input').value
    this.props.store.dispatch({
      type: 'ADD_AUTHOR',
      payload: {
        name: authorInput,
        id: this.props.store.getState().authors.length + 1
      }})
  }

  render(){
    return(
      <form onSubmit={this.handleOnSubmitNewAuthor.bind(this)}>
        <div>
          <input id="author-input" type="text" placeholder="Author Name" />
        </ div>
        <div className="form-button">
          <button type="submit" > Add </ button>
        </ div>
      </form>
    )
  }
}

class ContainerAuthors extends Component {

  handleClickOnAuthor(event){
    event.preventDefault()
    this.props.store.dispatch({
      type: 'CHANGE_CURRENT_AUTHOR',
      payload: { currentAuthor: "TOlkien" }
      })
    }


  render(){
    var authors = this.props.store.getState().authors
    var counter = 0
    var handleClickOnAuthor = this.handleClickOnAuthor
    var allAuthors = authors.map( function(author){
      return(
        <IndividualAuthor key={counter++}
          authorData={author}
          handleClickOnAuthor={handleClickOnAuthor}
          />
      )})

    return(
      <div>
        Authors
        {allAuthors}
      </div>
    )
  }
}

class IndividualAuthor extends Component {
  render(){

    return(
      <div>
        <div onClick={this.props.handleClickOnAuthor}>{this.props.authorData.name}</div>
      </div>
    )
  }
}

class CurrentAuthor extends Component {

  render(){
    var lastCurrentAuthorName
    var currentAuthorArray = this.props.store.getState().current_author
    currentAuthorArray.length > 0 ? lastCurrentAuthorName = currentAuthorArray[ currentAuthorArray.length - 1 ].name : ""

    return(
      <div>
        Current Author: {lastCurrentAuthorName}
      </div>
    )
  }
}


/*
/$$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$
| $$__  $$ /$$__  $$ /$$__  $$|__  $$__//$$__  $$
| $$  \ $$| $$  \ $$| $$  \__/   | $$  | $$  \__/
| $$$$$$$/| $$  | $$|  $$$$$$    | $$  |  $$$$$$
| $$____/ | $$  | $$ \____  $$   | $$   \____  $$
| $$      | $$  | $$ /$$  \ $$   | $$   /$$  \ $$
| $$      |  $$$$$$/|  $$$$$$/   | $$  |  $$$$$$/
|__/       \______/  \______/    |__/   \______/
*/


class FormPost extends Component {
  displayForm(){
    return (
      <form onSubmit={this.handleOnSubmitNewPost.bind(this)}>
        <div><input id="post-title-input" type="text" placeholder="Post Title" /></ div>
        <div><input id="post-text-input" type="textarea" placeholder="Post Body" /></ div>
        <div className="form-button"><button type="submit"> Post </ button></ div>
      </ form>
    )
  }

  handleOnSubmitNewPost(event){
    event.preventDefault()
    var postTitleInput = document.getElementById('post-title-input').value
    var postTextInput = document.getElementById('post-text-input').value
    var currentAuthorArray = this.props.store.getState().current_author
    var lastCurrentAuthorId = currentAuthorArray[ currentAuthorArray.length - 1 ].id

    this.props.store.dispatch( {
      type: 'ADD_POST',
      payload: {
        title: postTitleInput,
        text: postTextInput,
        id: this.props.store.getState().posts.length + 1,
        author_id: lastCurrentAuthorId
        } // closes payload
      } )
  }

  render(){
    var currentAuthor = this.props.store.getState().current_author
    return(
      <div>
        { currentAuthor.length > 0 ? <div> {this.displayForm()} </div> : <div/> }
      </div>
    )
  }
}

class ContainerPosts extends Component {
  render(){
    var posts = this.props.store.getState().posts
    var counter = 0
    var allPosts = posts.map( function(post){
      return(
        <IndividualPost key={counter++} postData={post}/>
      )})

    return(
      <div>
        {allPosts}
      </div>
    )
  }
}

class IndividualPost extends Component {
  render(){
    return(
      <div>
        <div>{this.props.postData.title}</div>
        <div>{this.props.postData.text}</div>
      </div>
    )
  }
}


//Author
//AuthorList - container - iterate over authors in store and generate Author
//<AuthorList data={this.props.store.authors}>

//<Author name="" id="">
//  returns <div>{author.name}</div>



export default App;
