import React from 'react';
import BaseRoute from './routes/_base-route';
import './assets/styles/general.scss';
import './App.scss';
import AOS from 'aos';
import "aos/dist/aos.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  AOS.init({
    duration: 1200,
  });
  return (
    <div className="App">
      <BaseRoute></BaseRoute>
      <ToastContainer />
    </div>
  );
}

export default App;
