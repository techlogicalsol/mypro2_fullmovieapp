import { Tab, Tabs } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";

function Search(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/images/post.jpg'

    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const fetchSearch = async() =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
        );
        console.log(data)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(()=>{
        fetchSearch()
        window.scroll(0,0)
    },[type, page])


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
                <h1 className="mb-4 mt-3 headingh1">Search</h1>

                <div className="form-group mb-4 myForm">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search...."
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                    <button className="btn btn-primary" onClick={fetchSearch}>
                    <i className="fas fa-search"></i>
                    </button>
                </div>

                <Tabs
                        value={type}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(event, newValue)=>{
                            setType(newValue)
                            setPage(1)
                        }}
                        style={{paddingBottom: 5}}
                    >
                        
                        <Tab style={{width: "50%"}}label="Search Movies"  />
                        <Tab style={{width: "50%"}}label="Search TV Series"  />
                        
                    </Tabs>
                </div>

                <div className="col-md-10 mt-5 mx-auto">
                   <div className="row">
                       {content && content.map((item)=>(
                       <div className="col-md-3 mb-5" key={item}>
                                
                                <div className="trend_col">
                                <img src= {item.poster_path ? 
                                    `${img_300 + item.poster_path}` 
                                    : not_available} 
                                className="trendImg"/>
                                <span className={`tag1 ${setVoteClass(item.vote_average)}`}>
                                        {item.vote_average}
                                </span>
                                </div>
                                <div className="card-body trendBody">
                                    <p>{item.title || item.name}</p>
                                    
                                <div className="trendDate">{item.release_date || item.first_air_date ? item.release_date || item.first_air_date : "no date available" }</div>

                                </div>

                                
                            </div>
                            ))}
                              {search && !content && (type ? <h2> No Series Found </h2> : <h2>No Movies Found</h2>)}
                   </div>
                   {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                        )}
                </div>
            </div>
            
        
        </div>

        </>
    )
}

export default Search