import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { getUser, saveAuth, clearAuth } from '../lib/auth';
import { apiPath } from '../lib/api';

function Navbar() {
  const [user, setUser] = useState(() => getUser());

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(apiPath('/auth/google'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Login failed');
        return;
      }

      const { token, user } = await res.json();
      saveAuth(token, user);
      setUser(user);
    } catch (_err) {
      alert('Login failed. Try again.');
    }
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-extrabold tracking-wide text-transparent transition-all duration-200 hover:opacity-90"
        >
          PYQ Vault
        </Link>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <Link
            to="/browse"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-purple-500 px-4 py-2 text-sm font-semibold text-purple-400 transition-all duration-200 hover:bg-purple-500/20 sm:flex-none"
          >
            Browse
          </Link>

          {/* Only show Upload link if logged in */}
          {user && (
            <Link
              to="/upload"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 sm:flex-none"
            >
              Upload
            </Link>
          )}

          {/* Login / User info */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.picture}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-white/20"
              />
              <span className="text-sm text-slate-300 hidden sm:block">
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-red-500/50 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => alert('Login failed')}
              useOneTap
              theme="filled_black"
              shape="pill"
              size="medium"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;