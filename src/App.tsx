import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SigninPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
