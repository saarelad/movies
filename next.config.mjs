/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MOVIES_BASE_URL: "https://api.themoviedb.org/3",
        API_KEY: "111d6cc4a5e6f6b8660621ead0f9942f",
        ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTFkNmNjNGE1ZTZmNmI4NjYwNjIxZWFkMGY5OTQyZiIsInN1YiI6IjY2MzI3MjZhYzYxNmFjMDEyYTE4YTBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0BsG71XJgfnMN713J1D8MdW90L6MBVV7PwRCwp9EHqM",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
