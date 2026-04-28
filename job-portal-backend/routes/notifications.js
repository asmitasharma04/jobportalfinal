const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    console.log("📥 Fetching notifications for user:", req.params.userId);

    const notifications = await Notification.find({ userId: req.params.userId })
      .populate("jobId", "title company") // 🆕
      .sort({ createdAt: -1 });

    console.log("📤 Found notifications:", notifications.length);
    res.json(notifications);
  } catch (err) {
    console.error("🔥 Error fetching notifications:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Mark as read
router.put("/:id/read", async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;