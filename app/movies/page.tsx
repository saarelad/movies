import {getImageConfig} from "@/app/_lib/image-config-api";
import TitleFilter from "@/app/components/movies/TitleFilter";
import {MoviesGrid} from "@/app/components/movies/MoviesGrid";
import {getMovies} from "@/app/_lib/movies-api";


interface Props {
    searchParams: { filter: string };
}

const MoviesPage = async ({searchParams}: Props) => {
    const imageConfig = await getImageConfig();
    const movies = await getMovies()

    const filteredMovies = movies.filter((movie) => {
        if (searchParams.filter) {
            return movie.title.toLowerCase().includes(searchParams.filter.toLowerCase());
        }
        return true;
    });

    return (
        <div className="d-flex flex-column min-vw-100 overflow-hidden">
            <TitleFilter/>
            <div className="overflow-auto">
                <MoviesGrid imageConfig={imageConfig} movies={filteredMovies}></MoviesGrid>
            </div>
        </div>
    );
}

export default MoviesPage;