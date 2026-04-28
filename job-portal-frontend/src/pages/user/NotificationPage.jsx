// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./NotificationPage.css";

// const NotificationPage = ({ user }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/notifications/${user._id}`
//         );
//         setNotifications(res.data);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?._id) fetchNotifications();
//     else setLoading(false); // avoids infinite spinner when user not loaded
//   }, [user]);

//   return (
//     <div className="notifications-page">
//       {/* Floating Background Circles */}
//       <div className="floating-bg">
//         <div className="circle circle1"></div>
//         <div className="circle circle2"></div>
//         <div className="circle circle3"></div>
//       </div>

//       <div className="notifications-content">
//         <h2 className="notifications-title">🔔 Notifications Center</h2>
//         <p className="notifications-subtitle">
//           Stay updated with your job applications and recruiter activity.
//         </p>

//         {loading ? (
//           <div className="notifications-loading-inside">
//             <div className="spinner"></div>
//             <p>Loading notifications...</p>
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="no-notifications">
//             <h3>No notifications yet 📭</h3>
//             <p>Once recruiters interact with your applications, updates appear here.</p>
//           </div>
//         ) : (
//           <ul className="notifications-list">
//             {notifications.map((notif) => (
//               <li
//                 key={notif._id}
//                 className={`notification-card ${
//                   notif.isRead ? "read" : "unread"
//                 }`}
//               >
//                 <p className="notif-message">{notif.message}</p>
//                 <span className="notif-date">
//                   {new Date(notif.createdAt).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./NotificationPage.css"; // (use your theme CSS file)

// export default function NotificationPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🧠 Replace this with actual logged-in user's ID (from auth/session)
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) {
//       setError("No user logged in.");
//       setLoading(false);
//       return;
//     }

//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/notifications/${userId}`
//         );
//         setNotifications(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching notifications:", err);
//         setError("Failed to load notifications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [userId]);

//   // 🧩 Function to mark as read
//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) =>
//           n._id === id ? { ...n, isRead: true } : n
//         )
//       );
//     } catch (err) {
//       console.error("❌ Error marking notification as read:", err);
//     }
//   };

//   // 🟢 Helper function to get color based on status
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "accepted":
//         return "notif-status accepted";
//       case "rejected":
//         return "notif-status rejected";
//       case "pending":
//       default:
//         return "notif-status pending";
//     }
//   };

//   return (
//     <div className="notification-page">
//       <h2 className="notif-header">🔔 Notifications</h2>

//       {loading ? (
//         <div className="notif-loading">Loading notifications...</div>
//       ) : error ? (
//         <div className="notif-error">{error}</div>
//       ) : notifications.length === 0 ? (
//         <div className="notif-empty">No notifications yet.</div>
//       ) : (
//         <div className="notif-list">
//           {notifications.map((notif) => (
//             <div
//               key={notif._id}
//               className={`notif-card ${notif.isRead ? "read" : "unread"}`}
//               onClick={() => markAsRead(notif._id)}
//             >
//               <div className="notif-message">{notif.message}</div>

//               {/* 🟩 Status indicator */}
//               <div className={getStatusClass(notif.status)}>
//                 {notif.status === "accepted" && "✅ Accepted"}
//                 {notif.status === "rejected" && "❌ Rejected"}
//                 {notif.status === "pending" && "⏳ Pending"}
//               </div>

//               <div className="notif-date">
//                 {new Date(notif.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./NotificationPage.css";

// export default function NotificationPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) {
//       setError("No user logged in.");
//       setLoading(false);
//       return;
//     }

//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
//         setNotifications(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching notifications:", err);
//         setError("Failed to load notifications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [userId]);

//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("❌ Error marking notification as read:", err);
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "accepted":
//         return "notif-status accepted";
//       case "rejected":
//         return "notif-status rejected";
//       default:
//         return "notif-status pending";
//     }
//   };

//   return (
//     <div className="notification-page">
//       <h2 className="notif-header">🔔 Notifications</h2>

//       {loading ? (
//         <div className="notif-loading">Loading notifications...</div>
//       ) : error ? (
//         <div className="notif-error">{error}</div>
//       ) : notifications.length === 0 ? (
//         <div className="notif-empty">No notifications yet.</div>
//       ) : (
//         <div className="notif-list">
//           {notifications.map((notif) => (
//             <div
//               key={notif._id}
//               className={`notif-card ${notif.isRead ? "read" : "unread"}`}
//               onClick={() => markAsRead(notif._id)}
//             >
//               <div className="notif-message">{notif.message}</div>

//               <div className={getStatusClass(notif.status)}>
//                 {notif.status === "accepted" && "✅ Accepted"}
//                 {notif.status === "rejected" && "❌ Rejected"}
//                 {notif.status === "pending" && "⏳ Pending"}
//               </div>

//               <div className="notif-date">
//                 {new Date(notif.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationPage.css";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("No user logged in.");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("❌ Error marking notification as read:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "notif-status accepted";
      case "rejected":
        return "notif-status rejected";
      default:
        return "notif-status pending";
    }
  };

  return (
    <div className="notification-page">
      <h2 className="notif-header">🔔 Notifications</h2>

      {loading ? (
        <div className="notif-loading">Loading notifications...</div>
      ) : error ? (
        <div className="notif-error">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="notif-empty">No notifications yet.</div>
      ) : (
        <div className="notif-list">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`notif-card ${notif.isRead ? "read" : "unread"}`}
              onClick={() => markAsRead(notif._id)}
            >
              <div className="notif-message">{notif.message}</div>

              {notif.jobId && (
                <div className="notif-job-info">
                  <span className="notif-role">{notif.jobId.title}</span> •{" "}
                  <span className="notif-company">{notif.jobId.company}</span>
                </div>
              )}

              <div className={getStatusClass(notif.status)}>
                {notif.status === "accepted" && "✅ Accepted"}
                {notif.status === "rejected" && "❌ Rejected"}
                {notif.status === "pending" && "⏳ Pending"}
              </div>

              <div className="notif-date">
                {new Date(notif.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}