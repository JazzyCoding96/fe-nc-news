
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import './App.css'
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import ErrorPage from './Components/ErrorPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path='/articles' element={<ArticleList/>}/>
        <Route path='/articles/:article_id' element={<SingleArticle/>}/>
        <Route path='*' element={<ErrorPage/>}/>  
      </Routes>
    </>
  );
}

export default App
