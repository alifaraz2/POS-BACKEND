import Jwt from "jsonwebtoken"

import bcrypt from "bcrypt"
import userModel from "../../Model/userModel/index.js"
const authController = {
  login: async (req, res) => {
    const payload = req.body
    const user = await userModel.findOne({
      where: {
        email: payload.email,
      },
    })
    if (!user) {
      return res.status(401).json({
        message: "invalid credentional",
      })
    }
    const hpassword = user.password
    const password = payload.password
    const result = await bcrypt.compare(password, hpassword)
    console.log(result, "this is a result")

    if (!result) {
      return res.status(401).json({
        message: "invalid credentional",
      })
    }

    const data = {
      id: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
      isAdmin: user.isAdmin,
    }

    const token = Jwt.sign(
      {
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),
        ...data,
      },
      "secret",
      { expiresIn: "1h" }
    )

    res.json({
      message: "user logged in",
      data,
      token,
    })
  },

  register: async (req, res) => {
    try {
      const payload = req.body

      const password = await bcrypt.hash(payload.password, 10)
      const user = await userModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: password,
        isAdmin: payload.isAdmin || false,
      })
      res.json({
        message: "User registered successfully",
        user,
      })
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" })
    }
  },
}
export default authController
