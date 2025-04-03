import { useEffect, useState } from "react";
import MovieAPI from "../service/movie_api";
import type movies from "../model/movies";
// import "../assets/css/";

const MovieList = () => {
	//etat pour stocker les films
	const [movies, setMovies] = useState<movies[]>([]);
	//appel de l'api pour recuperer les films
	useEffect(() => {
		new MovieAPI().SelectAll().then((response) => setMovies(response.data));
	}, []);
	return (
		<>
			<table>
				<tr>
					<th>Titre</th>
					<th>Durée</th>
					<th>Année</th>
					<th>Synopsis</th>
					<th>Poster</th>
				</tr>
				{movies.map((movie) => {
					return (
						<tr key={Math.random()}>
							<td>{movie.title}</td>
							<td>{movie.duration}</td>
							<td>
								{
									new Date(movie.release_date)
										.toLocaleDateString()
										.split(" ")[0]
								}
							</td>
							<td>{movie.summary}</td>
							{/* Affiche la valeur brute de poster_url */}
							<td>
								{/* Affiche la valeur brute de poster_url */}
								<img
									src={`${import.meta.env.VITE_API_URL}/img/${movie.poster_url}`}
									alt={movie.title}
								/>
							</td>
						</tr>
					);
				})}
			</table>
		</>
	);
};

export default MovieList;
