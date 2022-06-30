import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

function DetailPop(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'

    const {id} = useParams();

    let history = useHistory();

    const handleClick = ()=>{
        history.push("/")
    }

    const [popular, setPopular] = useState([])

    const fetchDetailPopular = async ()=>{
        const data = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&id=${id}`
        )

        console.log(data)
        setPopular(data.data.results)
    }

    //Filter

    const detailInfo = popular.filter((product, index)=>{
        return product.id == id;
    })

    useEffect(()=>{
        fetchDetailPopular()
    },[])

    return(
        <>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                    {detailInfo && detailInfo.map((item)=>(
                        <div className="row">
                                <div className="col-md-6">
                                <img src={item.poster_path ?
                                `${img_300 + item.poster_path}` : not_available}       
                                className="popularImgD"/>
                                </div>

                                <div className="col-md-6">
                                    <div className="titlePop mb-5">
                                        {item.title}
                                    </div>

                                    <div className="overview">
                                        <p>Overview:</p>
                                        {item.overview}
                                    </div>
                                    <button 
                                    className="btn btn-dark mt-5"
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

export default DetailPop