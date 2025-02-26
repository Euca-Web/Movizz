import express from 'express';
import { pool } from '../config/db.js';
import { validatePagination } from '../middleware/validation.js';

const router = express.Router();

router.get('/', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Requête pour obtenir le nombre total de séries
    const countQuery = 'SELECT COUNT(DISTINCT s.series_id) as total FROM series s';
    const [countResult] = await pool.execute(countQuery);
    const total = (countResult as any)[0].total;

    // Requête principale avec pagination
    const query = `
      SELECT 
        s.series_id as id,
        s.title,
        s.original_title,
        s.description,
        s.release_date,
        s.poster_url as posterUrl,
        'series' as type,
        GROUP_CONCAT(g.name) as genres
      FROM series s
      LEFT JOIN series_gender sg ON s.series_id = sg.series_id
      LEFT JOIN gender g ON sg.gender_id = g.gender_id
      GROUP BY s.series_id
      ORDER BY s.title ASC
      LIMIT ? OFFSET ?
    `;
    
    const [series] = await pool.execute(query, [limit, offset]);
    
    res.json({
      data: series,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
