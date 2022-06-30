import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

function DetailMovie(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w500";
    const not_available = '/img/post.jpg'

    const {id} = useParams()

    const [movies, setMovies] = useState([])
    // const [video, setVideo] = useState([])

    const fetchDetailMovies = async() =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        
        );

        console.log(data)
        setMovies([data])
    }


    // const fetchVideo = async()=>{
    //     const {data} = await axios.get(`
    //     https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    //     );
        
    //     console.log(data.results[0])
    //     setVideo(data.results[0]?.key)
    // }




    useEffect(()=>{
        fetchDetailMovies()
        // fetchVideo()
    },[])

    let history = useHistory()

    const handleClick = ()=>{
        history.push("/movies")
    }



    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
            
                     {movies && movies.map((item)=>(
                        <div className="row">

                            <div className="col-md-6" key={item.id}>
                            <img src={item.poster_path ?
                                `${img_300 + item.poster_path}` : 
                                not_available}
                                className="trendImgD" />
                            </div>

                    <div className="col-md-6">
                        <div className="titlePop mb-2">
                            {item.title || item.name}
                    </div>

            <div className="mediaType mb-2">                                
                {item.media_type === "tv" ? "TV series" : "Movies"}
            </div>

                            <div className="overview">
                                <p>Overview:</p>
                                {item.overview}
                            </div>
                            <button className="btn btn-dark mt-4"
                            onClick={handleClick}>
                                Go Back
                            </button>
                            </div>

                            <div className="col-md-8 mt-5 mx-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Total Budget</th>
                                            <th>Revenue</th>
                                            <th>Status</th>
                                            <th>Release Date</th>
                                            <th>Runtime</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.budget}</td>
                                            <td>{item.revenue}</td>
                                            <td>{item.status}</td>
                                            <td>{item.release_date || item.first_air_date}</td>
                                            <td>{item.runtime}min</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            
                        </div>
                        ))}
                    </div>
                    
                </div>
            </div>
           
        </>
    )
}

export default DetailMovie