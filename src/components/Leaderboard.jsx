import { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ games = [] }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  // Simulate fetching leaderboard data
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      
      // Generate mock leaderboard data based on games
      const mockData = games.map(game => ({
        gameId: game.id,
        gameTitle: game.title,
        gameImage: game.banner,
        players: Array.from({ length: 10 }, (_, i) => ({
          id: `player-${game.id}-${i}`,
          name: `Player${Math.floor(Math.random() * 1000)}`,
          score: Math.floor(Math.random() * 10000),
          level: Math.floor(Math.random() * 100),
          playTime: Math.floor(Math.random() * 1000),
          lastPlayed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          achievements: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => 
            `Achievement ${i + 1}`
          )
        })).sort((a, b) => b.score - a.score)
      }));

      setTimeout(() => {
        setLeaderboardData(mockData);
        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, [games]);

  const filterData = (time) => {
    const now = new Date();
    return leaderboardData.map(game => ({
      ...game,
      players: game.players.filter(player => {
        if (time === 'day') {
          return (now - player.lastPlayed) < 24 * 60 * 60 * 1000;
        } else if (time === 'week') {
          return (now - player.lastPlayed) < 7 * 24 * 60 * 60 * 1000;
        } else if (time === 'month') {
          return (now - player.lastPlayed) < 30 * 24 * 60 * 60 * 1000;
        }
        return true;
      })
    }));
  };

  const filteredData = filterData(timeFilter);

  const togglePlayerExpand = (playerId) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    return `${hours}h`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>🏆 Game Leaderboards 🏆</h1>
        
        <div className="time-filters">
          {['all', 'day', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              className={`time-filter ${timeFilter === filter ? 'active' : ''}`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading leaderboards...</p>
        </div>
      ) : (
        <div className="leaderboard-content">
          {filteredData.map((game) => (
            <div key={game.gameId} className="game-leaderboard">
              <div className="game-header">
                <img src={game.gameImage} alt={game.gameTitle} className="game-banner" />
                <h2>{game.gameTitle}</h2>
              </div>
              
              <div className="leaderboard-table">
                <div className="table-header">
                  <div className="rank-col">Rank</div>
                  <div className="player-col">Player</div>
                  <div className="score-col">Score</div>
                  <div className="level-col">Level</div>
                  <div className="time-col">Play Time</div>
                  <div className="last-col">Last Played</div>
                </div>
                
                <div className="table-body">
                  {game.players.slice(0, 10).map((player, index) => (
                    <div 
                      key={player.id}
                      className={`table-row ${expandedPlayer === player.id ? 'expanded' : ''}`}
                    >
                      <div className="rank-col">
                        <span className={`rank-badge ${index < 3 ? `top-${index + 1}` : ''}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="player-col" onClick={() => togglePlayerExpand(player.id)}>
                        <div className="player-avatar">
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{player.name}</span>
                        <div 
                          className={`expand-icon ${expandedPlayer === player.id ? 'expanded' : ''}`}
                        >
                          ▼
                        </div>
                      </div>
                      <div className="score-col">{player.score.toLocaleString()}</div>
                      <div className="level-col">{player.level}</div>
                      <div className="time-col">{formatTime(player.playTime)}</div>
                      <div className="last-col">{formatDate(player.lastPlayed)}</div>
                      
                      {expandedPlayer === player.id && (
                        <div className="player-details">
                          <div className="details-content">
                            <h4>Player Details</h4>
                            <div className="details-grid">
                              <div className="detail-item">
                                <span className="detail-label">Total Wins:</span>
                                <span className="detail-value">{Math.floor(player.score / 1000)}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Matches Played:</span>
                                <span className="detail-value">{Math.floor(player.playTime / 10)}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Win Rate:</span>
                                <span className="detail-value">
                                  {Math.min(100, Math.floor(Math.random() * 30 + 70))}
                                </span>
                              </div>
                            </div>
                            
                            {player.achievements.length > 0 && (
                              <>
                                <h4>Achievements</h4>
                                <div className="achievements-grid">
                                  {player.achievements.map((achievement, idx) => (
                                    <div key={idx} className="achievement-badge">
                                      🏅 {achievement}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;