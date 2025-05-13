import { generateStreamToken, upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

export async function getStreamToken(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Get the target user ID from the query parameters
    const targetUserId = req.query.targetUserId;
    if (!targetUserId) {
      return res.status(400).json({ message: "Target user ID is required" });
    }

    // Get the target user from the database
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Create or update both users in Stream Chat
    await Promise.all([
      upsertStreamUser({
        id: req.user._id,
        name: req.user.fullName,
        image: req.user.profilePic,
      }),
      upsertStreamUser({
        id: targetUser._id,
        name: targetUser.fullName,
        image: targetUser.profilePic,
      })
    ]);

    const token = generateStreamToken(req.user._id);
    if (!token) {
      return res.status(500).json({ message: "Failed to generate Stream token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ 
      message: "Failed to generate chat token",
      error: error.message 
    });
  }
}

export async function getVideoToken(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create or update the user in Stream Chat
    await upsertStreamUser({
      id: req.user._id,
      name: req.user.fullName,
      image: req.user.profilePic,
    });

    const token = generateStreamToken(req.user._id);
    if (!token) {
      return res.status(500).json({ message: "Failed to generate Stream token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getVideoToken controller:", error.message);
    res.status(500).json({ 
      message: "Failed to generate video token",
      error: error.message 
    });
  }
}