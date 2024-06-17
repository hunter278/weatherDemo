import { createBrowserRouter,redirect } from "react-router-dom";
// 基础
import App from '../App';
import NotFound from '../NotFound'
export const routes=[
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>
    },
]
const router=createBrowserRouter(routes)
export default router