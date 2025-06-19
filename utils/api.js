// utils/api.js
import axios from "axios";

const BASE_URL = "https://api.flickr.com/services/rest/";
const API_KEY = "6f102c62f41998d151e5a1b48713cf13";

export const getRecentImages = async (page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: {
      method: "flickr.photos.getRecent",
      api_key: API_KEY,
      format: "json",
      nojsoncallback: 1,
      extras: "url_s",
      per_page: 20,
      page,
    },
  });
  return res.data.photos.photo;
};

export const searchImages = async (text) => {
  const res = await axios.get(BASE_URL, {
    params: {
      method: "flickr.photos.search",
      api_key: API_KEY,
      format: "json",
      nojsoncallback: 1,
      extras: "url_s",
      text,
    },
  });
  return res.data.photos.photo;
};
