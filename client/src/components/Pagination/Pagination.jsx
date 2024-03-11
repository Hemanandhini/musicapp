import React from 'react'

const Pagination = ({ songs, page, onPage }) => {
    return (
        <>
            {songs.length > 0 && (Math.floor(songs.length / 10) > 1) && <div className="pagination">
                <span className={page > 1 ? "" : "pagination-disable"}
                    onClick={() => onPage(page - 1)}>
                    ◀
                </span>
                {
                    [...Array(songs.length / 10)].map((_, i) => {
                        return (
                            <span className={page === i + 1 ? "pagination-selected" : ""} key={i}
                                onClick={() => onPage(i + 1)}>
                                {i + 1}
                            </span>
                        )
                    })
                }
                <span></span>
                <span className={page < songs.length / 10 ? "" : "pagination-disable"}
                    onClick={() => onPage(page + 1)}>
                    ▶️
                </span>
            </div>}
        </>
    )
}

export default Pagination;