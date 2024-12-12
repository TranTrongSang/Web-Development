import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Nhập hashtag"
            />
            <FontAwesomeIcon icon={faSearch} onClick={() => handleSearch({ key: 'Enter' })} />
        </div>
    );
};

export default SearchBar;