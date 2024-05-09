import config from "@/next.config.mjs";
import FETCH_OPTIONS from "@/app/_lib/fetch-options";
import {ImageConfig} from "@/app/_model/config";

export const getImageConfig = async (): Promise<ImageConfig> => {
    const configUrl = `${config.env?.MOVIES_BASE_URL}/configuration`;
    const configResponse = await fetch(configUrl, FETCH_OPTIONS);
    const {images} = await configResponse.json();

    return images;
}