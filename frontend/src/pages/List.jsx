import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { FaShareAlt } from 'react-icons/fa'; // Import the share icon

export const List = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/playlists', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setPlaylists(response.data);
            } catch (error) {
                console.error('Failed to fetch playlists:', error);
            }
        };
        fetchPlaylists();
    }, []);

    const handleShare = (publicId) => {
        const shareUrl = `${window.location.origin}/api/v1/user/share-playlist/${publicId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share URL copied to clipboard!');
        });
    };

    return (
        <div>
            <Navbar title="List Page" />
            <div className="flex justify-center items-center h-screen">
                {playlists.length === 0 ? (
                    <div className="text-center py-2">
                        <p className="text-lg">No playlists found.</p>
                    </div>
                ) : (
                    playlists.map((playlist, index) => (
                        <div key={index} className="bg-white shadow-lg p-4 rounded-lg m-4 w-80 flex justify-between items-center">
                            <Link to={`/playlist/${playlist}`} className="block p-2 text-center">{playlist}</Link>
                            <FaShareAlt className="cursor-pointer" onClick={() => handleShare(playlist.publicId)} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

