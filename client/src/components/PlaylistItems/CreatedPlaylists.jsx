import React from 'react'

import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import moment from "moment";

export default function CreatedPlaylists({playlistItems, removeItem}){
    return (
        <>
          <Header headerTitle="Playlists" />
          {isEmpty(playlistItems) && (
              <p>No playsit</p>
            
          )}
          {!isEmpty(playlistItems) && 
          playlistItems.map((playlistItem) => (
            <>
                <li className="playlist" key={playlistItem.id}>
                    <Link  to={`/playlist/${playlistItem.id}`}
                      className="text-decoration-none">
                        <p>{playlistItem.name}</p>
                        <p> {moment(playlistItem.createdAt, "x").format(
                            "DD MMM YYYY hh:mm a"
                          )}</p>
                    </Link>
                </li>
            </>
          ))
          }
        </>
      );
}

