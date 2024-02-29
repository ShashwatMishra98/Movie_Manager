import React/*, { useState }*/ from "react";
import { Link } from "react-router-dom";
import DataList from "../model/DataList";


const MovieCard = ( {data, tab, handleClick} : {data:DataList, tab:string, handleClick:any} ) => {
    
    // const [movieSelect, setMovieSelect] = useState<DataList>();
    // const [viewData, setViewData] = useState<boolean>(false);


    return (
        
        <div className="card" >
            <Link to={{ pathname: data.title, state:{stateParam: data}  }}  style={{color: 'inherit', textDecoration: 'inherit'}} >
                <span /*onClick={() => {setMovieSelect(data); setViewData(true)}}*/ >
                    <section className="poster"><img src={data.posterurl} alt={data.title} /></section>
                    <article><p>{data.title}</p></article>
                </span>
            </Link>
            <button className={tab} onClick={handleClick} >
                {
                    tab === "favourit" 
                        ? ( <p>Remove from Favourites &#x2327;</p> ) 
                        : ( <p>Add to Favourites &#10084;&#65039;</p> )
                }
            </button>
        </div>
    );

};


export default MovieCard;