import axios from "axios";
import { listApiKeys } from "./APIKey";

const url = "https://api.themoviedb.org/3";
const url_end = `&api_key=${listApiKeys.TMDB}&language=fr-FR`;

const callAPI = axios.create({
  baseURL: url,
  timeout: 1000,
});

let params = { movie_id: "", page: "", query: "", param4: "" };

const getTMDBResults = async (endpoint) => {
  try {
    const res = await callAPI.get(endpoint + url_end);
    return res;
  } catch (err) {
    console.log("API conection failed");
  }
};
export const getMoviesByPopularity = async (...arr) => {
  arr.forEach((arg) => {
    if ("page" in arg) params.page = arg.page;
    else params.page = 1;
  });
  return await getTMDBResults(`movie/popular?page=${params.page}`);
};

export const getMovieByID = async (...arr) => {
  arr.forEach((arg) => {
    if ("movie_id" in arg) params.movie_id = arg.movie_id;
  });
  // dud=dud est juste là pour pouvoir concatener url_end.
  // cela n'aurait pas été nécessaire si on pouvait faire l'appel
  // avec ?movie_id=id...
  return await getTMDBResults(`/movie/${params.movie_id}?dud=dud`);
};

export const getMovieCreditsByID = async (...arr) => {
  arr.forEach((arg) => {
    if ("movie_id" in arg) params.movie_id = arg.movie_id;
  });
  // dud=dud est juste là pour pouvoir concatener url_end.
  // cela n'aurait pas été nécessaire si on pouvait faire l'appel
  // avec ?movie_id=id...
  return await getTMDBResults(`/movie/${params.movie_id}/credits?dud=dud`);
};

export const getMoviesBySearch = async (...arr) => {
  arr.forEach((arg) => {
    if ("page" in arg) params.page = arg.page;
    else params.page = 1;
    if ("query" in arg) params.query = arg.query;
    else params.query = "";
  });

  return await getTMDBResults(
    `search/movie?page=${params.page}&query=${params.query}&include_adult=false`
  );
};
