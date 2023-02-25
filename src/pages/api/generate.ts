// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { redisClient } from "@/utils/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const urlToShorten = body.link;

  if (!urlToShorten)
    return res.status(400).json({ message: "You must pass a link to shorten" });

  // Generate a shortened path
  const shortenedPath = generateKey();

  // Set this in Upstash redis
  await redisClient.set(shortenedPath, urlToShorten);

  // Return full url
  const link = `${
    process.env.PUBLIC_DOMAIN ?? "localhost:3000"
  }/${shortenedPath}`;
  return res.status(200).json({ link });
}

function generateKey(length: number = 5) {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

export const config = {
  api: {
    bodyParser: true,
  },
};
