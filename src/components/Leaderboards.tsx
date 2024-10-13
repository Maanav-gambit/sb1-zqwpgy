import React, { useState, useMemo } from 'react';
import { Globe, Map } from 'lucide-react';

interface Player {
  rank: number;
  name: string;
  country: string;
  elo: number;
  winnings: number;
}

const continents: { [key: string]: string[] } = {
  global: [],
  asia: ['CN', 'JP', 'KR', 'IN'],
  europe: ['RU', 'DE', 'FR', 'GB', 'ES', 'IT', 'NL'],
  americas: ['US', 'CA', 'BR', 'AR', 'MX'],
  africa: ['ZA', 'EG', 'NG', 'KE', 'MA']
};

const generateMockData = (start: number, end: number): Player[] => {
  const countries = Object.values(continents).flat();
  const firstNames = ['Magnus', 'Hikaru', 'Fabiano', 'Ding', 'Ian', 'Anish', 'Maxime', 'Levon', 'Wesley', 'Viswanathan'];
  const lastNames = ['Carlsen', 'Nakamura', 'Caruana', 'Liren', 'Nepomniachtchi', 'Giri', 'Vachier-Lagrave', 'Aronian', 'So', 'Anand'];
  
  const players = Array.from({ length: end - start + 1 }, (_, i) => ({
    rank: 0,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    elo: Math.floor(Math.random() * (2800 - 2000) + 2000),
    winnings: Math.floor(Math.random() * 1000000),
  }));

  players.sort((a, b) => b.winnings - a.winnings);

  return players.map((player, index) => ({
    ...player,
    rank: start + index,
  }));
};

const Leaderboards: React.FC = () => {
  const [region, setRegion] = useState<'global' | 'asia' | 'europe' | 'americas' | 'africa'>('asia');
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year' | 'all'>('week');
  const [page, setPage] = useState(1);

  const allMockData = useMemo(() => generateMockData(1, 200), []);

  const filteredData = useMemo(() => {
    let filtered = allMockData;
    if (region !== 'global') {
      filtered = filtered.filter(player => continents[region].includes(player.country));
    }
    filtered.sort((a, b) => b.winnings - a.winnings);
    return filtered.map((player, index) => ({ ...player, rank: index + 1 }));
  }, [allMockData, region]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * 100;
    const end = start + 100;
    return filteredData.slice(start, end);
  }, [filteredData, page]);

  const regions = [
    { value: 'global', label: 'Global', icon: Globe },
    { value: 'asia', label: 'Asia', icon: Map },
    { value: 'europe', label: 'Europe', icon: Map },
    { value: 'americas', label: 'Americas', icon: Map },
    { value: 'africa', label: 'Africa', icon: Map },
  ];

  const timePeriods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Cash Leaderboards</h2>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex space-x-2 mb-2">
          {regions.map((r) => (
            <button
              key={r.value}
              onClick={() => {
                setRegion(r.value as any);
                setPage(1);
              }}
              className={`flex items-center px-3 py-1 rounded ${
                region === r.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <r.icon size={16} className="mr-1" />
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex space-x-2 mb-2">
          {timePeriods.map((t) => (
            <button
              key={t.value}
              onClick={() => setTimePeriod(t.value as any)}
              className={`px-3 py-1 rounded ${
                timePeriod === t.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">ELO</th>
              <th className="px-4 py-2 text-left">Winnings</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((player) => (
              <tr key={player.rank} className="border-b">
                <td className="px-4 py-2">{player.rank}</td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">
                  <img
                    src={`https://flagcdn.com/24x18/${player.country.toLowerCase()}.png`}
                    alt={player.country}
                    className="inline-block mr-2"
                  />
                  {player.country}
                </td>
                <td className="px-4 py-2">{player.elo}</td>
                <td className="px-4 py-2">${player.winnings.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          First Page
        </button>
        <span>
          Page {page} of {Math.ceil(filteredData.length / 100)}
        </span>
        <button
          onClick={() => setPage(Math.ceil(filteredData.length / 100))}
          disabled={page === Math.ceil(filteredData.length / 100)}
          className={`px-4 py-2 rounded ${
            page === Math.ceil(filteredData.length / 100) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Leaderboards;