import {RecoilRoot} from 'recoil';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import {NavigationLinks} from 'enums';

import {NewsPage} from 'modules/news';
import {SecuritiesPage} from 'modules/securities';

export const MainApp = () => (
  <RecoilRoot>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to={NavigationLinks.Securities}>
              <h1>Securities</h1>
            </Link>
          </li>
          <li>
            <Link to={NavigationLinks.News}>
              <h1>News</h1>
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path={NavigationLinks.Securities} component={SecuritiesPage} />
        <Route path={NavigationLinks.News} component={NewsPage} />
      </Switch>
    </Router>
  </RecoilRoot>
);
