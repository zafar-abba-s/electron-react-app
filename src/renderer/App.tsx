import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import React from 'react';

const Hello = () => {
  const KEY = '3ed6c921fa9c47688b2192558220610';

  interface ILocation {
    name: string;
  }

  interface ICurrent {
    temp_c: Float32Array;
    condition: { icon: string };
  }

  interface IResult {
    location: ILocation;
    current: ICurrent;
  }
  const [data, setData] = React.useState('');
  const [result, setResult] = React.useState<IResult>();

  const getData = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${data}&aqi=yes`
      )
      // eslint-disable-next-line promise/always-return
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert('Failed');
        // eslint-disable-next-line no-console
        console.log('Err', err);
      });
  };
  return (
    <div>
      <div className="Hello">
        <img src={result?.current.condition.icon} alt="" />
        <h1>
          {result?.location.name}
          {result ? ',' : null} {result?.current.temp_c}
        </h1>
      </div>
      <div className="Hello">
        <input
          type="text"
          placeholder="Enter City Name.."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div className="Hello">
        <button type="submit" onClick={() => getData()}>
          Search 🔍️
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
