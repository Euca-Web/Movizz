import type movies from "./movies.js";

type movies_gender = {
    movie_id: number;
    gender_id: number;
    // composition permet 
    movie : movies
}

export default movies_gender;