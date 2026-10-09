import jwt from "jsonwebtoken";

export const generateToken = (id, token, lifeTime, typeToken) => {
  const createdToken = jwt.sign({ userId: id, type: typeToken }, token, {
    expiresIn: lifeTime,
  });

  return createdToken;
};
