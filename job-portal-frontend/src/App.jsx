// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import axios from "axios";

// import LandingPage from "./pages/LandingPage";
// import UserPage from "./pages/user/UserPage";
// import EmployerPage from "./pages/employer/EmployerPage";

// // User Features
// import ResumeBuilder from "./pages/user/ResumeBuilder";
// import InterviewPrep from "./pages/user/InterviewPrep";
// // import CareerGuidance from "./pages/user/CareerGuidance"; // Removed CareerGuidance
// import Jobs from "./pages/user/Jobs"; // Added Jobs component import

// // Employer Features
// import PostJob from "./pages/employer/PostJob";
// import ManageApplicants from "./pages/employer/ManageApplicants";
// import Analytics from "./pages/employer/Analytics";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const [userAuth, setUserAuth] = useState(null);
//   const [employerAuth, setEmployerAuth] = useState(null);
//   const [role, setRole] = useState(null); // "user" or "employer" or null

//   // Auto-login user auth
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true,
//         });
//         if (res.data.user.role === "user") setUserAuth(res.data.user);
//         else if (res.data.user.role === "employer") setEmployerAuth(res.data.user);
//       } catch {
//         setUserAuth(null);
//         setEmployerAuth(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page: role select */}
//         <Route
//           path="/"
//           element={<LandingPage setRole={setRole} />}
//         />

//         {/* User Pages */}
//         <Route
//           path="/user"
//           element={
//             <UserPage
//               user={userAuth}
//               setUser={setUserAuth}
//               role={role}
//               setRole={setRole}
//             />
//           }
//         />

//         {/* Employer Pages */}
//         <Route
//           path="/employer"
//           element={
//             <EmployerPage
//               user={employerAuth}
//               setUser={setEmployerAuth}
//               role={role}
//               setRole={setRole}
//             />
//           }
//         />

//         {/* Protected User Features */}
//         <Route
//           path="/resume-builder"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <ResumeBuilder />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/interview-prep"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <InterviewPrep />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/jobs"  // Changed route path from /career-guidance to /jobs
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <Jobs />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Employer Features */}
//         <Route
//           path="/post-job"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <PostJob />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manage-applicants"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <ManageApplicants />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <Analytics />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;











// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import UserPage from "./pages/user/UserPage";
// import EmployerPage from "./pages/employer/EmployerPage";

// // User Features
// import ResumeBuilder from "./pages/user/ResumeBuilder";
// import InterviewPrep from "./pages/user/InterviewPrep";
// import InterviewDetails from "./pages/user/InterviewDetails";
// import InterviewPractice from "./pages/user/InterviewPractice";
// import Jobs from "./pages/user/Jobs"; 

// // Employer Features
// import PostJob from "./pages/employer/PostJob";
// import ManageApplicants from "./pages/employer/ManageApplicants";
// import Analytics from "./pages/employer/Analytics";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const [userAuth, setUserAuth] = useState(null);
//   const [employerAuth, setEmployerAuth] = useState(null);
//   const [role, setRole] = useState(null); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true,
//         });
//         if (res.data.user.role === "user") setUserAuth(res.data.user);
//         else if (res.data.user.role === "employer") setEmployerAuth(res.data.user);
//       } catch {
//         setUserAuth(null);
//         setEmployerAuth(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (loading) return <div>Loading...</div>; // Loader jab tak auth check ho raha hai

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page */}
//         <Route path="/" element={<LandingPage setRole={setRole} />} />

//         {/* User Pages */}
//         <Route
//           path="/user"
//           element={
//             <UserPage
//               user={userAuth}
//               setUser={setUserAuth}
//               role={role}
//               setRole={setRole}
//             />
//           }
//         />

//         {/* Employer Pages */}
//         <Route
//           path="/employer"
//           element={
//             <EmployerPage
//               user={employerAuth}
//               setUser={setEmployerAuth}
//               role={role}
//               setRole={setRole}
//             />
//           }
//         />

//         {/* Protected User Features */}
//         <Route
//           path="/resume-builder"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <ResumeBuilder />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/interview-prep"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <InterviewPrep />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/interview-details"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <InterviewDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/interview-practice"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <InterviewPractice />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/jobs"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <Jobs />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Employer Features */}
//         <Route
//           path="/post-job"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <PostJob />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manage-applicants"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <ManageApplicants />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute user={employerAuth} role="employer">
//               <Analytics />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch all unknown routes */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import LandingPage from "./pages/LandingPage";
// import UserPage from "./pages/user/UserPage";
// import EmployerPage from "./pages/employer/EmployerPage";

// // User Features
// import ResumeBuilder from "./pages/user/ResumeBuilder";
// import Jobs from "./pages/user/Jobs";

