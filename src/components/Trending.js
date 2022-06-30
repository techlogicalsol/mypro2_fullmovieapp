import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";

function Trending(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'

    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    const fetchTrending = async() =>{
        const {data} = await axios.get(
        `
        https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
        );

        console.log(data)
        setContent(data.results)
    }

    useEffect(()=>{
        fetchTrending()
    },[page])


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
                    <h1 className="mb-4 mt-3 headingh1">Trending</h1>

                    <div className="row">
                        {content.length && content.map((item)=>(
                            <div className="col-md-3 mb-5" key={item}>
                                <Link to={`detailtrend/${item.id}`}>
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

                    <CustomPagination setPage={setPage}/>
                    </div>
                </div>
            </div>
            

        </>
    )
}

export default Trending