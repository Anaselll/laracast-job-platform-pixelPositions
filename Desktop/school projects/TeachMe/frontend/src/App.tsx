import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout.js'
import Home from './pages/home.js'
import SignUp from './pages/SignUpPage.js';
import Login from './pages/LoginPage.js';
import  AuthProvider  from './context/AuthContext.js';
import Offers from './pages/offers.js';
import Profile from './pages/Profle.js';
import ProtectedRoute from './middleware/protectedRoute'
import CreateOffer from './pages/createOffer.js';
import { Toaster } from 'react-hot-toast';
import Session from './pages/sessions.js';
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute>
                    <Session />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/offers/:offer_type" element={<Offers />} />
              <Route
                path="/offers/:offer_type/create"
                element={
                  <ProtectedRoute>
                    <CreateOffer />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App
