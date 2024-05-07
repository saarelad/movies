import config from "@/next.config.mjs";
import MovieCard from "@/app/components/MovieCard";
import {Movie} from "@/app/_model/movie";
import FETCH_CONFIG from "@/app/_lib/fetch-config";
import {getImageConfig} from "@/app/_lib/image-config-api";
import {Suspense} from "react";
import TitleFilter from "@/app/components/TitleFilter";
import {MoviesGrid} from "@/app/components/MoviesGrid";


interface FetchMoviesResponse {
    id: number;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface Props {
    searchParams: { filter: string };
}
const MoviesPage = async ({searchParams}:Props) => {
    const imageConfig = await getImageConfig();
    const moviesUrl = `${config.env?.MOVIES_BASE_URL}/movie/popular`;

    const res = await fetch(moviesUrl, FETCH_CONFIG);
    const resJson: FetchMoviesResponse = await res.json();
    const movies: Movie[] = resJson.results;

    const filteredMovies = movies.filter((movie) => {
        if (searchParams.filter) {
            return movie.title.toLowerCase().includes(searchParams.filter.toLowerCase());
        }
        return true;
    });

    return (
        <>
            <Suspense fallback={<div className="text-bg-info text-info">Loading...</div>}>
                <TitleFilter/>
            </Suspense>
            <MoviesGrid imageConfig={imageConfig} movies={filteredMovies}></MoviesGrid>
        </>
    );
}

export default MoviesPage;