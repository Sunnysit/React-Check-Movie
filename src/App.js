import React, { Component } from 'react';
import List from './List';
import './App.css';
class App extends Component {
  constructor() {
    super();     


  }

  render() {
    return (
      <div className="myapp">
      <header className="header">
        <h1 className="title">Check Movie</h1>
      </header>
      <List/>
      <footer className="footer">
        <div>
          <p>©2018 CODE AND DESIGN BY SUNNY XUE</p>
        </div>
        <div>
        <p>Movie Information From</p>
        <a className="credit-link" target="_blank" href="https://www.themoviedb.org/">
        <img className="dblogo" src="./images/moviedb_logo.png" alt="moviedb_logo"/>
        </a>
        </div>
      </footer>
      </div>
    );
  }
}
export default App;
