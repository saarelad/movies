import {getImageConfig} from "@/app/_lib/image-config-api";
import TitleFilter from "@/app/components/movies/TitleFilter";
import {InfiniteScrollMoviesGrid} from "@/app/components/movies/InfiniteScrollMoviesGrid";


interface Props {
    searchParams: { filter: string };
}

const MoviesPage = async ({searchParams}: Props) => {
    // Todo: Find alternative for context provider and figure out how to avoid prop bubbling for the imageConfig
    const imageConfig = await getImageConfig();

    return (
        <div className="d-flex flex-column min-vw-100 overflow-hidden">
            <TitleFilter/>
            <div className="overflow-auto">
                <InfiniteScrollMoviesGrid filter={searchParams.filter} imageConfig={imageConfig}/>
            </div>
        </div>
    );
}

export default MoviesPage;