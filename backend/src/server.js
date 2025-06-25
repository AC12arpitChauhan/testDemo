import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || !longUrl.startsWith('http')) return res.status(400).json({ error: 'Invalid URL' });
  const shortId = nanoid(6);
  await pool.query('INSERT INTO urls (long_url, short_id) VALUES (?, ?)', [longUrl, shortId]);
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

app.get('/api/urls', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM urls ORDER BY created_at DESC');
  res.json(rows);
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const [rows] = await pool.query('SELECT * FROM urls WHERE short_id = ?', [shortId]);
  if (rows.length === 0) return res.status(404).send('URL not found');
  await pool.query('UPDATE urls SET click_count = click_count + 1 WHERE short_id = ?', [shortId]);
  res.redirect(rows[0].long_url);
});

app.put('/api/url/:id', async (req, res) => {
  const { longUrl } = req.body;
  const { id } = req.params;
  const newShortId = nanoid(6);
  await pool.query('UPDATE urls SET long_url = ?, short_id = ? WHERE id = ?', [longUrl, newShortId, id]);
  res.json({ message: 'Updated' });
});

app.delete('/api/url/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM urls WHERE id = ?', [id]);
  res.json({ message: 'Deleted' });
});

app.listen(5001, () => console.log('Server running on port 5001'));