import {ImageConfig} from "@/app/_model/config";

export const getPosterUrl = (path: string, config:ImageConfig) => {
    const size = config.poster_sizes.includes('w500') ? 'w500' : 'original';
    return `${config?.base_url}/${size}/${path}`
}
