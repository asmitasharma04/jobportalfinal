// import React, { useState } from "react";
// import axios from "axios";
// import "./Navbar.css";

// export default function Navbar({ user, setUser, role }) {
//   const [showAuth, setShowAuth] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAuthSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         console.log("hi");
//         const res = await axios.post(
//           "http://localhost:5000/api/auth/login",
//           { email: form.email, password: form.password, role }, // send fixed role
//           { withCredentials: true }
//         );
//         console.log("Response:", res);

//       const user = res.data.user;
//       console.log("User object:", user);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("userId", user._id);
//       localStorage.setItem("email", user.email);
//       localStorage.setItem("role", user.role);
//       setUser(user);
//       } else {
//         await axios.post(
//           "http://localhost:5000/api/auth/signup",
//           { ...form, role },
//           { withCredentials: true }
//         );
//         alert("Signup successful! Please login.");
//         setIsLogin(true);
//       }
//       setForm({ name: "", email: "", password: "" });
//       setShowAuth(false);
//     } catch (err) {
//       console.error("Auth error:", err);
//       alert(err.response?.data?.msg || "Error occurred");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//     } catch {
//       alert("Logout failed");
//     }
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="logo">JobPortal</div>
//         <ul className="nav-links">
//           <li><a href="/">Home</a></li>
//           <li><a href="#features">Features</a></li>
//           <li><a href="#reviews">Reviews</a></li>
//           <li><a href="#contact">Contact</a></li>
//         </ul>
//         <div className="auth-section">
//           {user ? (
//             <>
//               <div className="avatar">{user.name[0].toUpperCase()}</div>
//               <button className="btn-logout" onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <button
//                 className="btn-login"
//                 onClick={() => {
//                   setIsLogin(true);
//                   setShowAuth(true);
//                 }}
//               >
//                 Login as {role.charAt(0).toUpperCase() + role.slice(1)}
//               </button>
//               <button
//                 className="btn-login"
//                 onClick={() => {
//                   setIsLogin(false);
//                   setShowAuth(true);
//                 }}
//               >
//                 Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
//               </button>
//             </>
//           )}
//         </div>
//       </nav>

//       {showAuth && (
//         <div className="auth-modal">
//           <div className="auth-modal-content">
//             <span className="close" onClick={() => setShowAuth(false)}>
//               &times;
//             </span>
//             <h2>
//               {isLogin ? "Login" : "Signup"} as {role.charAt(0).toUpperCase() + role.slice(1)}
//             </h2>

//             <form onSubmit={handleAuthSubmit}>
//               {!isLogin && (
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//               )}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="submit">{isLogin ? "Login" : "Signup"}</button>
//             </form>

//             <p
//               className="toggle-auth"
//               onClick={() => setIsLogin(!isLogin)}
//               style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
//             >
//               {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

export default function Navbar({ user, setUser, role = "user" }) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN / SIGNUP
  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ✅ LOGIN (NO ROLE SENT)
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: form.email,
            password: form.password,
          },
          { withCredentials: true }
        );

        const loggedUser = res.data.user;

        // ✅ STORE USER
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("userId", loggedUser._id);
        localStorage.setItem("email", loggedUser.email);
        localStorage.setItem("role", loggedUser.role);

        setUser(loggedUser);

        // ✅ ROLE BASED REDIRECT
        if (loggedUser.role === "user") {
          navigate("/user");
        } else {
          navigate("/employer"); // employer + recruiter
        }
      } else {
        // ✅ SIGNUP (ROLE REQUIRED)
        await axios.post(
          "http://localhost:5000/api/auth/signup",
          { ...form, role },
          { withCredentials: true }
        );

        alert("Signup successful! Please login.");
        setIsLogin(true);
      }

      setForm({ name: "", email: "", password: "" });
      setShowAuth(false);
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.msg || "Authentication failed");
    }
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }

    // ✅ CLEAR EVERYTHING
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "User";

  return (
    <>
      <nav className="navbar">
        <div className="logo">JobPortal</div>

        {/* ✅ NO <a href="/"> */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#footer">Contact</a></li>
        </ul>

        <div className="auth-section">
          {user ? (
            <>
              <div className="avatar">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-login"
                onClick={() => {
                  setIsLogin(true);
                  setShowAuth(true);
                }}
              >
                Login as {capitalize(role)}
              </button>

              <button
                className="btn-login"
                onClick={() => {
                  setIsLogin(false);
                  setShowAuth(true);
                }}
              >
                Signup as {capitalize(role)}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <span className="close" onClick={() => setShowAuth(false)}>
              &times;
            </span>

            <h2>
              {isLogin ? "Login" : "Signup"} as {capitalize(role)}
            </h2>

            <form onSubmit={handleAuthSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>

            <p
              className="toggle-auth"
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
            >
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
