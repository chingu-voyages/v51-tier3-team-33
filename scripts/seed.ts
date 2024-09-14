import dbConnect from "../lib/dbConnect";
import { generateFakeUsers } from "../utils/generateFakeUsers";
import User from '../models/Users';

const seed = async () => {
  await dbConnect();

  const users = generateFakeUsers(10);

  try {
    await User.insertMany(users);
    console.log("Users successfully inserted")

    const data = await User.find()
    console.log(data)
    
  } catch (error) {
    console.log(error);
  }
}

seed();

export default seed;