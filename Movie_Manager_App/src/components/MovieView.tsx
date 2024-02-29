import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom";
import DataList from "../model/DataList";


function MovieView() {

    const { title } : {title : string} = useParams();
    const location = useLocation();
    let finalData : DataList = {
        id : 0,
        title: "",
        year: 0,
        genres: [],
        ratings: [],
        poster: "",
        contentRating: 0,
        duration: "",
        releaseDate: "",
        averageRating: 0,
        originalTitle: "",
        storyline: "",
        actors: [],
        imdbRating: 0,
        posterurl: ""
    }

    const [movie, setMovie] = useState<DataList>();
    const [preview, setPreview] = useState<boolean>(false);
    const [locationState, setLocationState] = useState({stateParam: finalData});

    
    useEffect(() => {

        if(location.state) {
            let _state = location.state as any;
            setLocationState(_state);
            setMovie(locationState.stateParam);
        }
        console.log("movie:",locationState.stateParam);
        
    }, [location.state, locationState.stateParam]);

    

    const formelement = (
        
        movie && 
        <>
            <div className="movie-view">
                <div className="main-content">
                    <nav className="menu-nav">
                        <ul className=" nav-link" >
                            <Link to="/"><ul className="home" >Back to Home</ul></Link>
                        </ul>
                    </nav>
                    <br/>
                    
                    <div className="movielist">
                        <article className="content">
                        <section className="poster-view">
                            <img src={movie.posterurl} alt={movie.title} onClick={() => setPreview(true)} />
                            <span>&#x1f441;&#xfe0f; Preview</span>
                        </section>
                        <div className="content-text">
                            <h1>{movie.title}<span>{movie.year}</span></h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Imdb Rating</td>
                                        <td>{movie.imdbRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Content Rating</td>
                                        <td>{movie.contentRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Average Rating</td>
                                        <td>{movie.averageRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Duration</td>
                                        <td>{movie.duration}</td>
                                    </tr>
                                    <tr>
                                        <td>Genres</td>
                                        <td>{movie.genres && (movie.genres.join(', ')) }</td>
                                    </tr>
                                    <tr>
                                        <td>Actors</td>
                                        <td>{movie.actors && (movie.actors.join(', ')) }</td>
                                    </tr>
                                    <tr>
                                        <td>Release Date</td>
                                        <td>{movie.releaseDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Story line</td>
                                        <td>{movie.storyline}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </article>
                    </div>

                    <br/>


                    {
                        preview && (
                            <div className="banner-view" onClick={() => setPreview(false)} >
                                <img src={movie.posterurl} alt={movie.title} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>

    );

    return (formelement ? formelement : <p>{title}</p>);

}


export default MovieView;
