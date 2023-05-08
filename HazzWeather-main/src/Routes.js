import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import About from './About';
import precip from './Precip';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={App} />
          <Route path='/process-page' element={<About />} />
          <Route path='/precip-page' element={precip} />
        </Routes>
      </BrowserRouter>
    );
  }
}
