import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c";
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'

    const [content, setContent] = useState([])

    const fetchPopular = async()=>{
        const {data} = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

        console.log(data)
        setContent(data.results)
    }

    useEffect(()=>{
        fetchPopular()
    },[])


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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 col-hero">
                    <img src="/images/background1.jpg" className="hero"/>

                    <div class="hero-text">
                        <h1 className="display-1">
                           <strong>Unlimited movies, TV</strong>
                        </h1>
                        <h1 className="display-2">
                           <strong>shows, and more.</strong>
                           </h1>
                        <p>Watch anywhere. Cancel anytime.</p>
                    
                    </div>
                </div>

                <div className="col-md-10 mx-auto">
                    <h1 className="mb-4 mt-3 headingh1">Popular</h1>
                    <div className="row">
                        {content.length && content.map((item)=>(
                            <div className="col-md-3 mb-5" key={item.id}>
                                <img src={item.poster_path ?
                                `${img_300 + item.poster_path}` : not_available}       
                                className="popularImg"/>
                                <div className="card-body popCard">
                                    <div className="title">{item.title || item.name}</div>

                                    <div className="date_vote"><pre>Release Date {item.release_date || item.first_air_date}</pre> 
                                    <span className={`tag ${setVoteClass(item.vote_average)}`}>
                                        {item.vote_average}
                                    </span>
                                    </div>
                                    <Link to={`detailpop/${item.id}`}>
                                    <button className="btn btn-dark">More Info</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home