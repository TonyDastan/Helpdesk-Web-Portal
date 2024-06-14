/* eslint-disable no-unused-vars */

import ViewRequests from "./pages/Admin/ViewRequests";
import Login from "./pages/registration/Login";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/dashboard',
        component: ViewRequests
    }
]