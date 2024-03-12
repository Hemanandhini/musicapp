import React, { useEffect, useState }  from 'react'
import { useParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import Header from '../Header/Header';
import AddSongs from './AddSongs';
import SongsList from './SongsList';
const PlaylistItem = ( ) => {
    const { id } = useParams();

    const[addSongs, setAddSongs] = useState(false);
    const [songsList, setSongsList] = useState([]);
    const [allPlayListsSongs, setallPlayListsSongs] = useState([]); // allMyPlaylists
    const[shuffle, setShuffle]  = useState(false);
    const [albums, setAlbums] = useState([]);
    const [currentPlayList, setCurrentPlaylist] = useState("");
    const { setItem, value } = useLocalStorage("playlist");
  
    useEffect(() => {
      const allPlayLists = JSON.parse(localStorage.getItem("playlist"));
      if(allPlayListsSongs !== null){
        const myPlayList =  allPlayLists.find((playlist) => playlist.id === id);
        setallPlayListsSongs(allPlayLists);
        setSongsList(myPlayList.songs)
        setCurrentPlaylist(myPlayList);
      }
    }, [id]);
  
    useEffect(() => {
      const cachedAlbum = JSON.parse(localStorage.getItem("album"));
      if (cachedAlbum) {
        setAlbums(cachedAlbum);
      } else {

        async function fetchAlbums(){
            try{
                let res = await  fetch(`https://jsonplaceholder.typicode.com/albums`);
                let data = await res.json();
                setItem(data);
                setAlbums(data);
            }catch(err){
                console.log('Error in fetchingalbums', err)
            }
           
        }
        fetchAlbums();
      }
    }, [setItem]);
  
    const addItem = (item) => {
      setSongsList((prevListSongs) => [...prevListSongs, item])
      setCurrentPlaylist((prevList) => {
        const oldList = {...prevList};
        if(oldList && oldList.hasOwnProperty('songs')){
          oldList.songs.push(item);
          return {...oldList};
        }
        return {...oldList}
      })
      setItem(allPlayListsSongs)
      
    };
  
    const removeItem = (itemToBeDeleted) => {
      setSongsList((prevListSongs) => {
        const oldSongsList = [...prevListSongs]
        const remainingSongs = oldSongsList.filter((item) => itemToBeDeleted.id !== item.id);
        return [...remainingSongs];
      })

      setCurrentPlaylist((prevList) => {
        const oldList = {...prevList};
        const oldSongs = [...oldList.songs];
        let indexTobeDeleted = oldSongs.findIndex((item) => item.id === itemToBeDeleted.id);
        oldList.songs.slice(0);
        setItem([{...oldList}])
        return {...oldList}
      })
    };
  
    const shuffleSongs = (songs) => {
      const sortedSongs = songs.sort(() => Math.random() - 0.5);
      setSongsList(sortedSongs);
      setCurrentPlaylist((prevList) => {
        const oldList = {...prevList}
        const oldSongs = [...oldList.songs];
        oldSongs.slice(0);
        return {...oldList}
      })
      setItem(allPlayListsSongs);
      setShuffle((prevState) => !prevState)
    };
  
    return (
      <>
        <div>
       
          <Header
            headerTitle={`Playlist ${
              currentPlayList ? currentPlayList.name : ""
            }`}
            alignment="left"
          />
          <div className="text-right">
            <button className="button-with-icon-add" onClick={() => setAddSongs(!addSongs)}>Add</button>
        
            {" "}
            <button className="button-with-icon-shuffle" onClick={() => shuffleSongs(songsList)}>Shuffle songs</button>
           
          </div>
          <SongsList
          
            songsList={songsList}
            albums={albums}
            removeItem={removeItem}
          />
       
      </div>
      {addSongs && (
        <> 
          <AddSongs onAddItem={addItem} />
        </>
      )}
      </>
    );
  };

export default PlaylistItem