// // Employer Features
// import PostJob from "./pages/employer/PostJob";
// import ManageApplicants from "./pages/employer/ManageApplicants";
// import Analytics from "./pages/employer/Analytics";

// // Protected Route
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const [userAuth, setUserAuth] = useState(null);
//   const [employerAuth, setEmployerAuth] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ RESTORE AUTH FROM LOCALSTORAGE
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);

//       if (parsedUser.role === "user") {
//         setUserAuth(parsedUser);
//       } else if (
//         parsedUser.role === "employer" ||
//         parsedUser.role === "recruiter"
//       ) {
//         setEmployerAuth(parsedUser);
//       }
//     }
//     setLoading(false);
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Router>
//       <Routes>
//         {/* 🌍 LANDING PAGE (PUBLIC) */}
//         <Route path="/" element={<LandingPage />} />

//         {/* 👤 USER DASHBOARD (PUBLIC) */}
//         <Route
//           path="/user"
//           element={<UserPage user={userAuth} setUser={setUserAuth} />}
//         />

//         {/* 🧑‍💼 EMPLOYER / RECRUITER DASHBOARD (PUBLIC) */}
//         {/* ❌ NOT PROTECTED */}
//         <Route
//           path="/employer"
//           element={
//             <EmployerPage
//               user={employerAuth}
//               setUser={setEmployerAuth}
//             />
//           }
//         />

//         {/* 🔐 USER FEATURES (PROTECTED) */}
//         <Route
//           path="/resume-builder"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <ResumeBuilder />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/jobs"
//           element={
//             <ProtectedRoute user={userAuth} role="user">
//               <Jobs />
//             </ProtectedRoute>
//           }
//         />

//         {/* 🔐 EMPLOYER FEATURES (PROTECTED) */}
//         <Route
//           path="/post-job"
//           element={
//             <ProtectedRoute user={employerAuth} role={["employer", "recruiter"]}>
//               <PostJob />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/manage-applicants"
//           element={
//             <ProtectedRoute user={employerAuth} role={["employer", "recruiter"]}>
//               <ManageApplicants />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute user={employerAuth} role={["employer", "recruiter"]}>
//               <Analytics />
//             </ProtectedRoute>
//           }
//         />

//         {/* ❌ UNKNOWN ROUTES */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/user/UserPage";
import EmployerPage from "./pages/employer/EmployerPage";

// User Features
import ResumeBuilder from "./pages/user/ResumeBuilder";
import InterviewPrep from "./pages/user/InterviewPrep";
import InterviewPractice from "./pages/user/InterviewPractice";
import Jobs from "./pages/user/Jobs";
import NotificationPage from "./pages/user/NotificationPage"; // ✅ ADDED

// Employer Features
import PostJob from "./pages/employer/PostJob";
import ManageApplicants from "./pages/employer/ManageApplicants";
import Analytics from "./pages/employer/Analytics";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [employerAuth, setEmployerAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ RESTORE AUTH FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role === "user") {
        setUserAuth(parsedUser);
      } else if (
        parsedUser.role === "employer" ||
        parsedUser.role === "recruiter"
      ) {
        setEmployerAuth(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* 🌍 LANDING PAGE (PUBLIC) */}
        <Route path="/" element={<LandingPage />} />

        {/* 👤 USER DASHBOARD */}
        <Route
          path="/user"
          element={<UserPage user={userAuth} setUser={setUserAuth} />}
        />

        {/* 🧑‍💼 EMPLOYER / RECRUITER DASHBOARD */}
        <Route
          path="/employer"
          element={
            <EmployerPage
              user={employerAuth}
              setUser={setEmployerAuth}
            />
          }
        />

        {/* 🔐 USER FEATURES (PROTECTED) */}
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute user={userAuth} role="user">
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview-prep"
          element={
            <ProtectedRoute user={userAuth} role="user">
              <InterviewPrep />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview-practice"
          element={
            <ProtectedRoute user={userAuth} role="user">
              <InterviewPractice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute user={userAuth} role="user">
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute user={userAuth} role="user">
              <NotificationPage
                user={userAuth}
                setUser={setUserAuth}
              />
            </ProtectedRoute>
          }
        />

        {/* 🔐 EMPLOYER FEATURES (PROTECTED) */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute
              user={employerAuth}
              role={["employer", "recruiter"]}
            >
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-applicants"
          element={
            <ProtectedRoute
              user={employerAuth}
              role={["employer", "recruiter"]}
            >
              <ManageApplicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              user={employerAuth}
              role={["employer", "recruiter"]}
            >
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* ❌ UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

