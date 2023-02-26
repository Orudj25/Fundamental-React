import React from 'react';
import {Route, Routes,Navigate} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostPages from "../pages/PostPages";
import Login from "../pages/Login";

const AppRoutes = () => {
    return (
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/' element={<Posts/>}/>
                <Route path='/posts/:id' element={<PostPages/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route
                    path='/login'
                    element={<Login/>}
                    navigate={<Navigate replace to ='/login'/>}
                />
            </Routes>
    );
};

export default AppRoutes;