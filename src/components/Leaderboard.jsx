import { useState, useEffect, useMemo, useCallback } from 'react';
import './Leaderboard.css';
import gamesData from './gamesData';

// Utility functions outside component
const getPlays = () => {
  try {
    const plays = localStorage.getItem('gamePlays');
    if (!plays) return [];
    
    const parsed = JSON.parse(plays);
    if (!Array.isArray(parsed)) {
      console.warn('Expected array for game plays, got:', typeof parsed);
      return [];
    }
    
    return parsed.filter(play => 
      play && 
      typeof play === 'object' && 
      play.gameId && 
      play.timestamp
    );
  } catch (error) {
    console.error("Error reading plays data:", error);
    return [];
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never played';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (seconds) => {
  if (!seconds) return '0m';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const Leaderboard = () => {
  // State
  const [rawPlays, setRawPlays] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'playCount', direction: 'desc' });
  const [timeRange, setTimeRange] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlayerProfiles, setShowPlayerProfiles] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [minPlaysFilter, setMinPlaysFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const ITEMS_PER_PAGE = 10;

  // Get initial data
  useEffect(() => {
    const plays = getPlays();
    setRawPlays(plays);
    setIsLoading(false);
  }, []);

  // Process filtered plays
  const filteredPlays = useMemo(() => {
    if (!rawPlays.length) return [];
    
    const now = new Date();
    return rawPlays.filter(play => {
      const playDate = new Date(play.timestamp);
      if (timeRange === 'week') return now - playDate <= 7 * 24 * 60 * 60 * 1000;
      if (timeRange === 'month') return now - playDate <= 30 * 24 * 60 * 60 * 1000;
      return true;
    });
  }, [rawPlays, timeRange]);

  // Process game data
  const leaderboardData = useMemo(() => {
    const gameStats = gamesData.reduce((acc, game) => {
      acc[game.id] = {
        gameId: game.id,
        gameTitle: game.title,
        category: game.category || 'Uncategorized',
        playCount: 0,
        lastPlayed: null,
        banner: game.banner,
        players: new Set(),
        playHistory: [] // Added for sparklines
      };
      return acc;
    }, {});

    filteredPlays.forEach((play) => {
      if (gameStats[play.gameId]) {
        gameStats[play.gameId].playCount++;
        if (play.playerId) {
          gameStats[play.gameId].players.add(play.playerId);
        }
        if (!gameStats[play.gameId].lastPlayed || 
            new Date(play.timestamp) > new Date(gameStats[play.gameId].lastPlayed)) {
          gameStats[play.gameId].lastPlayed = play.timestamp;
        }
        gameStats[play.gameId].playHistory.push(play); // For sparklines
      }
    });

    return Object.values(gameStats).map((game) => ({
      ...game,
      uniquePlayers: game.players.size,
    }));
  }, [filteredPlays]);

  // Process player data
  const playerStats = useMemo(() => {
    const stats = filteredPlays.reduce((acc, play) => {
      if (!play.playerId) return acc;
      
      const playerId = play.playerId;
      
      if (!acc[playerId]) {
        acc[playerId] = {
          id: playerId,
          name: play.playerName || `Player ${playerId.slice(0, 4)}`,
          avatar: play.avatar || '/default-avatar.png',
          totalPlays: 0,
          uniqueGames: new Set(),
          totalPlayTime: 0,
          lastPlayed: null,
          playHistory: [] // Added for favorite game calculation
        };
      }
      
      acc[playerId].totalPlays++;
      acc[playerId].uniqueGames.add(play.gameId);
      acc[playerId].totalPlayTime += play.duration || 0;
      acc[playerId].playHistory.push(play);
      
      if (!acc[playerId].lastPlayed || new Date(play.timestamp) > new Date(acc[playerId].lastPlayed)) {
        acc[playerId].lastPlayed = play.timestamp;
      }
      
      return acc;
    }, {});

    return Object.values(stats);
  }, [filteredPlays]);

  // Get favorite game for a player
  const getFavoriteGame = useCallback((player) => {
    const gameCounts = {};
    player.playHistory?.forEach(play => {
      gameCounts[play.gameId] = (gameCounts[play.gameId] || 0) + 1;
    });
    const [favoriteId] = Object.entries(gameCounts).sort((a, b) => b[1] - a[1])[0] || [];
    return gamesData.find(g => g.id === favoriteId);
  }, [gamesData]);

  // Get achievements for players
  const getAchievements = useCallback((player) => {
    const achievements = [];
    if (player.totalPlays >= 1) achievements.push({ icon: '🏆', title: 'First Play' });
    if (player.totalPlays >= 10) achievements.push({ icon: '🎮', title: 'Regular Player' });
    if (player.uniqueGames.size >= 5) achievements.push({ icon: '🌎', title: 'Explorer' });
    if (player.totalPlayTime >= 3600) achievements.push({ icon: '⏱️', title: 'Marathoner' });
    return achievements;
  }, []);

  // Sort data
  const sortedData = useMemo(() => {
    return [...leaderboardData]
      .filter((game) => categoryFilter === 'All' || game.category === categoryFilter)
      .filter((game) => game.gameTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((game) => game.playCount >= minPlaysFilter)
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [leaderboardData, categoryFilter, searchTerm, sortConfig, minPlaysFilter]);

  // Sort players
  const sortedPlayers = useMemo(() => {
    return [...playerStats].sort((a, b) => b.totalPlays - a.totalPlays);
  }, [playerStats]);

  // Paginated data
  const paginatedGames = useMemo(() => (
    sortedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )
  ), [sortedData, currentPage]);

  const paginatedPlayers = useMemo(() => (
    sortedPlayers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )
  ), [sortedPlayers, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [timeRange, categoryFilter, searchTerm, minPlaysFilter, showPlayerProfiles]);

  // Handle sort request
  const requestSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return ['All', ...new Set(gamesData.map((game) => game.category || 'Uncategorized'))];
  }, []);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalPlays = leaderboardData.reduce((sum, game) => sum + game.playCount, 0);
    const uniquePlayers = new Set(
      leaderboardData.flatMap((game) => [...game.players])
    ).size;
    const activeGames = leaderboardData.filter((game) => game.playCount > 0).length;

    return { totalPlays, uniquePlayers, activeGames };
  }, [leaderboardData]);

  // Generate sparkline data
  const generateSparklineData = (playHistory) => {
    const now = new Date();
    const last30Days = Array(30).fill(0);
    
    playHistory.forEach(play => {
      const playDate = new Date(play.timestamp);
      const daysAgo = Math.floor((now - playDate) / (1000 * 60 * 60 * 24));
      if (daysAgo >= 0 && daysAgo < 30) {
        last30Days[29 - daysAgo]++;
      }
    });
    
    return last30Days;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard data...</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>
          <img src="/LB/lb1.png" alt="" className="trophy-img" />
          Game Leaderboard
          <img src="/LB/lb1.png" alt="" className="trophy-img" />
        </h1>

        <div className="leaderboard-controls">
          <div className="filter-group">
            <label>Time Range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="month">Last 30 Days</option>
              <option value="week">Last 7 Days</option>
            </select>
          </div>

        {/*   <div className="filter-group">
            <label>Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div> */}

          {/* <div className="filter-group">
            <label>Min Plays:</label>
            <input
              type="range"
              min="0"
              max={Math.max(...leaderboardData.map(g => g.playCount), 10)}
              value={minPlaysFilter}
              onChange={(e) => setMinPlaysFilter(Number(e.target.value))}
            />
            <span>{minPlaysFilter}</span>
          </div> */}

          <div className="searchbox">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search games"
            />
          </div>

         {/*  <button
            onClick={() => setShowPlayerProfiles(!showPlayerProfiles)}
            className="toggle-button"
            aria-pressed={showPlayerProfiles}
          >
            {showPlayerProfiles ? 'Show Games' : 'Show Players'}
          </button> */}
        </div>

        <div className="stats-summary">
          <div className="stat-card">
            <h3>Total Plays</h3>
            <p>{summaryStats.totalPlays.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Unique Players</h3>
            <p>{summaryStats.uniquePlayers.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Active Games</h3>
            <p>{summaryStats.activeGames.toLocaleString()}</p>
          </div>
        </div>
      </header>

      {showPlayerProfiles ? (
        <>
          <PlayerProfiles 
            players={paginatedPlayers} 
            gamesData={gamesData} 
            getAchievements={getAchievements}
            getFavoriteGame={getFavoriteGame}
            onPlayerSelect={setSelectedPlayer}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={sortedPlayers.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <>
          <GameLeaderboard 
            sortedData={paginatedGames} 
            sortConfig={sortConfig} 
            requestSort={requestSort} 
            gamesData={gamesData}
            onGameSelect={setSelectedGame}
            generateSparklineData={generateSparklineData}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={sortedData.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {!showPlayerProfiles && sortedData.length === 0 && (
        <EmptyState 
          image="/no-data.png" 
          title="No games found" 
          message="Try adjusting your filters or play some games to see data!"
          action={
            <button 
              onClick={() => {
                setMinPlaysFilter(0);
                setSearchTerm('');
                setCategoryFilter('All');
              }}
              className="reset-filters"
            >
              Reset Filters
            </button>
          }
        />
      )}

      {showPlayerProfiles && sortedPlayers.length === 0 && (
        <EmptyState 
          image="/no-players.png" 
          title="No player data found" 
          message="Play some games to see player statistics!" 
        />
      )}

      {/* Game Details Modal */}
      {selectedGame && (
        <GameModal 
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          generateSparklineData={generateSparklineData}
          gamesData={gamesData}
        />
      )}

      {/* Player Details Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          getFavoriteGame={getFavoriteGame}
          gamesData={gamesData}
        />
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ◀ Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next ▶
      </button>
    </div>
  );
};

// Enhanced PlayerProfiles with clickable cards
const PlayerProfiles = ({ players, gamesData, getAchievements, getFavoriteGame, onPlayerSelect }) => (
  <div className="player-profiles">
    <h2>👥 Player Profiles</h2>
    <div className="players-grid">
      {players.map((player) => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          gamesData={gamesData} 
          getAchievements={getAchievements}
          getFavoriteGame={getFavoriteGame}
          onClick={() => onPlayerSelect(player)}
        />
      ))}
    </div>
  </div>
);

// Enhanced PlayerCard with favorite game and click handler
const PlayerCard = ({ player, gamesData, getAchievements, getFavoriteGame, onClick }) => {
  const favoriteGame = getFavoriteGame(player);
  const recentPlays = useMemo(() => {
    return player.playHistory
      ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 3) || [];
  }, [player.playHistory]);

  return (
    <div className="player-card" onClick={onClick}>
      <div className="player-header">
        <img 
          src={player.avatar} 
          alt={player.name} 
          className="player-avatar"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <h3>{player.name}</h3>
      </div>
      <div className="player-stats">
        <p><strong>Total Plays:</strong> {player.totalPlays.toLocaleString()}</p>
        <p><strong>Games Played:</strong> {player.uniqueGames.size.toLocaleString()}</p>
        {favoriteGame && (
          <p><strong>Favorite:</strong> {favoriteGame.title}</p>
        )}
      </div>
      <PlayerBadges player={player} getAchievements={getAchievements} />
    </div>
  );
};

// GameModal Component
const GameModal = ({ game, onClose, generateSparklineData, gamesData }) => {
  const sparklineData = generateSparklineData(game.playHistory);
  const maxPlays = Math.max(...sparklineData, 1);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{game.gameTitle}</h2>
        
        <div className="modal-stats">
          <div className="stat">
            <h3>Total Plays</h3>
            <p>{game.playCount}</p>
          </div>
          <div className="stat">
            <h3>Unique Players</h3>
            <p>{game.uniquePlayers}</p>
          </div>
          <div className="stat">
            <h3>Last Played</h3>
            <p>{formatDate(game.lastPlayed)}</p>
          </div>
        </div>
        
        <div className="sparkline-container">
          <h3>Activity Last 30 Days</h3>
          <div className="sparkline">
            {sparklineData.map((count, i) => (
              <div 
                key={i} 
                className="sparkline-bar"
                style={{ height: `${(count / maxPlays) * 100}%` }}
                title={`${count} plays on day ${30 - i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// PlayerModal Component
const PlayerModal = ({ player, onClose, getFavoriteGame, gamesData }) => {
  const favoriteGame = getFavoriteGame(player);
  const playTimeByGame = player.playHistory?.reduce((acc, play) => {
    acc[play.gameId] = (acc[play.gameId] || 0) + (play.duration || 0);
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="player-modal-header">
          <img 
            src={player.avatar} 
            alt={player.name} 
            className="modal-avatar"
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
          <h2>{player.name}</h2>
        </div>
        
        <div className="modal-stats">
          <div className="stat">
            <h3>Total Plays</h3>
            <p>{player.totalPlays}</p>
          </div>
          <div className="stat">
            <h3>Unique Games</h3>
            <p>{player.uniqueGames.size}</p>
          </div>
          <div className="stat">
            <h3>Total Play Time</h3>
            <p>{formatTime(player.totalPlayTime)}</p>
          </div>
        </div>
        
        {favoriteGame && (
          <div className="favorite-game">
            <h3>⭐ Favorite Game</h3>
            <div className="game-item">
              <img 
                src={favoriteGame.banner} 
                alt={favoriteGame.title}
                onError={(e) => {
                  e.target.src = '/default-game.png';
                }}
              />
              <span>{favoriteGame.title}</span>
            </div>
          </div>
        )}
        
        <div className="playtime-distribution">
          <h3>Play Time Distribution</h3>
          {playTimeByGame && Object.entries(playTimeByGame)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([gameId, duration]) => {
              const game = gamesData.find(g => g.id === gameId);
              return game ? (
                <div key={gameId} className="playtime-item">
                  <span>{game.title}</span>
                  <div className="playtime-bar">
                    <div 
                      className="playtime-fill"
                      style={{ width: `${(duration / player.totalPlayTime) * 100}%` }}
                    />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
};

// Enhanced EmptyState with action button
const EmptyState = ({ image, title, message, action }) => (
  <div className="empty-state">
    <img src={image} alt={title} className="empty-state-img" />
    <h3>{title}</h3>
    <p>{message}</p>
    {action && <div className="empty-state-action">{action}</div>}
  </div>
);

// Rest of the components (PlayerBadges, GameLeaderboard, GameRow, etc.) remain the same
// but should be updated to include onClick handlers and sparkline displays where appropriate


const PlayerBadges = ({ player, getAchievements }) => (
  <div className="player-badges">
    {getAchievements(player).map((ach, i) => (
      <span key={i} className="badge" title={ach.title}>
        {ach.icon} {ach.title}
      </span>
    ))}
  </div>
);

const RecentPlays = ({ plays, gamesData }) => (
  <div className="play-history">
    <h4>Recent Activity:</h4>
    {plays.map((play, i) => {
      const game = gamesData.find((g) => g.id === play.gameId);
      return (
        <div key={i} className="play-item">
          <img 
            src={game?.banner} 
            alt="" 
            className="game-thumb"
            onError={(e) => {
              e.target.src = '/default-game.png';
            }}
          />
          <div>
            <p>{game?.title || 'Unknown Game'}</p>
            <small>
              {formatDate(play.timestamp)} • {formatTime(play.duration)}
            </small>
          </div>
        </div>
      );
    })}
  </div>
);

const GameLeaderboard = ({ sortedData, sortConfig, requestSort, gamesData }) => (
  <>
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Game</th>
            <th onClick={() => requestSort('playCount')}>
              Plays {sortConfig.key === 'playCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('uniquePlayers')}>
              Players {sortConfig.key === 'uniquePlayers' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('lastPlayed')}>
              Last Played {sortConfig.key === 'lastPlayed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((game, index) => (
            <GameRow key={game.gameId} game={game} index={index} />
          ))}
        </tbody>
      </table>
    </div>

    {sortedData.length > 0 && <TopPerformers games={sortedData} />}
  </>
);

const GameRow = ({ game, index }) => (
  <tr key={game.gameId}>
    <td className="rank-cell">
      {index + 1}
      {index < 3 && <span className="medal">{[ <img className='nav-img' src='./LB/GameReward1.gif'/>, <img className='nav-img' src='./LB/GameReward2.gif'/>, <img className='nav-img' src='./LB/GameReward3.gif'/>][index]}</span>}
    </td>
    <td className="game-cell">
      <img 
        src={game.banner} 
        alt={game.gameTitle} 
        className="game-thumbnail"
        onError={(e) => {
          e.target.src = '/default-game.png';
        }}
      />
      <div>
        <div className="game-title">{game.gameTitle}</div>
        <div className="game-category">{game.category}</div>
      </div>
    </td>
    <td>
      <div className="play-count">
        {game.playCount.toLocaleString()}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, game.playCount)}%` }}
          />
        </div>
      </div>
    </td>
    <td>{game.uniquePlayers.toLocaleString()}</td>
    <td>{formatDate(game.lastPlayed)}</td>
  </tr>
);

const TopPerformers = ({ games }) => (
  <div className="top-performers">
    <h2>Top Performers</h2>
    <div className="top-cards">
      <TopGamesCard 
        title="🏆 Most Played" 
        games={games.slice(0, 3)} 
        metric="playCount" 
      />
      <TopGamesCard 
        title="🚀 Trending Now" 
        games={[...games]
          .sort((a, b) => {
            const aScore = new Date(a.lastPlayed).getTime() * Math.log(a.playCount + 1);
            const bScore = new Date(b.lastPlayed).getTime() * Math.log(b.playCount + 1);
            return bScore - aScore;
          })
          .slice(0, 3)
        }
        metric="lastPlayed"
      />
    </div>
  </div>
);

const TopGamesCard = ({ title, games, metric }) => (
  <div className="top-card">
    <h3>{title}</h3>
    {games.map((game, index) => (
      <div key={game.gameId} className="top-game">
        <span className="top-rank">{index + 1}</span>
        <img 
          src={game.banner} 
          alt={game.gameTitle} 
          className="top-game-img"
          onError={(e) => {
            e.target.src = '/default-game.png';
          }}
        />
        <div className="top-game-info">
          <div className="top-game-title">{game.gameTitle}</div>
          <div className="top-game-stats">
            {metric === 'playCount' ? (
              <>
                <span>{game.playCount.toLocaleString()} plays</span>
                <span>{game.uniquePlayers.toLocaleString()} players</span>
              </>
            ) : (
              <span>Last played: {formatDate(game.lastPlayed)}</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Leaderboard;