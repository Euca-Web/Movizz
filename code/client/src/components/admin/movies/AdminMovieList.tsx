import { useEffect, useState } from "react";
import MovieAPI from "../../../service/movie_api";
import type movies from "../../../model/movies";
import { Link } from "react-router-dom";
import "./AdminMovieList.css";

const AdminMovieList = () => {
	//etat pour stocker les films
	const [movies, setMovies] = useState<movies[]>([]);
	//appel de l'api pour recuperer les films
	useEffect(() => {
		new MovieAPI().SelectAll().then((response) => setMovies(response.data));
	}, []);
	return (
		<>
			<p>
				<Link to={"/admin/movie/form"}> <h4> Ajouter un film </h4> </Link>
			</p>

			<table>
				<tr>
					<th>Titre</th>
					<th>Genres</th>
					<th>Durée</th>
					<th>Année</th>
					<th>Synopsis</th>
					<th>Poster</th>
					<th>Modification</th>
					{/* <th>Réalisateur</th> */}
				</tr>
				{movies.map((movie) => {
					return (
						<tr key={Math.random()}>
							<td>{movie.title}</td>
							<td>
								<ul>
									{movie.genders.map((gender) => {
										return <li key={gender.gender_id}>{gender.gender_name}</li>;
									})}
								</ul>
							</td>
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
							{/* <td>
								{movie.director}
							</td> */}
							<td>
								<Link
									className="btn"
									to={`/admin/movie/form/${movie.movie_id}`}
								>
									{" "}
									Editer{" "}
								</Link>
								<Link
									className="btn"
									to={`/admin/movie/delete/${movie.movie_id}`}
								>
									{" "}
									Supprimer{" "}
								</Link>
							</td>
						</tr>
					);
				})}
			</table>
		</>
	);
};

export default AdminMovieList;
