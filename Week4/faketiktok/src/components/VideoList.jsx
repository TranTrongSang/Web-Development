import React, { useState } from 'react';
import VideoCard from './VideoCard'; // Assuming VideoCard is your video component

const VideoList = ({ videos }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVideos, setFilteredVideos] = useState(videos);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = searchQuery.trim();
            const filtered = videos.filter(video => 
                video.hashtags.includes(query) // Assuming each video has a hashtags array
            );
            setFilteredVideos(filtered);
        }
    };

    return (
        <div>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    onKeyDown={handleSearch} 
                    placeholder="Enter hashtag" 
                />
                <FontAwesomeIcon icon={faSearch} onClick={() => handleSearch({ key: 'Enter' })} />
            </div>
            <div className="video-list">
                {filteredVideos.map(video => (
                    <VideoCard key={video.id} {...video} />
                ))}
            </div>
        </div>
    );
};

export default VideoList;