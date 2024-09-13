import dbConnect from "../lib/dbConnect";
import { generateFakeUsers } from "../app/utils/generateFakeUsers";
import User from '../app/models/Users';

const seed = async () => {
  await dbConnect();

  const users = generateFakeUsers(10);

  try {
    await User.insertMany(users);
    console.log("Users successfully inserted")

  } catch (error) {
    console.log(error);
  }
}

export default seed;