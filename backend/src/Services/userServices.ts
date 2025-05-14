import userModel from "../Models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User Already Exist!", statusCode: 400 };
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });

  return { data: generateJwt({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect Email or Password!", statusCode: 400 };
  }

  const passMatch = await bcrypt.compare(password, findUser.password);
  if (passMatch) {
    return {
      data: generateJwt({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect Email or Password!", statusCode: 400 };
};

const generateJwt = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "");
};
