import express from 'express';
import { pool } from '../config/db.js';
import { validatePagination } from '../middleware/validation.js';

const router = express.Router();

router.get('/', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Requête pour obtenir le nombre total de films
    const countQuery = 'SELECT COUNT(DISTINCT m.movie_id) as total FROM movies m';
    const [countResult] = await pool.execute(countQuery);
    const total = (countResult as any)[0].total;

    // Requête principale avec pagination
    const query = `
      SELECT 
        m.movie_id as id,
        m.title,
        m.original_title,
        m.description,
        m.release_date,
        m.poster_url as posterUrl,
        m.rating,
        'movie' as type,
        GROUP_CONCAT(g.name) as genres
      FROM movies m
      LEFT JOIN movie_gender mg ON m.movie_id = mg.movie_id
      LEFT JOIN gender g ON mg.gender_id = g.gender_id
      GROUP BY m.movie_id
      ORDER BY m.title ASC
      LIMIT ? OFFSET ?
    `;
    const [movies] = await pool.execute(query, [limit, offset]);
    
    res.json({
      data: movies,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
