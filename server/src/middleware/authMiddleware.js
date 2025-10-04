export const requireAuth = async (req, res, next) => {
  try {
    // Check if user session exists
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Optionally verify user still exists in database
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

// Checks if logged-in user is an admin
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
