import React from 'react'
import './styles/App.css'
import {BrowserRouter} from 'react-router-dom'
import Navbar from "./components/UI/Navbar/Navbar";
import AppRoutes from "./components/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
                <AppRoutes/>
        </BrowserRouter>
    )
}

export default App;
