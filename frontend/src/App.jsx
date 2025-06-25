import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [longUrl, setLongUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    const res = await axios.get('http://localhost:5001/api/urls');
    setUrls(res.data);
  };

  useEffect(() => { fetchUrls(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/shorten', { longUrl });
    setLongUrl('');
    fetchUrls();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/url/${id}`);
    fetchUrls();
  };

  const handleEdit = async (id, currentLongUrl) => {
    const updated = prompt('Edit URL', currentLongUrl);
    if (updated) {
      await axios.put(`http://localhost:5001/api/url/${id}`, { longUrl: updated });
      fetchUrls();
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="border p-2 w-full"
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2">Shorten</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Long URL</th>
            <th className="p-2 border">Short URL</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(({ id, long_url, short_id, click_count }) => (
            <tr key={id}>
              <td className="p-2 border">{long_url}</td>
              <td className="p-2 border">
                <a
                  href={`http://localhost:5001/${short_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {short_id}
                </a>
              </td>
              <td className="p-2 border text-center">{click_count}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(id, long_url)} className="text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}