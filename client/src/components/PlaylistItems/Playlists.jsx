import React , {useState, useEffect} from 'react'
// import PlaylistItems from './CreatedPlaylists';
// import AddPlaylistItem from './CreatePlaylist';
import useLocalStorage from '../../hooks/useLocalStorage';
import CreatePlaylist from './CreatePlaylist';
import CreatedPlaylists from './CreatedPlaylists';
const Playlists = () => {
    const [playlistItems, setPlaylistItems] = useState([]);
    const { setItem, value } = useLocalStorage("playlist");

    const addItem = (item) => {
        // assuming no duplicates for demo purposes
        console.log("item", item)
        const a = [...playlistItems, item];
        setPlaylistItems((prevPlaylist) => {
            const oldPlaylist = [...prevPlaylist];
            return [...oldPlaylist, item]
        })
        setItem(a);
      };
    
      const removeItem = (itemToBeDeleted) => {
        const remainingPlaylists = playlistItems.filter(
          (item) => itemToBeDeleted.id !== item.id
        );
        setPlaylistItems(remainingPlaylists);
        setItem(remainingPlaylists);
      };

      useEffect(() => {
        const items = JSON.parse(localStorage.getItem("playlist"));
        if (items) {
          setPlaylistItems(items);
        } else {
          setItem(items);
        }
      }, [setItem]);

  return (
    
        <>
          <CreatedPlaylists playlistItems={playlistItems} removeItem={removeItem} />
          <CreatePlaylist onAddItem={addItem} />
        </>
      
  )
}

export default Playlists