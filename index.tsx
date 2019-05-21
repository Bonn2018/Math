import * as React from 'react';
import classNames from 'classnames';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import Multiplication from './tasks/matrix/multiplication';
import './index.sass';
import './theme';


export default class GlobalWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <div className="window">
          <div className={classNames('fill_dark_grey', 'r_menu')}>
            <nav>
              <NavLink className="menu_link" to="./matrix" exact={true}>
                1. Matrix
              </NavLink>
            </nav>
          </div>
          <div className="workspace">
            <Switch>
              <Route
                path="/matrix"
                component={() => <Multiplication />} />
              <Route />
            </Switch> 
          </div> 
        </div>
      </Router>
    );
  }
}

render(<GlobalWindow />, document.getElementById('root'));
