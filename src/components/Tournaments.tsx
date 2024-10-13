import React, { useState } from 'react';

interface Tournament {
  id: number;
  name: string;
  entryFee: number;
  prizePool: number;
  startDate: string;
  status: 'active' | 'upcoming' | 'past';
}

const Tournaments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paid' | 'free'>('paid');
  const [statusFilter, setStatusFilter] = useState<'active' | 'upcoming' | 'past' | 'all'>('all');

  const tournaments: Tournament[] = [
    { id: 1, name: 'Grand Chess Challenge', entryFee: 50, prizePool: 10000, startDate: '2024-04-01', status: 'upcoming' },
    { id: 2, name: 'Weekly Blitz Showdown', entryFee: 10, prizePool: 1000, startDate: '2024-03-15', status: 'active' },
    { id: 3, name: 'Grandmaster Invitational', entryFee: 100, prizePool: 25000, startDate: '2024-05-01', status: 'upcoming' },
    { id: 4, name: 'Beginner\'s Cup', entryFee: 0, prizePool: 500, startDate: '2024-03-10', status: 'past' },
    { id: 5, name: 'Chess960 Championship', entryFee: 25, prizePool: 5000, startDate: '2024-04-15', status: 'upcoming' },
  ];

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      (activeTab === 'paid' ? tournament.entryFee > 0 : tournament.entryFee === 0) &&
      (statusFilter === 'all' || tournament.status === statusFilter)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560174038-da43ac74f01b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
        }}
      ></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4">Chess Tournaments</h2>
        <div className="mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${
              activeTab === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('paid')}
          >
            Paid Tournaments
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('free')}
          >
            Free Tournaments
          </button>
        </div>
        <div className="mb-4">
          <select
            className="border rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Tournaments</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTournaments.map((tournament) => (
            <div key={tournament.id} className="border rounded-lg p-4 bg-white bg-opacity-90">
              <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
              <p>Entry Fee: ${tournament.entryFee}</p>
              <p>Prize Pool: ${tournament.prizePool}</p>
              <p>Start Date: {tournament.startDate}</p>
              <p>Status: {tournament.status}</p>
              {tournament.status !== 'past' && (
                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  {tournament.status === 'active' ? 'Join Now' : 'Register'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;