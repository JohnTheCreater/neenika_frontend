import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header'
import Customers from './pages/Customers/customers'
import Home from './pages/Home/home';

function App() {
  return (
    <div>
      <Header/>
    </div>
    
  );
} 

export default App;