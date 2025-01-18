import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();


    if (!username || !password) {
      setError('Both fields are required');
      return;
    }


    dispatch(login({ name: username }));
    
    Swal.fire({
      title: "Success",
      text: "Logged in successfully",
      icon: "success",
      showConfirmButton:false,
      timer: 1000
    });
    navigate('/')
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-300 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default LoginPage;
