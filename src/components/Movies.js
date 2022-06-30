import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleContent from "./SingleContent";
import CustomPagination from "./CustomPagination";
import Genres from "./Genres";
import UseGenre from "./UseGenre";

function Movies(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"


    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [page, setPage] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = UseGenre(selectedGenres)

    const fetchMovies = async () =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        console.log(data)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(()=>{
        fetchMovies()
    },[page, genreforURL])


    return(
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-10 mx-auto">

                        <Genres 
                            type="movie"
                            selectedGenres={selectedGenres}
                            setSelectedGenres={setSelectedGenres}
                            genres={genres}
                            setGenres={setGenres}
                            setPage={setPage}
                            />



                    <h1 className="mb-4 mt-3 headingh1">Movies</h1>
                        <div className="row">
                        {content && content.map((item)=>( 
                            <div className="col-md-3 mb-5">
                    <SingleContent 
                        key={item.id}
                        id={item.id}
                        poster={item.poster_path}
                        title={item.title || item.name}
                        date={item.release_date || item.first_air_date}
                        media_type={item.media_type}
                        vote={item.vote_average}
                    />
                            </div>
                                 ))}
                        </div>
                    {numOfPages > 1 && (
                    <CustomPagination 
                        setPage={setPage}
                        numOfPages={numOfPages}
                    />
                    )}
                    </div>
                    
                </div>          
                                       
                
                       
                    
                   </div> 
          




        </>
    )
}

export default Movies