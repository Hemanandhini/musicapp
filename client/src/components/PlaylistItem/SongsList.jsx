import React from 'react'
import { isEmpty } from "lodash";

const SongsList = ({ songsList, albums = [], removeItem }) => {
    return (
        <>
            {isEmpty(songsList) && (
                <div className="mt-4">
                    <p>No songs</p>

                </div>
            )}
            {!isEmpty(songsList) && (
                <>
                    <p>Songs</p>
                    <ul className='playlist'>
                        {songsList.map((song) => {
                            const albumOfSong = albums.find(
                                (album) => album.id === song.albumId
                            );
                            return (
                                <>
                                    <div className="playlist-item" key={song.id}>
                                        <div className='list-group-item song-title'>{song.title}</div>
                                        <div className='list-group-item'>{song.duration}</div>
                                        <div className='list-group-item'>{song.artist}</div>
                                        {albumOfSong && (
                                            <div className='list-group-item'>
                                                {albumOfSong.title}
                                            </div>
                                        )}
                                        <div className='list-group-item'>
                                            <button className='delete-icon' onClick={() => removeItem(song)}>Delete</button>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};

export default SongsList