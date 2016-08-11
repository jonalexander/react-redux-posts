import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '/'

class App extends Component {
  // {this.props.store}

  render() {
    return (
      <div className="App">
        <div className="container">

        <div className="left-half">
          <div className="Author">
            <FormAuthor store={this.props.store}/>
          </div>
          <div className="Author">
            <ContainerAuthors store={this.props.store}/>
          </div>
        </div>

        <div className="right-half">
        <div className="CurrentAuthor">
          <CurrentAuthor store={this.props.store}/>
         </div>
          <div className="Post">
            <FormPost store={this.props.store} />
          </div>
          <div className="Post">
            <ContainerPosts store={this.props.store}/>
          </div>
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
    var authorInput = document.getElementById('add-author-input').value
    document.getElementById('add-author-input').value = ""
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
          <input id="add-author-input" type="text" placeholder="Add Author" />
        </div>
        <div className="form-button">
        </div>
      </form>
    )
  }
}

class ContainerAuthors extends Component {

  handleClickOnAuthor(event){
    event.preventDefault()

    var selectedAuthor = event.target.getAttribute('value')
    var selectedAuthorObject = this.props.store.getState().authors.find( (author) => { return author.name === event.target.getAttribute('value')})

    this.props.store.dispatch({
      type: 'CHANGE_CURRENT_AUTHOR',
      payload: selectedAuthorObject
    })
  }

  render(){
    var counter = 0

    var authors = this.props.store.getState().authors
    var handleClickOnAuthor = this.handleClickOnAuthor.bind(this)

    var allAuthors = authors.map( function(author){
      return(
        <IndividualAuthor key={counter++}
          authorData={author}
          handleClickOnAuthor={handleClickOnAuthor}
          />
      )})

    return(
      <div className="author-container">
        <h5>Authors</h5>
        {allAuthors}
      </div>
    )
  }
}

class IndividualAuthor extends Component {
  render(){

    return(
      <div>
        <a href="#"
           onClick={this.props.handleClickOnAuthor}
           value={this.props.authorData.name}>
           {this.props.authorData.id}
           {this.props.authorData.name}
        </a>
      </div>
    )
  }
}

class CurrentAuthor extends Component {
  render(){
    var lastCurrentAuthorName
    var currentAuthorArray = this.props.store.getState().current_author
    lastCurrentAuthorName = currentAuthorArray.length > 0 ? currentAuthorArray[currentAuthorArray.length - 1].name : ""

    return(
      <div>
        <h5>{lastCurrentAuthorName}</h5>
      </div>
    )
  }
}


/*
██▓███  ▒█████    ██████ ▄▄▄█████▓ ██████
▓██░  ██▒██▒  ██▒▒██    ▒ ▓  ██▒ ▓▒██    ▒
▓██░ ██▓▒██░  ██▒░ ▓██▄   ▒ ▓██░ ▒░ ▓██▄
▒██▄█▓▒ ▒██   ██░  ▒   ██▒░ ▓██▓ ░  ▒   ██▒
▒██▒ ░  ░ ████▓▒░▒██████▒▒  ▒██▒ ░▒██████▒▒
▒▓▒░ ░  ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░  ▒ ░░  ▒ ▒▓▒ ▒ ░
░▒ ░      ░ ▒ ▒░ ░ ░▒  ░ ░    ░   ░ ░▒  ░ ░
░░      ░ ░ ░ ▒  ░  ░  ░    ░     ░  ░  ░
           ░ ░        ░                ░
*/


class FormPost extends Component {
  displayForm(){
    return (
      <form onSubmit={this.handleOnSubmitNewPost.bind(this)}>
        <div><input id="post-title-input" type="text" placeholder="Post Title" /></ div>
        <div><input id="post-text-input" type="textarea" placeholder="Post Body" /></ div>
        <button type="submit"> Post </button>
      </ form>
    )
  }

  handleOnSubmitNewPost(event){
    event.preventDefault()
    var postTitleInput = document.getElementById('post-title-input').value
    var postTextInput = document.getElementById('post-text-input').value
    document.getElementById('post-title-input').value = ""
    document.getElementById('post-text-input').value = ""
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
    var counter = 0
    var posts = this.props.store.getState().posts
    if (this.props.store.getState().current_author.length > 0) {
        var currentAuthorArray = this.props.store.getState().current_author
        var lastCurrentAuthorId = currentAuthorArray[ currentAuthorArray.length - 1 ].id
    }

    var selectedPosts = posts.map( function(post){
      return(
        <div>
          {lastCurrentAuthorId && post.author_id === lastCurrentAuthorId ?  <IndividualPost key={counter++} postData={post}/> : <div/>}
        </div>
      )})

//
    return(
      <div>
        {selectedPosts}
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
