export interface Movie {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
}

interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails {
    id: number;
    genres: Genre[];
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
}