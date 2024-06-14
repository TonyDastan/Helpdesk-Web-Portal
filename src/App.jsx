
// import ViewRequests from './pages/Admin/ViewRequests';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/registration/Login';
import ViewRequests from './pages/Admin/ViewRequests';
import { UserProvider } from './providers/UserContext';
import RequireAuth from './auth/requireAuth';

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path='/dashboard' element={<ViewRequests />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App
