import { nanoid } from "nanoid";
import { Url } from "../models/url.models.js";

export const generateNewShortUrl = async (req, res) => {
  const { redirectUrl } = req.body;

  if (!redirectUrl) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(8);

  await Url.create({
    shortId,
    redirectUrl,
    visitHistory: [],
  });

  return res.status(200).json({ message: shortId });
};

export const getShortUrlId = async (req, res) => {
  const shortId = req.params.shortId;

  const currentDate = new Date()
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "long", // Full day name (e.g., Monday)
    year: "numeric",
    month: "long", // Full month name (e.g., January)
    day: "numeric", // Day of the month (e.g., 21)
  };

  const formatDate = currentDate.toLocaleString('en-IN',options)

  const findUrl = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: formatDate,
        },
      },
    }
  );

  if (!findUrl) return res.status(400).json({ error: "Url does not found" });

  res.redirect(findUrl.redirectUrl);
};

export const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  if (!result) return res.status(400).json({ message: "Invalid Url" });

  return res.status(200).json({ totalClicks: result.visitHistory.length, Date:result.visitHistory});
};
