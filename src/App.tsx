import React from 'react';
import './App.css';
import MainPage from "./MainPage/MainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SingleNewsPage from "./SingleNewsPage/SingleNewsPage";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/site/:id' element={<SingleNewsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
