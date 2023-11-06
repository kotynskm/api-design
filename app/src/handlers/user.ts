import prismaClient from "../db";
import { comparePasswords, createToken, hashPassword } from "../utils/auth";

// async because we need to talk to the DB
export const createUser = async (req, res) => {
  const user = await prismaClient.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createToken(user);
  // equivalent of token: token to use {token}
  res.json({ token });
};

export const signIn = async (req, res) => {
  // does user exist in DB
  const user = await prismaClient.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  // does password match hashed in DB
  const isPasswordValid = await comparePasswords(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    res.status(401);
    res.json({ message: "Invalid Password" });
    return;
  }

  // otherwise is valid login and can create and give a token
  const token = createToken(user);
  res.json({ token });
};
