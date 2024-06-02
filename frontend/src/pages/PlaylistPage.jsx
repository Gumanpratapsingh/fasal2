import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PlaylistPage = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/playlists/${playlistId}`)
            .then(response => setPlaylist(response.data))
            .catch(error => console.error('Failed to fetch playlist', error));
    }, [playlistId]);

    if (!playlist) return <div>Loading...</div>;

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/api/v1/user/share-playlist/${playlist.publicId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share URL copied to clipboard!');
        });
    };

    return (
        <div>
            <h1>{playlist.name}</h1>
            <button onClick={handleShare}>Share this Playlist</button>
            {/* Render playlist details */}
        </div>
    );
};

