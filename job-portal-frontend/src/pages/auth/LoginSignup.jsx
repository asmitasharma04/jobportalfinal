// import React, { useState } from "react";
// import axios from "axios";

// const LoginSignup = ({ role, setUser }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         const res = await axios.post("http://localhost:5000/api/auth/login", { 
//           email: form.email, 
//           password: form.password 
//         }, { withCredentials: true });

//         setUser(res.data.user);
//       } else {
//         await axios.post("http://localhost:5000/api/auth/signup", { 
//           ...form, 
//           role 
//         });
//         alert("Signup successful, please login");
//         setIsLogin(true);
//       }
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Signup"} as {role}</h2>

//         {!isLogin && (
//           <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 mb-2" />
//         )}

//         <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 mb-2" />

//         <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 mb-2" />

//         <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
//           {isLogin ? "Login" : "Signup"}
//         </button>

//         <p className="mt-2 text-sm text-center cursor-pointer text-blue-600" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginSignup;





//Corrected code storing in mongoDB
import React, { useState } from "react";
import axios from "axios";

const LoginSignup = ({ role, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isLogin) {
  //       const res = await axios.post(
  //         "http://localhost:5000/api/auth/login",
  //         {
  //           email: form.email,
  //           password: form.password,
  //         },
  //         { withCredentials: true }
  //       );

  //       const user = res.data.user;
  //       console.log('This is my printed user!');
  //       console.log(user);
  //       // ✅ Save user to localStorage (stringify full object for easy retrieval)
  //       localStorage.setItem("user", JSON.stringify(user));
  //       localStorage.setItem("userId", user._id);
  //       localStorage.setItem("email", user.email);
  //       localStorage.setItem("role", user.role);

  //       setUser(user);
  //     } else {
  //       await axios.post("http://localhost:5000/api/auth/signup", {
  //         ...form,
  //         role,
  //       });
  //       alert("Signup successful, please login");
  //       setIsLogin(true);
  //     }
  //   } catch (err) {
  //     console.error("Auth Error:", err);
  //     alert(err.response?.data?.msg || "Error");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", form); // ✅ Check form data

  try {
    if (isLogin) {
      console.log("hi");
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: form.email, password: form.password },
        { withCredentials: true }
      );
      console.log("Response:", res);

      const user = res.data.user;
      console.log("User object:", user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      setUser(user);
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { ...form, role }
      );
      console.log("Signup Response:", res);
      alert("Signup successful, please login");
      setIsLogin(true);
    }
  } catch (err) {
    console.error("Auth Error:", err);
    console.error("Auth Error response:", err.response);
    alert(err.response?.data?.msg || "Error");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Signup"} as {role}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="mt-2 text-sm text-center cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
