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

  state = reducer(state, {})
  //getting copy of state without any changes/actions

  return { getState, dispatch }
  // call store.getState() and store.dispatch(action) to
  // manage/view store
}

// 2
function reducer(state = {authors: [], posts: [], current_author: []}, action = {type: '', payload: {}}){
  //pass default state if nothing is present
  switch(action.type){
    case 'ADD_AUTHOR':
      return {
        authors: state.authors.concat(action.payload),
        posts: state.posts,
        current_author: state.current_author.concat(action.payload)
      }
    case 'ADD_POST':
      return {
        authors: state.authors,
        posts: state.posts.concat(action.payload),
        current_author: state.current_author
      }
    case 'CHANGE_CURRENT_AUTHOR':
      return {
        authors: state.authors,
        posts: state.posts,
        current_author: state.current_author.concat(action.payload)
      }
    default:
      return state
  }
}

function render() {
  ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
  );
}

render()
