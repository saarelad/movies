import config from "@/next.config.mjs";

const FETCH_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.env?.ACCESS_TOKEN}`
    }
}

export default FETCH_OPTIONS;