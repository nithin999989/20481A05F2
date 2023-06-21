import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllTrainsPage} />
        <Route exact path="/trains/:trainNumber" component={SingleTrainPage} />
      </Switch>
    </Router>
  );
};

export default App;
