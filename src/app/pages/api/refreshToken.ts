import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { refreshToken } = req.body;

    if (refreshToken && refreshToken === "mockRefreshToken123") {
      res.status(200).json({
        accessToken: "newMockAccessToken456",
        refreshToken: "newMockRefreshToken456",
      });
    } else {
      console.error("Неверный refreshToken:", refreshToken);
      res.status(400).json({ error: "Invalid refresh token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}