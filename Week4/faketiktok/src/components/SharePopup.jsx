import React from 'react';
import './SharePopup.css';

const SharePopup = ({ onClose, onShare }) => {
  return (
    <div className="share-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Share this video</h3>
        <ul>
          <li><button onClick={() => onShare('Facebook')}>Facebook</button></li>
          <li><button onClick={() => onShare('Instagram')}>Instagram</button></li>
          <li><button onClick={() => onShare('Thread')}>Thread</button></li>
        </ul>
      </div>
    </div>
  );
};

export default SharePopup;
