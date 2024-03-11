import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreatePlaylist({ onAddItem }) {
    const [item, setItem] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem(item);
        setItem(null);
    };

    const handleOnChange = (e) => {
        e.preventDefault();
        setItem((prevItem) => {
            const oldItem = { ...prevItem };
            const newItem = {
                id: uuidv4(),
                name: e.target.value,
                createdAt: Date.now(),
                songs: [],
            }
            return { ...oldItem, ...newItem }
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Create playlist</h2>
                <div className="control-row">
                    <div className="control no-margin">
                        <label htmlFor="playlist">Add Playlist item</label>
                        <input placeholder="Enter playlist name"
                            onChange={handleOnChange}
                            value={item ? item.name.value : ""} />
                    </div>
                </div>

                <p className="form-actions">
                    <button className="button">Create</button>
                </p>
            </form>
        </>
    );
}
