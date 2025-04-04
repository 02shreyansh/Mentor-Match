import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SigninPage';
import SignupPage from './pages/SiginUp';
import FindMentorPage from './pages/FindMentorPage';
import BecomeMentorPage from './pages/BecomeMentorPage';
import ContactPage from './pages/ContactPage';
import TermsAndServicePage from './pages/TermsAndService';
import PrivacyPolicyPage from './pages/Policy';
import AdminUsersPage from './pages/Admin/Users';
import Dashboard from './pages/Admin/Dashboard';
import Mentorship from './pages/Admin/Mentorship';
import Session from './pages/Admin/Session';
import ScheduleSessionForm from './components/admin/Schedule';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="findMentor" element={<FindMentorPage />} />
          <Route path="becomeMentor" element={<BecomeMentorPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="terms-of-service" element={<TermsAndServicePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="admin/users" element={<AdminUsersPage/>}/>
          <Route path='admin/dashboard' element={<Dashboard/>}/>
          <Route path='admin/mentorships' element={<Mentorship/>}/>
          <Route path='admin/session' element={<Session/>}/>
          <Route path='admin/schedule' element={<ScheduleSessionForm/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
