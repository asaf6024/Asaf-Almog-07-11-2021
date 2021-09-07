import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer'
import Favorites from './pages/Favorites/Favorites';
function App() {
  return (
    <div>
      <Router>

        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
