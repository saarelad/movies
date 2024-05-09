'use client'

import {useCallback, useEffect, useState} from "react";
import {useInView} from 'react-intersection-observer'
import {Movie} from "@/app/_model/movie";
import {getMovies} from "@/app/_lib/movies-api";
import {MoviesGrid} from "@/app/components/movies/MoviesGrid";
import {ImageConfig} from "@/app/_model/config";

interface Props {
    imageConfig: ImageConfig;
    filter: string;
}

// Todo: Implement a generic scroll observer to support multiple grids and data types
export const ScrollObserver = ({imageConfig, filter}: Props) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [pageLoaded, setPageLoaded] = useState(0);
    const {ref, inView} = useInView();

    const loadMoreData = useCallback(() => {
        const nextPage = pageLoaded + 1;
        getMovies(nextPage).then(newMovies => {
            setPageLoaded(nextPage);
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        })
            .catch(err => console.log('Error fetching movies', err))
    }, [pageLoaded]);

    const filterMovies = (movies: Movie[]) => movies.filter((movie) => {
        if (filter) {
            return movie.title.toLowerCase().includes(filter.toLowerCase());
        }
        return true;
    });

    useEffect(() => {
        if (inView) {
            loadMoreData();
        }
    }, [inView, loadMoreData]);

    return (
        <>
            <MoviesGrid imageConfig={imageConfig} movies={filterMovies(movies)}/>
            <div ref={ref} className="text-center">
                Loading...
            </div>
        </>
    );
};