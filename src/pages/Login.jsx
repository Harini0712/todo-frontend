import { useState } from 'react';
import { auth, provider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("Logged in as:", result.user.displayName);

        // Show user name then redirect
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Try again.");
      });
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/69/db/5a/69db5ad82fdf3e82946f513c1edc743c.jpg')`,
      }}
    >
      <h1
        className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md text-black"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        Organize Your Day Your Way
      </h1>

      <p
        className="text-xl mb-6 drop-shadow-md text-black"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        <strong>A smart beautiful Todo App with real-time power</strong>
      </p>

      {!user ? (
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
        >
          Login with Google
        </button>
      ) : (
        <p className="text-xl text-black mt-4 flex items-center gap-2">
          ✅ Welcome, <strong>{user.displayName}</strong> 🎉
        </p>
      )}
    </div>
  );
}

export default Login;
