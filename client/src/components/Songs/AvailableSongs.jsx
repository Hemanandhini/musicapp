import React, { useState, useEffect } from "react";
import SongsCard from "./SongsCard";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import {fetchAvailableAlbums, fetchAvailableSongs} from "../../http"
import { useFetch } from "../../hooks/useFetch";

export default function AvailableSongs({showHeader,
    onAddItem ,
    searchLimit}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const {loading, fetchedData: songs, error} = useFetch(fetchAvailableSongs, []);
    console.log("data", songs)

    const {loading: loading1, fetchedData: albums, error: error1} = useFetch(fetchAvailableAlbums, [], 'albums');
    console.log("data", albums)

    function selectPageHandler(selectedPage) {
        if (selectedPage >= 1 && selectedPage <= songs.length && selectedPage !== page) {
            setPage(selectedPage)
        }
    }

    function onSearch(event) {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            <Search searchTerm={searchTerm} onSearch={onSearch} />
            <SongsCard songs={songs} albums={albums} page={page} loading={loading} onAddItem={onAddItem} />
            <Pagination songs={songs} page={page} onPage={selectPageHandler} />
        </>
    )

}
