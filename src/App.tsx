import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from '@/Layout/ScrollToTop'
import Layout from '@/Layout/Layout'

function App() {
  return (
        <Router>
          <ScrollToTop>
            <Switch>
                <Route  component={Layout} />
            </Switch>
          </ScrollToTop>
        </Router>
  );
}
export default App;
