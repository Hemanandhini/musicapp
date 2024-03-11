import React from "react";

function generateRandomSongTime() {
    const minutes = Math.floor(Math.random() * 5) + 3; // Random minutes between 1 and 5
    const seconds = Math.floor(Math.random() * 60); // Random seconds between 0 and 59
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Arrays of possible first and last names
const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Michael', 'Emily'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis'];

// Function to generate a random name
function generateRandomName() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
}

export default function SongsCard({ songs, albums, page, loading, onAddItem }) {
    return (
        <>
            <section className="songs-category">
                <h2>Songs</h2>
                {songs.length === 0 && <p className="fallback-text">No songs found</p>}
                {loading && <p>Loading data...</p>}
                {songs.length > 0 && (
                    <ul className="songs">
                        {songs.slice(page * 10 - 10, page * 10).map((song) => {
                            const alumbSong = albums && albums.find((album) => album.id === song.albumId);
                            song.artist = generateRandomName();
                            song.duration = generateRandomSongTime();
                            return (
                                <>
                                    <li key={song.id} className="song-item">
                                        <img src={song.thumbnailUrl} alt="Songs" />
                                        <h3 className="song-title">{song.title}</h3>
                                        <p className="song-time-name">{generateRandomSongTime()}</p>
                                        <p className="song-time-name">{generateRandomName()}</p>
                                        {alumbSong && <div className="album-item ">{alumbSong.title}</div>}
                                        {onAddItem && (
                                            <>
                                                <button className="button-with-icon-add" onClick={() => onAddItem(song)}>Add song</button>
                                            </>
                                        )}
                                    </li>
                                </>
                            )
                            }
                        )}
                    </ul>
                )}
            </section>

        </>
    )
}
