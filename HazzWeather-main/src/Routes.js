import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import Process_page from './components/Process_page';
import Blogs from './About';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={App} />
          <Route path='/process-page' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
