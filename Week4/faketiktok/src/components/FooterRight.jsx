// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
// import './FooterRight.css';
// import SharePopup from './SharePopup';

// function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, url }) {
  
// const [liked, setliked] = useState(false);
// const [saved, setSaved] = useState(false);
// const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
// const [muted, setMuted] = useState(false); //Ex2
// const [showSharePopup, setShowSharePopup] = useState(false);

// const handleUserAddClick = () => {
//   setUserAddIcon(faCircleCheck);
//   setTimeout(() => {
//     setUserAddIcon(null);
//   }, 3000);
// };

// // Function to convert likes count to a number
// const parseLikesCount = (count) => {
//   if (typeof count === 'string') {
//     if (count.endsWith('K')) {
//       return parseFloat(count)*1000;
//     }
//     return parseInt(count);
//   }
//   return count;
//   };
//   const formatLikesCount = (count) => {
//     if (count >= 1000) {
//       return (count / 1000).toFixed(1) + 'K';
//     }
//     return count;
//   };
//   const handleLikeClick = () => {
//     setliked((prevLiked) => !prevLiked);
//   };
// // Ex2
//   const handleMuteClick = () => {
//     setMuted((prevMuted) => !prevMuted);
//     if (videoRef.current) {
//         videoRef.current.muted = !muted; // Thay đổi thuộc tính muted của video
//     }
//   };

// //Ex4
// const handleSaveClick = () => {
//   setSaved(true);
//   if (navigator.clipboard) {
//     navigator.clipboard
//       .writeText(url) // Copy the video URL to clipboard
//       .then(() => {
//         alert('Video URL copied to clipboard!');
//       })
//       .catch((err) => {
//         console.error('Failed to copy: ', err);
//       });
//   } else {
//     console.error('Clipboard API is not supported');
//   }
// };

// const handleShareClick = () => {
//   setShowSharePopup(true);
// };

// const closePopup = () => {
//   setShowSharePopup(false);
// };

//   return (
//     <div className='footer-right'>
//       <div className="sidebar-icon">
//         {profilePic ?(
//         // Displaying the user profile picture
//         <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '#616161' }} /> 
//         ) : null}
//         {/* The user add icon */}
//         <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{ width: '15px', height: '15px', color: '#FF0000' }}
//         onClick={handleUserAddClick}/>
//       </div>
      
//       <div className="sidebar-icon">
//         {/* The heart icon for liking */}
//         <FontAwesomeIcon 
//           icon={faHeart}
//           style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white'}}
//           onClick={handleLikeClick}
//           />
//         {/* Displaying the formatted likes count */}
//         <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
//       </div>
//       <div className='sidebar-icon'>
//         {/* The comment icon */}
//         <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
//         {/* Displaying the number of comments  */}
//         <p>{comments}</p>
//       </div>
//       <div className='sidebar-icon'>
//         {saved ?(
//           // Displaying the bookmark icon when saved
//           <FontAwesomeIcon 
//             icon={faBookmark} 
//             style={{ width: '35px', height: '35px', color: '#ffc107' }}
//             onClick={() => setSaved(false)} 
//             />
//         ) : (
//           // Displaying the bookmark icon when not saved
//           <FontAwesomeIcon
//           icon={faBookmark}
//           style={{ width: '35px', height: '35px', color: 'white' }}
//           onClick={handleSaveClick}
//           />
//           )}
//           {/* Displaying the number of saves */}
//           <p>{saved ? saves + 1 : saves}</p>
//       </div>
//       <div className='sidebar-icon'>
//         {/* The share icon */}
//         <FontAwesomeIcon 
//         icon={faShare} 
//         style={{ width: '35px', height: '35px', color: 'white' }}
//         onClick={handleShareClick}/>
//         {/* Displaying the number of shares */}
//         <p>{shares}</p>
//       </div>
//         {showSharePopup && <SharePopup onClose={closePopup} />} {/* Ex6*/}
//       {/* Ex2 */}
//       <div className='sidebar-icon'>
//         <FontAwesomeIcon
//           icon={muted ? faVolumeMute : faVolumeUp} 
//           style={{ width: '35px', height: '35px', color: 'white' }}
//           onClick={handleMuteClick} 
//         />
//       </div>
//       {/* Ex6 */}
      
//       <div className='sidebar-icon record'>
//         {/* Displaying the record icon */}
//         <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
//       </div>
//     </div>
//   );
// }

// export default FooterRight;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
import SharePopup from './SharePopup';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, url }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [muted, setMuted] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shared, setShared] = useState(false); // Trạng thái chia sẻ
  const [sharesCount, setSharesCount] = useState(shares); // Số lượt chia sẻ

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleMuteClick = () => {
    setMuted((prevMuted) => !prevMuted);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };

  const handleSaveClick = () => {
    setSaved(true);
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('Video URL copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    } else {
      console.error('Clipboard API is not supported');
    }
  };
//Ex6
  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleShareOptionClick = (platform) => {
    alert(`Shared on ${platform}`);
    setShared(true);
    setSharesCount(sharesCount + 1); 
    setShowSharePopup(false); 
  };

  const closePopup = () => {
    setShowSharePopup(false);
  };

  return (
    <div className='footer-right'>
      <div className="sidebar-icon">
        {profilePic ? (
          <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '#616161' }} />
        ) : null}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{ width: '15px', height: '15px', color: '#FF0000' }} onClick={handleUserAddClick} />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
        <p>{comments}</p>
      </div>

      <div className='sidebar-icon'>
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
            onClick={() => setSaved(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={handleSaveClick}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      {/* Ex6  */}
      <div className='sidebar-icon'>
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: shared ? '#4CAF50' : 'white' }} // Thay đổi màu sắc khi đã chia sẻ
          onClick={handleShareClick}
        />
        <p>{sharesCount}</p>
      </div>

      {showSharePopup && (
        <SharePopup onClose={closePopup} onShare={handleShareOptionClick} />
      )}

      <div className='sidebar-icon'>
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
      </div>

      <div className='sidebar-icon record'>
        <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
      </div>
    </div>
  );
}

export default FooterRight;
