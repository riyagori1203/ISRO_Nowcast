import { useEffect, useMemo, useState, ReactDOM, React, PropTypes, styled } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import {
  TbMapSearch,
  TbMoon,
  TbSearch,
  TbSun,
  TbVolume,
  TbVolumeOff,
} from 'react-icons/tb';
import DetailsCard from './components/DetailsCard';
import { NavLink } from 'react-router-dom';

import SummaryCard from './components/SummaryCard';
import './languages/i18n';
import LakeBackground from './assets/lake-background.jpg';
import Astronaut from './assets/not-found.svg';
import SearchPlace from './assets/search.svg';
import axios from 'axios';
import { Card } from 'antd';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import logo from './assets/ISRO-SAC.jpg'

function Home() {
  document.body.classList.remove('About');
  // new line start
  const [profileData, setProfileData] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const { t, i18n } = useTranslation();
  const [noData, setNoData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState();
  const [weatherIcon, setWeatherIcon] = useState(
    `https://openweathermap.org/img/wn/10n@2x.png`
  );
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [loading, setLoading] = useState(false);
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const degreeSymbol = useMemo(
    () => (isFahrenheitMode ? '\u00b0F' : '\u00b0C'),
    [isFahrenheitMode]
  );
  const [active, setActive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // SETTING THEMES ACCORDING TO DEVICE
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setIsDark(true);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setIsDark(event.matches);
      });
  }, [setIsDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const activate = () => {
    setActive(true);
  };

  useEffect(() => {
    if (currentLanguage === 'en') return;

    changeLanguage(currentLanguage);

    // eslint-disable-next-line
  }, [currentLanguage]);

  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode);
  };

  // const handleChange = (input) => {
  //   const { value } = input.target;
  //   setSearchTerm(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const handleLanguage = (event) => {
    changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };

  const changeLanguage = (value, location) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value) && getWeather(location))
      .catch((err) => console.log(err));
  };

  const getWeather = async (location) => {
    setLoading(true);
    setWeatherData([]);
    let how_to_search =
      typeof location === 'string'
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    const url = 'https://api.openweathermap.org/data/2.5/forecast?';
    try {
      let res = await fetch(
        `${url}${how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      let data = await res.json();
      if (data.cod !== '200') {
        setNoData('Location Not Found');
        setCity('Unknown Location');
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
      setWeatherData(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          'https://openweathermap.org/img/wn/' + data.list[0].weather[0]['icon']
        }@4x.png`
      );
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  // For the autocomplete search box- Places List
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      let arr = [];
      response.data.forEach((element) => {
        arr.push(element.name.official);
      });
      setCountries(arr);
      console.log(arr);
    };

    loadCountries();
  }, []);

  // console.log(countries);

  const searchCountries = (input) => {
    // const {value}=input.target;
    setSearchTerm(input);

    if (!input) {
      // created if-else loop for matching countries according to the input
      setCountryMatch([]);
    } else {
      let matches = countries.filter((country) => {
        // eslint-disable-next-line no-template-curly-in-string
        const regex = new RegExp(`${input}`, 'gi');
        // console.log(regex)
        return country.match(regex) || country.match(regex);
      });
      setCountryMatch(matches);
    }
    // console.log(countryMatch);
  };

  //upload gif
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [message, setMessage] = useState('');
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUrl(event.target.files[0]);
  };
  const handleGifSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    setMessage('File has been uploaded and nowcast generation is in progress...');
    try {
      const response = await axios.post('/upload', formData);
      setFileUrl(response.data.file_path);
      // fileUrl = response.data.file_path;
      console.log(fileUrl);
      setMessage('Nowcast has been generated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file.');
    }
    // fetch('http://127.0.0.1:5000/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // function getData() {
    //   axios({
    //     method: 'GET',
    //     url: '/profile',
    //   })
    //     .then((response) => {
    //       const res = response.data;
    //       setProfileData({
    //         profile_name: res.name,
    //         about_me: res.about,
    //       });
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log(error.response);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //       }
    //     });
    // }

    // .then((response) => response.json())
    // .then((data) => {
    //   // Handle the response from your Flask API
    //   console.log('uploaded');
    // })
    // .catch((error) => console.error(error));
  };
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  // load current location weather info on load
  window.addEventListener('load', function () {
    navigator.geolocation.getCurrentPosition(myIP);
  });


  // disclaimer



  return (
    <div className='container'>
      <div
        className='blur'
        style={{
          background: '#a6ddf0',
          top: '-10%',
          right: '0',
        }}
      ></div>
      <div
        className='blur'
        style={{
          backgroundImage: `url(${'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/07/mumbai-rains-1593780460.jpg'})`,

          top: '36%',
          left: '-6rem',
        }}
      ></div>
      <div className='content'>
        <div className='form-container'>
          <div className='name'>
            <div>{t('headline')}</div>
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='checkbox'
                checked={isDark}
                onChange={toggleDark}
              />
              <label htmlFor='checkbox' className='label'>
                <TbMoon
                  style={{
                    color: '#a6ddf0',
                  }}
                />
                <TbSun
                  style={{
                    color: '#f5c32c',
                  }}
                />
                <div className='ball' />
              </label>
            </div>
            <div className='city'>
              <TbMapSearch />
              <p>{city ?? t('unknown-location')}</p>
            </div>
          </div>
          <div className='search'>
            <h3
              style={{
                marginRight: currentLanguage === 'es' || 'fr' ? '10px' : '0px',
              }}
            >
              {t('title')}
            </h3>
            <img src={logo} style={{height: '20%', width: '20%', borderRadius: '10%'}}/>
            <hr />
            <form className='search-bar' noValidate onSubmit={handleSubmit}>
              <input
                onClick={activate}
                placeholder={t('explore')}
                onChange={(e) => searchCountries(e.target.value)}
                required
                className='input_search'
              />

              <div className='list-dropdown'>
                {countryMatch &&
                  countryMatch.map((item, index) => (
                    <div>
                      {/* eslint-disable-next-line no-template-curly-in-string */}
                      {/* <Card title={`Country: ${item}`}></Card> */}
                    </div>
                  ))}
              </div>

              <button className='s-icon'>
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 700 }}>Upload Radar GIFs</div>
            <hr/>
            <form className='upload' noValidate onSubmit={handleGifSubmit}>
              <input
                onClick={activate}
                src={file}
                className='input_search'
                type='file'
                accept='image/gif'
                onChange={handleFileChange}
              />
              <button type='submit' className='upload_button'>
                Upload File and Generate Nowcast
              </button>
            </form>
            <button className='u-icon'>
              <NavLink to='/process-page' activeClassName='active'>
                View Generated Nowcast
              </NavLink>
            </button>

            {message && (
              <div className='alert alert-success' role='alert' style={{ textAlign: 'center', color: 'whitesmoke', marginTop: '2rem', fontWeight: 300 }}>
                {message}
              </div>
            )}
          </div>
        </div>
        <div className='info-container'>
          <div className='info-inner-container'>
            <select
              className='selected-language'
              defaultValue={currentLanguage}
              onChange={(e) => handleLanguage(e)}
            >
              <option selected value='en'>
                English
              </option>

              <option value='ta'>{t('languages.ta')}</option>
              <option value='bn'>{t('languages.bn')}</option>
              <option value='hnd'>{t('languages.hnd')}</option>
            </select>
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='fahrenheit-checkbox'
                onChange={toggleFahrenheit}
              />
              <label htmlFor='fahrenheit-checkbox' className='label'>
                <RiFahrenheitFill />
                <RiCelsiusFill />
                <div className='ball' />
              </label>
            </div>
          </div>
          {loading ? (
            <div className='loader'></div>
          ) : (
            <span>
              {weatherData.length === 0 ? (
                <div className='nodata'>
                  <h1>{noData ?? t('no-data')}</h1>
                  {noData === 'Location Not Found' ? (
                    <>
                      <img
                        src={Astronaut}
                        alt='an astronaut lost in the space'
                      />
                      <p>Oh oh! We're lost in space finding that place.</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt='a person thinking about what place to find'
                      />
                      <p style={{ padding: '20px' }}>
                        Don't worry, if you don't know what to search for, try:
                        Dhaka, Canada or maybe USA.
                      </p>
                    </>
                    )}
                  </div>
              ) : (
                <>
                  <h1 className='centerTextOnMobile'>{t('today')}</h1>
                  <DetailsCard
                    weather_icon={weatherIcon}
                    data={weatherData}
                    isFahrenheitMode={isFahrenheitMode}
                    degreeSymbol={degreeSymbol}
                  />
                  <h1 className='title centerTextOnMobile'>
                    {t('more-on')} {city ?? t('unknown-location')}
                  </h1>
                  <ul className='summary'>
                    {weatherData.list.map((days, index) => (
                      <SummaryCard
                        key={index}
                        day={days}
                        isFahrenheitMode={isFahrenheitMode}
                        degreeSymbol={degreeSymbol}
                      />
                    ))}
                  </ul>
                </>
              )}
            </span>
          )}
        </div>
      </div>
      <div>
        <marquee behavior="scroll" direction="left">
          Disclaimer: Weather Data is fetched from <a href="https://openweathermap.org/api">OpenWeatherMapAPI</a>. This is an experimental nowcast model developed under Student Project, SAC, ISRO.
        </marquee>
      </div>
    </div>
  );
}

export default Home;
