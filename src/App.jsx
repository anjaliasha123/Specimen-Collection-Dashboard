import './App.css'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import NotificationPage from './pages/NotificationsPage'
import KeycloakProvider from './helper/KeycloakProvider';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './helper/ProtectedRoute';
function App() {

    return (
        <KeycloakProvider>
            <div>

                <div className='m-4'>
                    <Navbar />
                </div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<AboutPage />} />
                        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute> } />
                        <Route path='/notifications' element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
                        {/* <Route path="/home" element={<HomePage /> } />
                        <Route path='/notifications' element={<NotificationPage />} /> */}
                    </Routes>
                </BrowserRouter>

            </div>
        </KeycloakProvider>
    );
}

export default App;
