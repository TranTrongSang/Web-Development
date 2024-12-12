import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

// const TopNavbar = () => {
//   return (
//     <div className='top-navbar'>
//       <FontAwesomeIcon icon={faTv} className='icon'/>
//       <h2>Following  |   <span>For You</span></h2>
//       <FontAwesomeIcon icon={faSearch} className='icon'/>
//     </div>
//   );
// };
const TopNavbar = ({ isSearchVisible, toggleSearch, onSearch, onInputChange }) => {
  return (
    <div className='top-navbar'>
      <FontAwesomeIcon icon={faTv} className='icon' />
      {isSearchVisible ? (
        <input
          type="text"
          placeholder="Search..."
          onChange={onInputChange}
          onKeyDown={onSearch}
        />
      ) : (
        <h2>
          Following | <span>For You</span>
        </h2>
      )}
      <FontAwesomeIcon icon={faSearch} className='icon' onClick={toggleSearch} />
    </div>
  );
};

export default TopNavbar;
