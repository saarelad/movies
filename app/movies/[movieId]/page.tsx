import config from "@/next.config.mjs";
import {MovieDetails} from "@/app/_model/movie";
import FETCH_OPTIONS from "@/app/_lib/fetch-config";
import {getPosterUrl} from "@/app/_lib/poster-url";
import {getImageConfig} from "@/app/_lib/image-config-api";
import Image from "next/image";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";


interface Props {
    params: { movieId: string }
}

const MovieDetailsPage = async ({params}: Props) => {
    const {movieId} = params;
    const moviesUrl = `${config.env?.MOVIES_BASE_URL}/movie/${movieId}`;
    const res = await fetch(moviesUrl, FETCH_OPTIONS);
    const movie: MovieDetails = await res.json();
    const imageConfig = await getImageConfig();
    const posterUrl = getPosterUrl(movie.poster_path, imageConfig);
    return (
        <div className="m-2">
            <Link href="/movies" className="d-flex gap-3 my-2"><TiArrowBack/><span>Back to list</span></Link>
            <div className='d-flex gap-5'>
                <Image width={500} height={400} src={posterUrl} alt={movie?.title}/>
                <div className='d-flex flex-column gap-5 w-50'>
                    <h1>{movie?.title}</h1>
                    <p>{movie?.overview}</p>
                    <div>Released: {movie?.release_date}</div>
                    <div className='d-flex flex-row gap-3'>{movie?.genres.map(genre => <span
                        key={genre.id}>#{genre?.name}</span>)}</div>
                </div>
            </div>
        </div>
    );

}

export default MovieDetailsPage;