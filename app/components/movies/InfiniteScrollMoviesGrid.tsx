'use client'

import {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {useInView} from 'react-intersection-observer'
import {Movie} from "@/app/_model/movie";
import {getMovies} from "@/app/_lib/movies-api";
import {MoviesGrid} from "@/app/components/movies/MoviesGrid";
import {ImageConfig} from "@/app/_model/config";

interface Props {
    imageConfig: ImageConfig;
    filter: string;
}

const NO_RESULTS_PAGES_BARRIER = 30;

const NoResultMessage = (props: { onYes: () => void }) => {
    return <div className="d-flex flex-column m-3">
        <div>No results found yet, you might want to consider a different search value.</div>
        <div className="d-flex gap-3 align-items-center">
            <div> should I keep searching with current search?</div>
            <button className="btn btn-primary btn-sm" onClick={props.onYes}>Yes</button>
        </div>
    </div>;
}

// Todo: Infinite scroll sometimes causes data duplication, need to investigate and fix.
// Todo: Should be a generic scroll observer to decouple from the movie interface and api and support other grids
export const InfiniteScrollMoviesGrid = ({imageConfig, filter}: Props) => {
    const [moviesData, setMoviesData] = useState<Movie[]>([])
    const [moviesToDisplayed, setMoviesToDisplayed] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldLoadMore, setShouldLoadMore] = useState(true);
    const {ref, inView} = useInView();
    const currentPageRef = useRef(0);


    const loadMoreData = useCallback(() => {
        if (isLoading) return;
        setIsLoading(true);
        const nextPage = currentPageRef.current + 1;
        getMovies(nextPage).then(newMovies => {

            // Todo: This is a fallback for a race condition or unidentified bug, should investigate and resolve.
            // Filter out movies that are already in the current state
            const uniqueMovieIds = new Set(moviesData.map(movie => movie.id));
            const filteredNewMovies = newMovies.filter(movie => !uniqueMovieIds.has(movie.id));
            setMoviesData((prevMovies) => [...prevMovies, ...filteredNewMovies]);
            currentPageRef.current = nextPage;
            setIsLoading(false);
        }).catch(err => {
            console.log('Error fetching movies', err);
            setIsLoading(false);
        });
    }, [isLoading]);

    // Reset state if filter changes
    useEffect(() => {
        currentPageRef.current = 0;
        setMoviesData([]);
        setShouldLoadMore(true)
    }, [filter]);

    // Apply filter on retrieved movies data
    useEffect(() => {
        const filteredMovies: Movie[] = filter ?
            moviesData.filter(m => m.title.toLowerCase().includes(filter.toLowerCase())) :
            moviesData;

        setMoviesToDisplayed(filteredMovies)
    }, [filter, moviesData]);

    const isNoResultsCheckpointReached = useCallback(() => {
        return currentPageRef.current > 0 && currentPageRef.current % NO_RESULTS_PAGES_BARRIER === 0;
    }, [currentPageRef.current]);

    // Limit infinite api calls with no results
    useEffect(() => {
        if (isNoResultsCheckpointReached() && !moviesToDisplayed.length) {
            setShouldLoadMore(false);
        }
    }, [currentPageRef.current, moviesToDisplayed]);

    // Load more movies if needed
    useEffect(() => {
        if (inView && !isLoading && shouldLoadMore) {
            loadMoreData();
        }
    }, [inView, isLoading, shouldLoadMore, loadMoreData]);

    const handleKeepSearching = () => {
        setShouldLoadMore(true)
    };

    return (
        <div style={{minHeight: 500}}>
            <Suspense>
                {!shouldLoadMore && !moviesToDisplayed.length &&
                    <NoResultMessage onYes={handleKeepSearching}/>
                }
                {moviesToDisplayed && <MoviesGrid imageConfig={imageConfig} movies={moviesToDisplayed}/>}
                {shouldLoadMore &&
                    <div className="d-flex justify-content-center">
                        <div ref={ref} className="spinner-border text-primary" role="status"/>
                    </div>
                }
            </Suspense>
        </div>
    );
};