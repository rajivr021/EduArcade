import { useState, useEffect, useRef } from 'react';
import gamesData from './gamesData';
import { Link } from 'react-router-dom';
import './Game.css';

const ITEMS_PER_PAGE = 12;

const Game = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef(null);

  // Function to record a game play
  const recordGamePlay = (gameId) => {
    const playData = {
      gameId,
      timestamp: new Date().toISOString()
    };
    
    // Get existing plays from localStorage or initialize empty array
    const existingPlays = JSON.parse(localStorage.getItem('gamePlays')) || [];
    
    // Add new play and save back to localStorage
    localStorage.setItem('gamePlays', JSON.stringify([...existingPlays, playData]));
  };

  // Filter and sort games
  const filteredGames = gamesData
    .filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
    );

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleGames = filteredGames.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Focus search on mount
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Reset page when search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  return (
    <div className="kids-game-browser">
      <header className="browser-header">
        <h1><img className='GameImg' src='/game.png' alt="" /> Fun Game World <img className='GameImg' src='/game.png' alt="" /> </h1>

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
            <span className="search-icon"><img className='GameImg' src='/Search.gif' alt="" /> </span>
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
            <Link 
              to={game.url} 
              target="_blank"
              rel="noopener noreferrer" 
              className="game-link"
              onClick={() => recordGamePlay(game.id)} // Record play when clicked
              key={game.id} // Moved key here for better React practice
            >
              <div className="game-card">
                <div className="card-inner">
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
                    <img className='playbtngif' src='/start.png' alt="" />
                    <h3>{game.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
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
    </div>
  );
};

export default Game;