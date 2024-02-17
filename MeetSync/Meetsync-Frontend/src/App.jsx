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
import Dashboard from './containers/user/dashboard';
// import AdminDashboard from './containers/admin/admin-dashboard';

import EventList from './containers/event/event-list';
import EventDetail from './containers/event/event-detail';
import AddEvent from './containers/event/add-event';
import EditEvent from './containers/event/edit-event';

import AddAppointmentSession from './containers/appointmentSession/add-appointment-session';
import AppointmentSessionDetail from './containers/appointmentSession/appointment-session-detail';
import AppointmentSessionList from './containers/appointmentSession/appointment-session-list';
import EditAppointmentSession from './containers/appointmentSession/edit-appointment-session';

import AddAppointmentRequest from './containers/appointmentRequest/add-appointment-request';
// import AppointmentRequestDetail from './containers/appointmentRequest/appointment-request-detail';
// import AppointmentRequestList from './containers/appointmentRequest/appointment-request-list';
import EditAppointmentRequest from './containers/appointmentRequest/edit-appointment-request';

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
                        path="/dashboard"
                        element={<RequireAuth child={Dashboard} auth={true} admin={false} />}
                    />
                    <Route
                        path="/event"
                        element={<RequireAuth child={EventList} auth={false} admin={false} />}
                    />
                    <Route
                        path="/event/:id"
                        element={<RequireAuth child={EventDetail} auth={false} admin={false} />}
                    />
                    <Route
                        path="/addEvent"
                        element={<RequireAuth child={AddEvent} auth={true} admin={false} />}
                    />
                    <Route
                        path="/editEvent/:event_id"
                        element={<RequireAuth child={EditEvent} auth={true} admin={false} />}
                    />
                    <Route
                        path="/appointmentSessions/:event_id"
                        element={<RequireAuth child={AppointmentSessionList} auth={true} admin={false} />}
                    />
                    <Route
                        path="/addAppointmentSession/:event_id"
                        element={<RequireAuth child={AddAppointmentSession} auth={true} admin={false} />}
                    />
                    <Route
                        path="/appointmentSession/:session_id"
                        element={<RequireAuth child={AppointmentSessionDetail} auth={true} admin={false} />}
                    />
                    <Route
                        path="/editAppointmentSession/:session_id"
                        element={<RequireAuth child={EditAppointmentSession} auth={true} admin={false} />}
                    />
                    <Route
                        path="/addAppointmentRequest/:session_id"
                        element={<RequireAuth child={AddAppointmentRequest} auth={true} admin={false} />}
                    />
                    <Route
                        path="/editAppointmentRequest/:request_id"
                        element={<RequireAuth child={EditAppointmentRequest} auth={true} admin={false} />}
                    />
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}

export default App
