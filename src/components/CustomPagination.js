import React from "react";
import Pagination from '@material-ui/lab/Pagination';
//npm install @material-ui/lab

function CustomPagination({setPage, numOfPage = 10}){

    const handlePageChange = (page) =>{
        setPage(page)
        window.scroll(0, 0)
    }

    return(
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>

            <Pagination 
                count={numOfPage}
                onChange={(e)=> 
                handlePageChange(e.target.textContent)}
                color='primary'

            />
        </div>
    )
}

export default CustomPagination