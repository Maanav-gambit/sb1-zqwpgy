import React, { useState } from 'react';

const wagerAmounts = [1, 5, 10, 25, 50, 100];
const playerCounts = [2, 4];

interface LobbyInfo {
  wager: number;
  players: number;
  activeUsers: number;
}

const Play: React.FC = () => {
  const [selectedWager, setSelectedWager] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number | null>(null);

  // Mock data for lobby information
  const lobbies: LobbyInfo[] = [
    { wager: 1, players: 2, activeUsers: 8 },
    { wager: 1, players: 4, activeUsers: 4 },
    { wager: 5, players: 2, activeUsers: 6 },
    { wager: 5, players: 4, activeUsers: 2 },
    { wager: 10, players: 2, activeUsers: 4 },
    { wager: 10, players: 4, activeUsers: 1 },
    { wager: 25, players: 2, activeUsers: 2 },
    { wager: 50, players: 2, activeUsers: 1 },
    { wager: 100, players: 2, activeUsers: 1 },
  ];

  const handleJoinLobby = (wager: number, players: number) => {
    console.log(`Joining lobby: $${wager} wager, ${players} players`);
    // Implement lobby joining logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Your Wager</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Wager Amount</h3>
        <div className="flex flex-wrap gap-2">
          {wagerAmounts.map((amount) => (
            <button
              key={amount}
              className={`px-4 py-2 rounded ${
                selectedWager === amount
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedWager(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Number of Players</h3>
        <div className="flex gap-2">
          {playerCounts.map((count) => (
            <button
              key={count}
              className={`px-4 py-2 rounded ${
                selectedPlayers === count
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedPlayers(count)}
            >
              {count} Players
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Available Lobbies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lobbies
            .filter(
              (lobby) =>
                (!selectedWager || lobby.wager === selectedWager) &&
                (!selectedPlayers || lobby.players === selectedPlayers)
            )
            .map((lobby, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-semibold">${lobby.wager} Wager</p>
                <p>{lobby.players} Players</p>
                <p>{lobby.activeUsers} Active Users</p>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleJoinLobby(lobby.wager, lobby.players)}
                >
                  Join Lobby
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Play;