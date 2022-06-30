import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";
import UseGenre from "./UseGenre";

function Series(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'
    
    const [content, setContent] = useState([])
    const [page, setPage] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = UseGenre(selectedGenres)


    const fetchTV = async() =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    console.log(data.results)
    setContent(data.results)
    setNumOfPages(data.total_pages)
    }

    useEffect(()=>{
        fetchTV()
    },[page, genreforURL])


    const setVoteClass = (vote)=>{
        if(vote >= 8){
            return 'green'
        
        }else if(vote >= 6){
            return 'orange'
        
        }else{
            return 'red'
        }
    }

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                <h1 className="mb-4 mt-3 headingh1">TV Series</h1>
                        <div className="row">
                {content && content.map((item)=>(
                            <div className="col-md-3 mb-3" key={item.id}>
                                 <Link to={`detailseries/${item.id}`}>
                                <div className="trend_col">
                                <img src={item.poster_path ?
                                `${img_300 + item.poster_path}` : not_available}       
                                className="trendImg"/>
                                <span className={`tag1 ${setVoteClass(item.vote_average)}`}>
                                        {item.vote_average}
                                </span>
                                </div>
                                <div className="card-body trendBody">
                                    <p>{item.title || item.name}</p>
                                    <div className="trendDate">{item.release_date || item.first_air_date}</div>
                                </div>

                                </Link>
                            </div>
                            ))}
                        </div>
                        {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Series