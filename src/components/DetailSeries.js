import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

function DetailSeries(){
    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'

    const {id} = useParams()

    let history = useHistory()

    const handleClick = ()=>{
        history.push("/series")
    }

    const [trend, setTrend] = useState([])

    const fetchDetailTrending = async() =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&id=${id}`
        );

        console.log(data)
        setTrend(data.results)
    }

    //Filter

    const detailInfo = trend.filter((product)=>{
        return product.id == id
    })

    useEffect(()=>{
        fetchDetailTrending()
    },[])


    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        {detailInfo && detailInfo.map((item)=>(
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
                                    <button 
                                    className="btn btn-dark mt-4"
                                    onClick={handleClick}
                                    >
                                        Go Back
                                    </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>



        </>
    )
}

export default DetailSeries