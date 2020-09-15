import React from 'react';
import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import Page2 from './Page2';

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/landingPage">
            <LandingPage />
          </Route>
          <Route exact path="/page2">
            <Page2 />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
