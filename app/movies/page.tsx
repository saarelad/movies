import {getImageConfig} from "@/app/_lib/image-config-api";
import TitleFilter from "@/app/components/movies/TitleFilter";
import {MoviesGrid} from "@/app/components/movies/MoviesGrid";
import {Movie} from "@/app/_model/movie";
import {getMovies} from "@/app/_lib/movies-api";
import {ScrollObserver} from "@/app/components/util/ScrollObserver";


interface Props {
    searchParams: { filter: string };
}

const MoviesPage = async ({searchParams}: Props) => {
    const imageConfig = await getImageConfig(); // Todo: Figure out how to avoid prop bubbling for the imageConfig

    return (
        <div className="d-flex flex-column min-vw-100 overflow-hidden">
            <TitleFilter />
            <div className="overflow-auto">
                <ScrollObserver filter={searchParams.filter} imageConfig={imageConfig}/>
            </div>
        </div>
    );
}

export default MoviesPage;