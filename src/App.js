import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App(){
  let pageSize = 5;
  let apiKey= process.env.REACT_APP_NEWS_API;

  // setProgress= (progress)=>{
  //   setState({progress:progress})
  // }

  const [progress,setProgress]=useState(0)

    return (
      <>
      <Router>     
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>   
          <Route exact path="/" element={<News setProgress={setProgress} key="general"  apiKey={apiKey} pageSize={pageSize} country="in" category ="general"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" apiKey={apiKey}  pageSize={pageSize} country="in" category ="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey}  pageSize={pageSize} country="in" category ="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" apiKey={apiKey}  pageSize={pageSize} country="in" category ="general"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" apiKey={apiKey}  pageSize={pageSize} country="in" category ="health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" apiKey={apiKey}  pageSize={pageSize} country="in" category ="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" apiKey={apiKey}  pageSize={pageSize} country="in" category ="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" apiKey={apiKey}  pageSize={pageSize} country="in" category ="technology"/>}/>
        </Routes>
      </Router>
      </>
    )
  }
