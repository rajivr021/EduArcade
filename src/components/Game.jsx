import { useState, useEffect, useRef } from 'react';
import gamesData from './gamesData';
import { Link } from 'react-router-dom';
import './Game.css';

const ITEMS_PER_PAGE = 12;

const Game = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const searchInputRef = useRef(null);

  // Filter and sort games
  const filteredGames = gamesData
    .filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleGames = filteredGames.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  const toggleFavorite = (gameId) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <div className="kids-game-browser">
      <header className="browser-header">
        <h1>🎮 Fun Game World 🎮</h1>

        <div className="search-container">
          <div className="search-box">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Find your favorite game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-toggle">
            <button
              onClick={() => setSortOrder('asc')}
              className={sortOrder === 'asc' ? 'active' : ''}
            >
              A-Z
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={sortOrder === 'desc' ? 'active' : ''}
            >
              Z-A
            </button>
          </div>
        </div>
      </header>

      <div className="game-grid">
        {visibleGames.length > 0 ? (
          visibleGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="card-inner">
                <Link
                  to={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-link"
                >
                  <div className="game-image-container">
                    <img
                      src={game.banner}
                      alt={game.title}
                      loading="lazy"
                      className="game-image"
                    />
                    <div className="game-overlay"></div>
                  </div>
                  <div className="game-info">
                    <h3>{game.title}</h3>
                    <span className="play-button">Play Now →</span>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(game.id);
                  }}
                  className={`favorite-btn ${favorites.includes(game.id) ? 'favorited' : ''}`}
                  aria-label={favorites.includes(game.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(game.id) ? '❤️' : '🤍'}
                </button>
                {favorites.includes(game.id) && <div className="favorite-badge">⭐ Favorite</div>}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No games found! Try a different search.</p>
            <button onClick={() => setSearchTerm('')} className="clear-search">
              Clear Search
            </button>
          </div>
        )}
      </div>

      {filteredGames.length > ITEMS_PER_PAGE && (
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ◀ Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next ▶
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>⭐ Your Favorites ⭐</h2>
          <div className="favorites-grid">
            {gamesData
              .filter(game => favorites.includes(game.id))
              .map(game => (
                <div key={game.id} className="favorite-card">
                  <div className="favorite-card-inner">
                    <Link to={game.url} target="_blank" rel="noopener noreferrer">
                      <img src={game.banner} alt={game.title} />
                      <span>{game.title}</span>
                      <div className="favorite-overlay"></div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;