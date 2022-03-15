//  import axios so that we can make some async requests
import axios from "axios";

// import useState AND useEffect Hooks
import { useEffect, useState} from 'react';

//  we want to use the movie id which is currently in the URL (at which this component renders) winthin our axios call
//  in order to grab information from a URL (when using Router) we can useParams Hook
import { useParams } from 'react-router-dom'

function MovieInfo() {
    //same thing as useParams
    // console.log(props);

    //  let's call the useParams Hook and see the 
    const { movieId: movie_id } = useParams();
    // console.log( useParams() );

    // call the usePara

    // initialize state to represent the movie details which will be returennd to use from the API
    const [details, setDetails] = useState( {} );

    // define a side effect which will fetch data about the movie after the component has first rendered
    useEffect( function() {
        // use axios to make a request to the movie id endpoint
        axios ({
            url: `https://api.themoviedb.org/3/movie/${movie_id}`,
            params: {
                api_key: '4d0a9a482be2105d548c38eb54491320'
            }
        }).then( function(movieInfo) {
            // console.log(movieInfo)
            setDetails(movieInfo.data)
            // use the API data and update state
        })
    }, [movie_id] )

    return (
        <section className="poster">
            <div className="description">
                {/* render the movie tagline, summary, and title */}
                <h4>{details.tagline }</h4>
                <h3>{details.title}</h3>
                <p>{details.overview}</p>
            </div>
            <div className="poster-image">
                {/* render the movie poster */}
                <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={`A move poster for ${details.title}`} />
            </div>
        </section>
    )
}

export default MovieInfo;