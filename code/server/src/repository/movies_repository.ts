import type gender from "../model/gender.js";
import type movies from "../model/movies.js";
import MySqlService from "../service/mysql_service.js";
import genderRepository from "./gender_repository.js";

class moviesRepository {
	private table = "movies";

	// async = asynchronne = exécute de tâches en parallèle/async crée une promesse
	// la fonction renvoie un objet unknown lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(gender.gender_id) AS gender_ids
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN
				${process.env.MYSQL_DATABASE}.movie_gender
			ON
				movie_gender.movie_id = ${this.table}.movie_id
			JOIN
				${process.env.MYSQL_DATABASE}.gender
			ON	
				movie_gender.gender_id = gender.gender_id
			GROUP BY
				${this.table}.movie_id
			;
        `;

		try {
			const [results] = await connection.execute(sql);

			for (let i = 0; i < (results as movies[]).length; i++) {
				const result = (results as movies[])[i];

				result.genders = (await new genderRepository().selectInList(
					result.gender_ids,
				)) as gender[];
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	// récupérer un enregistrement par sa clé primaire
	// Partial permet de définir des propriétés optionnelles
	public selectOne = async (
		data: Partial<movies>,
	): Promise<movies[] | unknown> => {
		const connection = await new MySqlService().connect();

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(gender.gender_id) AS gender_ids
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN
				${process.env.MYSQL_DATABASE}.movie_gender
			ON
				movie_gender.movie_id = ${this.table}.movie_id
			JOIN
				${process.env.MYSQL_DATABASE}.gender
			ON	
				movie_gender.gender_id = gender.gender_id
			WHERE
				${this.table}.movie_id = ?
			GROUP BY
				${this.table}.movie_id
        `;

		try {
			const [results] = await connection.execute(sql, [data.movie_id]);
			const result = (results as movies[])[0];

			if (result) {
				result.genders = (await new genderRepository().selectInList(
					result.gender_ids,
				)) as gender[];
			}

			return result;
		} catch (error) {
			return error;
		}
	};
}

export default moviesRepository;
