'use server'

import config from "@/next.config.mjs";
import {Movie, MovieDetails} from "@/app/_model/movie";
import FETCH_CONFIG from "@/app/_lib/fetch-config";
import FETCH_OPTIONS from "@/app/_lib/fetch-config";

interface FetchMoviesResponse {
    id: number;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const getMovies = async (page:number): Promise<Movie[]> => {
    const moviesUrl = `${config.env?.MOVIES_BASE_URL}/movie/popular?page=${page}`;
    try {
    const res = await fetch(moviesUrl, FETCH_CONFIG);
    const resJson = await res.json() as FetchMoviesResponse;
    return resJson.results;
    } catch (e) {
        console.error('Error fetching movies', e);
        return [];
    }
}

export const getMovie = async (id: string): Promise<MovieDetails> => {
    const moviesUrl = `${config.env?.MOVIES_BASE_URL}/movie/${id}`;
    const res = await fetch(moviesUrl, FETCH_OPTIONS);
    return await res.json() as MovieDetails;

}