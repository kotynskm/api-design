import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// create a json web token (basically converts an object to a string)
export const createToken = (user) => {
  // jwt.sign takes a payload which can be user data, or user email, etc (something unique about the user)
  // and a token secret
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.TOKEN_SECRET
  );
  return token;
};

// middleware to protect routes that require jwt auth
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  // check that bearer exists, which should be on the req authorization header
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  // will split on space between Bearer and actual string (ex. "Bearer" "skdsJudengYYdndjKMChah")
  // the first item will be Bearer, which we don't care about, just put a comma and get token
  const [, token] = bearer.split(" ");

  // check if after splitting token it's a valid value
  if (!token) {
    res.status(401);
    res.json({ message: "Not a Valid Token, Not Authorized" });
    return;
  }

  // lastly check that token value is valid and previously signed with valid secret
  try {
    // we can verify the user object which we signed earlier
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    // set user on the request to the verified user
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: "Not a Valid Token, Not Authorized" });
    return;
  }
};

// compare plain text password to hashed password
export const comparePasswords = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

// initial hashing of password, second arg is a "salt" and increases security of password
export const hashPassword = (password) => {
  bcrypt.hash(password, 5);
};
