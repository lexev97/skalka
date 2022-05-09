import { Fragment } from 'react';

import Header from './Components/Header/Header';

import './App.scss';

function App() {
  return (
    <Fragment>
      <Header/>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <p>paragraph</p>
    </Fragment>
  );
}

export default App;
