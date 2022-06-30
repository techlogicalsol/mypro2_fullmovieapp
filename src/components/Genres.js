import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

function Genres({selectedGenres, setSelectedGenres, genres, setGenres, setPage, type}){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"


    const fetchGenres = async ()=>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        console.log(data)
        setGenres(data.genres)
    }
    

    useEffect(()=>{
        fetchGenres()

        return ()=>{
            setGenres({})
        }
    },[])

    const handleAdd = (item) =>{
        setSelectedGenres([...selectedGenres, item])

        setGenres(genres.filter((g)=> g.id !== item.id))
        setPage(1)
    }


    const handleRemove = (item) =>{
        setSelectedGenres(
    selectedGenres.filter((selected) => selected.id !== item.id)
        );
        setGenres([...genres, item])
        setPage(1)
    }


    return(
        <>

            <h5 style={{color: "goldenrod"}}>Genres</h5>

            <div style={{padding: "8px 0"}}>

                {selectedGenres && selectedGenres.map((item)=>(
                    <Chip 
                        label={item.name}
                        color="primary"
                        key={item.id}
                        size="small"
                        clickable
                        onDelete={()=> handleRemove(item)}
                    />
                ))}


                {genres && genres.map((item)=>(
                <Chip 
                    label={item.name} 
                    key={item.id}
                    size="small"
                    clickable
                    onClick={() => handleAdd(item)}

                />
                ))}

            </div>

        </>
    )
}

export default Genres