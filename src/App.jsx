import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import FormBuilder from './pages/FormBuilder';
import ResponsePage from './pages/ResponsePage';
import LoginPage from './pages/LoginPage';
import FormPage from './pages/FormPage';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated",isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form/:id" element={<FormPage />} />
        {isAuthenticated && (
          <>
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/responses" element={<ResponsePage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
