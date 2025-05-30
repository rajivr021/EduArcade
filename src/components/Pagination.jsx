import './Pagination.css';
import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [hoveredPage, setHoveredPage] = useState(null);
  
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    pages.push(1);
    if (start > 2) pages.push('...');
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="enchanted-pagination">
      <div className="moonlight"></div>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`forest-nav prev ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <span className="deer-track"></span>
        <span className="nav-arrow">〈</span>
        <span className="nav-text">Prev</span>
      </button>

      <div className="pages-trail">
        {visiblePages.map((page, index) => (
          typeof page === 'number' ? (
            <div key={index} className="trail-marker">
              <button
                onClick={() => onPageChange(page)}
                className={`page-mushroom ${currentPage === page ? 'glowing' : ''}`}
                onMouseEnter={() => setHoveredPage(page)}
                onMouseLeave={() => setHoveredPage(null)}
              >
                <span className="mushroom-cap"></span>
                <span className="mushroom-stem"></span>
                <span className="page-number">{page}</span>
                
                {currentPage === page && (
                  <>
                    <span className="mushroom-glow"></span>
                    <span className="fairy-dust"></span>
                  </>
                )}
                
                {hoveredPage === page && currentPage !== page && (
                  <span className="mushroom-hover"></span>
                )}
              </button>
              <div className="trail-connector"></div>
            </div>
          ) : (
            <div key={index} className="trail-gap">
              <span className="fireflies">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="firefly"></span>
                ))}
              </span>
            </div>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`forest-nav next ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <span className="nav-text">Next</span>
        <span className="nav-arrow">〉</span>
        <span className="deer-track"></span>
      </button>
    </div>
  );
};

export default Pagination;