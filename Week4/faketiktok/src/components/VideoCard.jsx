import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
    const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay, onNavigate } = props;
    const videoRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false); // Trạng thái khóa thao tác

    useEffect(() => {
        if (autoplay) {
            videoRef.current.play();
        }
    }, [autoplay]);

    const onVideoPress = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    // Ex3
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || isNavigating) return;

        const deltaY = e.clientY - startY;
        if (deltaY < -50) {
            setIsNavigating(true);
            onNavigate('down');
            setTimeout(() => setIsNavigating(false), 500); // Khoảng thời gian tạm khóa
            setIsDragging(false);
        } else if (deltaY > 50) {
            setIsNavigating(true);
            onNavigate('up');
            setTimeout(() => setIsNavigating(false), 500);
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Xử lý cảm ứng
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || isNavigating) return;

        const deltaY = e.touches[0].clientY - startY;
        if (deltaY > 50) {
            setIsNavigating(true);
            onNavigate('down');
            setTimeout(() => setIsNavigating(false), 500);
            setIsDragging(false);
        } else if (deltaY < -50) {
            setIsNavigating(true);
            onNavigate('up');
            setTimeout(() => setIsNavigating(false), 500);
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="video"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart} // Xử lý cảm ứng
            onTouchMove={handleTouchMove}  // Xử lý cảm ứng
            onTouchEnd={handleTouchEnd}    // Xử lý cảm ứng
        >
            <video
                className="player"
                onClick={onVideoPress}
                ref={(ref) => {
                    videoRef.current = ref;
                    setVideoRef(ref);
                }}
                loop
                src={url}
            ></video>
            <div className="bottom-controls">
                <div className="footer-left">
                    <FooterLeft username={username} description={description} song={song} />
                </div>
                <div className="footer-right">
                    <FooterRight likes={likes} comments={comments} saves={saves} shares={shares} profilePic={profilePic} videoRef={videoRef} />
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
