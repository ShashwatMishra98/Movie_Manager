import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieView from './components/MovieView';
import './assets/Styles/style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/:title" component={MovieView} />
          <Route path="/" component={MovieList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
