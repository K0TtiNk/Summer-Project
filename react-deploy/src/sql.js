
const { Pool } = require('pg');
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.get('/api/gasStations', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM gas_stations');
    const gasStations = result.rows;
    res.json(gasStations);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});