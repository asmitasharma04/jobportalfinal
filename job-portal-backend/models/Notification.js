const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, 
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true } // ✅ makes createdAt, updatedAt available
);

module.exports = mongoose.model("Notification", notificationSchema);