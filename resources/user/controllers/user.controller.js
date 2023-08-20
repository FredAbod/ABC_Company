import { passwordCompare, passwordHash } from "../../../middleware/hashing.js";
import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import { loginSchema } from "../../../utils/validation/validation.js";
import User from "../models/user.model.js";


export const createUser = async (req, res) => {
    try {
        const {username, password, email}= req.body;
        const { error } = loginSchema.validate(req.body);
// check email if already registered
const checkEmail = await User.findOne({ email });
if (checkEmail) {
  return errorResMsg(res, 400, "Email already registered");
}
const hashedPassword = await passwordHash(password);
const newUser = new User({
username: username,
password: hashedPassword,
email: email,
})

const savedNewUser = await newUser.save();
return successResMsg(res, 200, {data: { user: savedNewUser}, message: "User Created Successfully"});
    } catch (error) {
        return errorResMsg(res, 500, error.message);

    }
}

// User login
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username && !password) {
        throw new Error("Both username and password cannot be empty.");
      }
      // check if user exist with the phone
      const user = await User.findOne({ username });
      if (!user) {
        return errorResMsg(res, 404, "User not found");
      }
      // check if user has password set
      const checkPassword = await passwordCompare(password, user.password);
  
      // if user password is not correct throw error ==> invalid credentials
      if (!checkPassword) {
        return errorResMsg(res, 406, "invalid credentials");
      }
      //  tokenize your payload
      const token = createJwtToken({ userId: user._id});
      res.cookie("access_token", token);
      // save the token
      user.token = token;
      await user.save();
      // success response
      return successResMsg(res, 200, {
        success: true,
        data: {
          userId: user._id,
          token,
          message: "User successfully logged in",
        },
      });
    } catch (error) {
      console.log(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "internal server error",
      });
    }
  };