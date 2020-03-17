import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainContent } from './components/MainContent';
import { WindowContent } from './components/WindowContent';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainContent />
        </Route>
        <Route path="/window">
          <WindowContent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
