import MySqlService from "../service/mysql_service.js";

class GenderRepository {
	private table = "Gender";

	public selectAll = async () => {
		const connection = await new MySqlService().connect();
		// console.log(connection);

		const sql = `
            SELECT
                ${this.table}.*
            FROM  
                ${process.env.MYSQL_DATABASE}.${this.table}
        `;

		try {
			const results = await connection.execute(sql);
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default GenderRepository;
