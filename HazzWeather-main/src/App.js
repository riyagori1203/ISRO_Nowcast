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
import './languages/i18n';
import LakeBackground from './asset/lake-background.jpg';
import Astronaut from './asset/not-found.svg';
import SearchPlace from './asset/search.svg';
import BackgroundColor from './components/BackgroundColor';
import BackgroundImage from './components/BackgroundImage';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
