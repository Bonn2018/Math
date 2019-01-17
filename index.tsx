import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './theme';


class GlobalWindow extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Route />
          <Route />
        </div>
      </Router>
    );
  }
}