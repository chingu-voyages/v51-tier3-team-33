import dbConnect from '../../lib/dbConnect';
import randomstring from "randomstring";
import ShortUrl from '../../models/ShortUrl';

export async function POST(req: Request) { // Have yet to test this but will.
  const data = await req.json(); // makes the body of req readable

  await dbConnect();

  const {user_id, url} = data; // the body should have a user_id and the actual url to shorten

  const urls = await ShortUrl.find() // check if the user already generated a short url

  // if the url exists
    // if the timestamp has an hour or less before expiring.
      // update the url with a new timestamp 12 hours ahead


  // if it doesnt exist,
    // create a new link, set the expiration timestamp
    randomstring.generate(5);
    //save it to the database
  
  // return the url
}