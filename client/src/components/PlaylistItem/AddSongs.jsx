import React from "react";
import AvailableSongs from "../Songs/AvailableSongs";

const AddSongs = ({ onAddItem }) => {
  return (
    <div>
        <p>Add songs to playlist</p>
        <AvailableSongs
              showHeader={false}
              onAddItem={onAddItem}
              searchLimit={8}
            />
    </div>
  
  );
};

export default AddSongs;
