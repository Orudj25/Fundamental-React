import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPages from "../pages/PostPages";
import Login from "../pages/Login";


export const routes = [
    {path: '/about', element:<About/>},
    {path: '/posts', element:<Posts/>},
    {path: '/posts/:id', element:<PostIdPages/>},
]

