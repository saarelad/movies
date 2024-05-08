import MovieCard from "@/app/components/MovieCard";
import {ImageConfig} from "@/app/_model/config";
import {Movie} from "@/app/_model/movie";

interface Props {
    imageConfig: ImageConfig;
    movies: Movie[]
}

export const MoviesGrid = async ({imageConfig, movies}: Props) => {
    return (
        <div className="d-flex flex-fill flex-sm-wrap m-2 overflow-auto justify-content-center content">
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} imageConfig={imageConfig}/>)}
        </div>
    );
};