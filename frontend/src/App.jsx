// 📁 frontend/src/App.jsx
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
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-lg bg-gray-800 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">URL Shortener 🔗</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL..."
            className="p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-500 transition text-white font-semibold px-4 py-2 rounded-xl">
            Shorten URL
          </button>
        </form>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm text-left rounded-xl overflow-hidden">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Long URL</th>
                <th className="p-3">Short URL</th>
                <th className="p-3 text-center">Clicks</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map(({ id, long_url, short_id, click_count }) => (
                <tr key={id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="p-3 break-all text-blue-300">{long_url}</td>
                  <td className="p-3">
                    <a
                      href={`http://localhost:5001/${short_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      {short_id}
                    </a>
                  </td>
                  <td className="p-3 text-center font-mono">{click_count}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(id, long_url)}
                      className="text-yellow-400 hover:underline"
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 hover:underline"
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {urls.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-400">No URLs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}