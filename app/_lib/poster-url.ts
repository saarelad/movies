import {ImageConfig} from "@/app/_model/config";

const getFallbackSize = (sizes: string[]) => {
    return sizes[sizes.length - 1];
}

export const getPosterUrl = (path: string, config: ImageConfig) => {
    const size = config.poster_sizes.includes('w500') ? 'w500' : getFallbackSize(config.poster_sizes);

    return `${config?.base_url}/${size}/${path}`
}
