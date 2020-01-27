import React, {useEffect, useState} from 'react';
import {HotTable} from '@handsontable/react';
import Skeleton from 'react-loading-skeleton';
import ttiPolyfill from 'tti-polyfill';
import './App.css';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  console.log('tti------>', tti);
});

function App() {
  const [data, setState] = useState([]);
  useEffect(() => {
    const longRequest = fetch(`http://httpstat.us/200?sleep=${1000 * 5}`);
    const shortRequest = fetch('https://randomuser.me/api/').then(response => response.json());

    Promise.all([longRequest, shortRequest]).then(([longRequestResponse, shortRequestResponse]) => {
      console.log(longRequestResponse, shortRequestResponse);
      setState([
        ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13]
      ])
    })
  }, []);
  return (
    <div className="App">
      {data && data.length ? <HotTable data={data} colHeaders={true} rowHeaders={true} width="600" height="300"/> :
        <Skeleton count={15}/>}
    </div>
  )
}

export default App;
