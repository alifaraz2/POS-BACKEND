const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.log("req.user is ", req.user)
    return res.status(403).json({ error: "Only admins can register new users" })
  }
  next()
}

export default adminMiddleware
