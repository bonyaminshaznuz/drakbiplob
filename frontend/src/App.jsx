import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Appointment from './routes/Appointment';
import AppointmentManage from './routes/AppointmentManage';
import AppointmentEdit from './routes/AppointmentEdit';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-manage" element={<AppointmentManage />} />
        <Route path="/appointment-edit" element={<AppointmentEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
