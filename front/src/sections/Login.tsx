import { Wrench, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:3006/auth/login', {
          email: formData.email,
          password: formData.password
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/');
        }
      } else {
        const response = await axios.post('http://localhost:3006/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });

        if (response.status === 201) {
          setIsLogin(true); 
          setFormData({ ...formData, password: '' }); 
          setError('Registration successful! Please login.');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsAnimating(true);
    setError('');
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({ username: '', email: '', password: '' });
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth Form */}
      <div className="w-[500px] p-12 flex flex-col">
        <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-12">
              <div className="bg-[#0F172A] text-white p-2.5 rounded-xl">
                <Wrench size={24} className="rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight">HandyGo</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-3 text-gray-500">
              {isLogin
                ? 'Sign in to your account to continue.'
                : 'Get started with your free account today.'}
            </p>
          </div>

          {error && (
            <div className={`mb-6 p-4 rounded-xl ${error.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">
                  {isLogin ? 'or sign in with email' : 'or continue with email'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10 transition-all duration-200"
                    placeholder="johndoe"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10 transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {isLogin && (
                    <a href="#" className="text-sm font-medium text-[#0F172A] hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                {!isLogin && (
                  <p className="mt-2 text-sm text-gray-500">
                    Must be at least 8 characters long
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#0F172A] border-gray-300 rounded focus:ring-[#0F172A]"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0F172A] text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-[#0F172A] hover:underline focus:outline-none transition-all duration-200 hover:text-gray-700"
          >
            {isLogin ? 'Create account' : 'Sign in'}
          </button>
        </p>
      </div>

      {/* Right side - Hero Image */}
      <div className="flex-1 relative">
        <img
          src={isLogin
            ? "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            : "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
          alt={isLogin ? "Professional handyman working" : "Professional handyman at work"}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className={`absolute bottom-16 left-16 right-16 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-[42px] font-bold leading-tight text-white mb-4">
            {isLogin
              ? "Quality service at your fingertips"
              : "Your trusted partner for home improvements"
            }
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            {isLogin
              ? "Access your dashboard to manage appointments, track progress, and connect with skilled professionals ready to help."
              : "Join thousands of homeowners who trust HandyGo for their home maintenance and improvement needs. Professional service at your fingertips."
            }
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt={`User ${i}`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-white mb-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">4.9/5</span>
              </div>
              <p className="text-sm text-white/90">Based on 2,000+ verified reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;