import React, { useEffect, useState } from "react";
import DataList from "../model/DataList";
import { ChangeEvent } from "react"
import { getDataFromJsonServer, pushDataToJsonServer, removeDataFromJsonServer, getDataByTitleFromJsonServer } from "../services/menu";
import MovieCard from "./MovieCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type State = {
    title: string,
    year: number,
    genres: string[],
    ratings: number[],
    poster: string,
    contentRating: number,
    duration: string,
    releaseDate: string,
    averageRating: number,
    originalTitle: string,
    storyline: string,
    actors: string[],
    imdbRating: number,
    posterurl: string
}


function MovieList() {

    const [items, setItems] = useState<DataList[]>([]);
    const [searchData, setSearchData] = useState<DataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [active, setActive] = useState("movies-in-theaters");
    const [keyword, setKeyword] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [showButton, setShowButton] = useState(false);



    useEffect(() => {

        const fetchMenu = async () => {
            try {
                // get all data and populate
                const data = await getDataFromJsonServer(active);
                setItems(data);
                setSearchData(data);
                
                // refresh search-box while rendering
                setKeyword("");

                //making tab as selected based on active-status --> css
            }
            catch (error : any) {
                setError(error);
                console.log(error);
            }

        }
        fetchMenu();
    }, [active, refresh]);


    // scroll to top button enable
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    


    // scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    // searching movie based on Title
    let searchMovie = (event : ChangeEvent<HTMLInputElement>) => {

        let search : string = event.target.value;
        console.log('('+search+')');
        setKeyword(search);
        setSearchData( search.length > 0 ? 
                                    items.filter((element) => 
                                            element.title.toLowerCase().includes(search.toLowerCase()))
                                    : items
                        );
    }


    // add-to-favourite and remove-from-favourite function
    function AddToFavourite(event : Event, movie : DataList) {
        const submitHandler = async () => {

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

            finalData = movie ? movie : finalData;
            
            if (active === "favourit" ) {
                const data = movie && await removeDataFromJsonServer(finalData.id, finalData.title).then((res) => {
                                                            toast.success(
                                                                <span>
                                                                    <p>success <br/><span className="font-small">Successfully removed from favourites</span></p>
                                                                </span>
                                                                // `Successfully removed from favourites`
                                                            );
                                                            setRefresh(!refresh);

                                                        } ).catch((err) => {
                                                            if(err.response.status === 400) 
                                                                toast.warn(
                                                                    <span>
                                                                        <p>error <br/><span className="font-small">Error observed</span></p>
                                                                    </span>
                                                                    // `Error observed`
                                                                );
                                                        } );
            } 
            else {
                let pushData : boolean = false;
                let dataStore : State = {
                    title: finalData.title,
                    year: finalData.year,
                    genres: finalData.genres,
                    ratings: finalData.ratings,
                    poster: finalData.poster,
                    contentRating: finalData.contentRating,
                    duration: finalData.duration,
                    releaseDate: finalData.releaseDate,
                    averageRating: finalData.averageRating,
                    originalTitle: finalData.originalTitle,
                    storyline: finalData.storyline,
                    actors: finalData.actors,
                    imdbRating: finalData.imdbRating,
                    posterurl: finalData.posterurl
                };

                const dataCheck = movie && await getDataByTitleFromJsonServer(finalData.id, finalData.title).then((res) => {
                                                            if (res.length > 0) {
                                                                toast.error(
                                                                    <span>
                                                                        <p>error <br/><span className="font-small">Already added to favourites</span></p>
                                                                    </span>
                                                                    // `Already added to favourites`    // Data found
                                                                );
                                                            }
                                                            else {
                                                                pushData = true;
                                                            }
                                                        } ).catch((err) => {
                                                            if(err.response.status !== 200) 
                                                                toast.warn(
                                                                    <span>
                                                                        <p>error <br/><span className="font-small">Error observed</span></p>
                                                                    </span>
                                                                    // `Error observed`
                                                                );
                                                        } );

                
                const data = pushData && await pushDataToJsonServer((finalData.id === undefined || finalData.id <= 0) ? dataStore : finalData).then((res) => {
                                                            toast.success(
                                                                <span>
                                                                    <p>success <br/><span className="font-small">Successfully added to favourites</span></p>
                                                                </span>
                                                                // `Successfully added to favourites`
                                                            );
                                                            setRefresh(!refresh);
                                                        } ).catch((err) => {
                                                            if(err.response.status !== 200) 
                                                                toast.warn(
                                                                    <span>
                                                                        <p>error <br/><span className="font-small">Error observed</span></p>
                                                                    </span>
                                                                    // `Error observed`
                                                                );
                                                        } );
            }
        }

        submitHandler();
    }
    

    // JSX code for MovieList - movie manager
    const renderForm = (

        <div className="movielist">

            {
                active === "favourit" ? ( <h3>Favourites</h3> ) : ( <h3>Movies</h3> )
            }

            {
                searchData &&  ( searchData.map ( (movie, id) => 
                                    (                                 
                                        <div className="card-container" >
                                            <MovieCard data={movie} tab={active} handleClick={
                                                                            (event: Event) => AddToFavourite(event, movie)
                                                                        } />
                                        </div>
                                    )
                                )
                            )
            }

            {
                searchData.length === 0 && ( <p className="no-data">No data found</p> )
            }
            

            {
                showButton && (
                    <button onClick={scrollToTop} className="back-to-top">&#8679;</button>
                )
            }
        </div>

    );


    // rendering movie-manager show view with list of data
    return (
        <div className="app">
            <div className="main-content">
                <nav className="menu-nav">
                    <ul className={active + " nav-link"} >
                        <li className="tab1" onClick={() => setActive("movies-in-theaters")} >Movies in Theaters</li>
                        <li className="tab2" onClick={() => setActive("movies-coming")} >Coming soon</li>
                        <li className="tab3" onClick={() => setActive("top-rated-india")} >Top rated Indian</li>
                        <li className="tab4" onClick={() => setActive("top-rated-movies")} >Top rated movies</li>
                        <li className="tab5" onClick={() => setActive("favourit")} >Favourites</li>
                    </ul>

                    <div className="search-box">
                        <input type="text" placeholder="Search movie" value={keyword} onInput={searchMovie} />
                        <input type="button" value="&#x1F50E;&#xFE0E;" />
                    </div>
                </nav>
                <br/>
                {renderForm}
                <br/>
            </div>
            <ToastContainer />
        </div>
    );

}


export default MovieList;
