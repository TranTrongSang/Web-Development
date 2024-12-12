import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import SearchBar from './components/SearchBar';
// Ex1: Import the images
import userProfilePic1 from './img/1.png';
import userProfilePic2 from './img/2.png'; 
import userProfilePic3 from './img/3.png'; 
import userProfilePic4 from './img/4.png';
// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: userProfilePic1, // Ex1
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    hashtags: ['compsci', 'chatgpt', 'ai', 'openai', 'techtok'],
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: userProfilePic2, // Ex1
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    hashtags: ['developerjokes', 'programming', 'programminghumor', 'programmingmemes'],
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: userProfilePic3, // Ex1
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
    hashtags: ['programming', 'softwareengineer', 'vscode', 'programmerhumor', 'programmingmemes'],
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: userProfilePic4, // Ex1
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
    hashtags: ['softwareengineer', 'softwareengineer', 'coding', 'codinglife', 'codingmemes'],
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Trạng thái video hiện tại
  const [currentVideoInfo, setCurrentVideoInfo] = useState(null); //Ex5
  const [searchQuery, setSearchQuery] = useState(''); // Ex7
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
          setCurrentVideoInfo(videoUrls[entry.target.dataset.index]); // Ex5

        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // Ex7
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        const query = searchQuery.trim().toLowerCase();
        const filtered = videos.filter(video =>
            video.hashtags.some(hashtag => hashtag.toLowerCase() === query) // Kiểm tra nếu có hashtag khớp
        );
        setFilteredVideos(filtered);
    }
};

  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
  };

  const resetAllVideos = useCallback(() => {
    videoRefs.current.forEach((videoRef, index) => {
        if (videoRef && index !== currentIndex) {
            videoRef.pause();
            videoRef.currentTime = 0;
        }
    });
}, [currentIndex, videoRefs]);

  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      resetAllVideos();
      videoRefs.current[currentIndex].play();
      videoRefs.current[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentIndex, resetAllVideos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };
// Ex3
const handleNavigate = useCallback((direction) => {
  if (direction === 'up' && currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
  } else if (direction === 'down' && currentIndex < videos.length - 1) {
    setCurrentIndex(currentIndex + 1);
  }
}, [currentIndex, videos.length]); // Chỉ tạo lại khi currentIndex hoặc videos.length thay đổi

// Sử dụng useEffect để lắng nghe sự kiện keydown
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      handleNavigate('down');
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [handleNavigate]); // Thêm handleNavigate vào dependency

  return (
    <div className="app">
      <div className="container">
      <TopNavbar 
          className="top-navbar" 
          isSearchVisible={isSearchVisible} 
          toggleSearch={toggleSearch} 
          onSearch={handleSearch} 
          onInputChange={handleInputChange} 
        />
        
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === currentIndex}
            onNavigate={handleNavigate}
            data-index={index} //Ex5
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
      {currentVideoInfo && (
        <div className="video-info">
          <h3>{currentVideoInfo.username}</h3>
          <p>{currentVideoInfo.description}</p>
          <p>{currentVideoInfo.song}</p>
        </div>
      )}
    </div>
  );
  
}

export default App;
