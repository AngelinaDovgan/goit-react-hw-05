import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org";

// ФІЛЬМИ - для пошуку
export const fetchMovies = async (searchQuery, currentPage) => {
    const url = `/3/search/movie?`;

    const options = {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzNjMmE2OGVhMzdkMGU2ODFlNmE5YWRhOWU5MDcwYyIsInN1YiI6IjY2Mjk1YWFlMTc2YTk0MDEzMzgxNmQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryRA_fLHAuuLYn_R-gV2cC10vnRnNbuZBjSgmZkLAww",
        },
        params: {
            query: searchQuery,
            page: currentPage,
            per_page: 20
        }
   
    };
    const response = await axios.get(url, options);
    return response.data.results;
}


/////ВІДГУКИ
export const fetchMovieReviews = async (movieId) => {
    const url = `/3/movie/${movieId}/reviews`;

    const options = {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzNjMmE2OGVhMzdkMGU2ODFlNmE5YWRhOWU5MDcwYyIsInN1YiI6IjY2Mjk1YWFlMTc2YTk0MDEzMzgxNmQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryRA_fLHAuuLYn_R-gV2cC10vnRnNbuZBjSgmZkLAww",
        },
    };
    const response = await axios.get(url, options);
    return response.data.results;
}

/////АКТОРСЬКИЙ СКЛАД
export const fetchMovieCast = async (movieId) => {
    const url = `/3/movie/${movieId}/credits`;

    const options = {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzNjMmE2OGVhMzdkMGU2ODFlNmE5YWRhOWU5MDcwYyIsInN1YiI6IjY2Mjk1YWFlMTc2YTk0MDEzMzgxNmQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryRA_fLHAuuLYn_R-gV2cC10vnRnNbuZBjSgmZkLAww",
        },
    };
    const response = await axios.get(url, options);
    return response.data.cast;
}

/////ДЕТАЛЬНА ІНФО
export const fetchMovieDetails = async (movieId) => {
    const url = `/3/movie/${movieId}`;
     
    const options = {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzNjMmE2OGVhMzdkMGU2ODFlNmE5YWRhOWU5MDcwYyIsInN1YiI6IjY2Mjk1YWFlMTc2YTk0MDEzMzgxNmQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryRA_fLHAuuLYn_R-gV2cC10vnRnNbuZBjSgmZkLAww",
        },
    };
        const response = await axios.get(url, options);
        return response.data;
    }



    /////ТРЕНДОВІ ФІЛЬМИ - ГОЛОВНА СТОРІНКА
    export const fetchTrendMovies = async (currentPage) => {
        const url = "/3/trending/movie/week";
        const options = {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzNjMmE2OGVhMzdkMGU2ODFlNmE5YWRhOWU5MDcwYyIsInN1YiI6IjY2Mjk1YWFlMTc2YTk0MDEzMzgxNmQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryRA_fLHAuuLYn_R-gV2cC10vnRnNbuZBjSgmZkLAww",
            },
            params: {
                page: currentPage,
                per_page: 20
            },
        };
        const response = await axios.get(url, options);
        return response.data;
    };
