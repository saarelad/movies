import {getImageConfig} from "@/app/_lib/image-config-api";
import TitleFilter from "@/app/components/TitleFilter";
import {MoviesGrid} from "@/app/components/MoviesGrid";
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
        <>
            <TitleFilter/>
            <MoviesGrid imageConfig={imageConfig} movies={filteredMovies}></MoviesGrid>
        </>
    );
}

export default MoviesPage;