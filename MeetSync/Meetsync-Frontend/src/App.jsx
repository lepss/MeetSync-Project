import './css/style.css'
import {Routes, Route} from 'react-router-dom'

import Header from "./components/header";
import Footer from './components/footer';
import Home from "./containers/home";
import RequireAuth from "./containers/helpers/require-auth";
import Login from './containers/user/login';
import Logout from './containers/user/logout';
import Register from './containers/user/register';
import Profil from './containers/user/profil';
import EventList from './containers/event/event-list';
import EventDetail from './containers/event/event-detail';
import Layout from './components/layout';

function App() {
    return(
        <div>
            <Header/>
            <main>
                <Routes>
                    <Route path="/layout" element={<Layout />} />
                    <Route
                        path="/"
                        element={<RequireAuth child={Home} auth={false} admin={false} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/logout"
                        element={<RequireAuth child={Logout} auth={true} admin={false} />}
                    />
                    <Route
                        path="/profil"
                        element={<RequireAuth child={Profil} auth={true} admin={false} />}
                    />
                    <Route
                        path="/event"
                        element={<RequireAuth child={EventList} auth={false} admin={false} />}
                    />
                    <Route
                        path="/event/:id"
                        element={<RequireAuth child={EventDetail} auth={false} admin={false} />}
                    />
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}

export default App
