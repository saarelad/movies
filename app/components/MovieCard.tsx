import {Card} from "@/app/components/Card";
import {ImageConfig} from "@/app/_model/config";
import {Movie} from "@/app/_model/movie";
import {getPosterUrl} from "@/app/_lib/poster-url";

interface Props {
    movie: Movie;
    imageConfig: ImageConfig;
}

const MovieCard = async ({movie, imageConfig}: Props) => {
    const posterUrl = getPosterUrl(movie?.poster_path, imageConfig);
    return <Card imgSrc={posterUrl} imgAlt={movie.title} title={movie.title}
                 description={`Released: ${movie.release_date}`}
                 buttonText="Details"
                 link={`/movies/${movie.id}`}/>
};

export default MovieCard;
