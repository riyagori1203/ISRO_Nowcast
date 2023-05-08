import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  TbMapSearch,
  TbMoon,
  TbSearch,
  TbSun,
  TbVolume,
  TbVolumeOff,
} from 'react-icons/tb';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';
import About from './About';
import Home from './Home';
import Precip from './Precip';
import Uploaded from './Uploaded';
import Gifs from './Gifs';
import Preprocessed from './Preprocessed';
import './languages/i18n';
import axios from 'axios';
import { Card } from 'antd';
// import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/process-page' element={<About />} />
          <Route exact path='/precip-page' element={<Precip />} />
          <Route exact path='/upload-page' element={<Uploaded />} />
          <Route exact path='/gif-page' element={<Gifs />} />
          <Route exact path='/preprocessed-page' element={<Preprocessed />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
