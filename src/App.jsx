import { useState } from 'react'
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import './App.css'
import ArticleList from './Components/ArticleList';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path='/articles' element={<ArticleList/>}/>
      </Routes>
    </>
  );
}

export default App
