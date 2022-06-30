import React from "react";
import { Link } from "react-router-dom";
import Movies from "./Movies";

function SingleContent(
    {
        id, 
        key, 
        date, 
        poster, 
        title, 
        media_type, 
        vote
    })

    {

    const setVoteClass = (vote)=>{
        if(vote >= 8){
            return 'green'
            
        }else if(vote >= 6){
            return 'orange'
            
        }else{
            return 'red'
            }
        }
        
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg';


    return(
        <>       
        <Link to={`detailMovie/${id}`}>
            <div className="trend_col">
            <img src={poster ? `${img_300 + poster}` 
            : not_available}       
            className="movieImg"/>

            <span className={`tag1 ${setVoteClass(vote)}`}>
                    {vote}
            </span>
            </div>

            <div className="card-body trendBody">
                <p>{title}</p>
                <div className="trendDate">{date}</div>
                <span>{media_type === "tv" ? "TV series" : "Movies"}</span>
            </div>
            </Link>
        </>
    )
}

export default SingleContent