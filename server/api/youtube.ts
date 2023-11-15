import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().googleApiKey;
  if (!apiKey) throw new Error("Missing Google API key");

  const { search } = await readBody(event);

  console.info("search", search);

  // search youtube
  const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
  });

  const response = await youtube.search.list({
    part: ["snippet"],
    q: search,
  });

  const items = response.data.items;

  console.info("items", items);

  return {
    items,
  };
});
