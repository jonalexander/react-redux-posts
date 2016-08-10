import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const store = createStore(reducer)

// 1
function createStore() {
  let state

  const getState = function(){
    return state
  }

  const dispatch = function(action){
    state = reducer(state, action)
    render()
  }

  //
  state = reducer(state, {})
  return { getState, dispatch}
  // call store.getState() and store.dispatch(action) to
  // manage/view store
}

// 2
function reducer(state = {authors: [], posts: []}, action = {type: ''}){
  //pass default state if nothing is present
  //pass
  switch(action.type){
    case 'ADD_AUTHOR':
      return {authors: state.authors.concat(action.payload)}
    case 'ADD_POST':
      return {posts: state.posts.concat(action.payload)}
    default:
      return state
  }
}

// 3
function handleOnClick(event){
  event.preventDefault()
  var authorInput = document.getElement('author-input').value
  store.dispatch( {type: 'ADD_AUTHOR', payload: {author: authorInput}} )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
