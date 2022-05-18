import axios from "axios";
import useGetCookies from "../Hook/UseGetCookie";
import * as jose from 'jose';
import useRefreshToken from "../Hook/UseRefreshToken";

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:2345/',
    withCredentials: true
});

AxiosInstance.interceptors.request.use(async req => {
    console.log('Request intercepted');
    let {imdb_token} = useGetCookies();
    const refreshToken = useRefreshToken();

    // @ts-ignore
    if (!(jose.decodeJwt(hetic_token).exp < Date.now() / 1000)) {
        console.log('Token not expired')
        return req
    }

    console.log('Uh, the token has expired, let me refresh that !')
    try {
        const response = await refreshToken()
        console.log(response);
        document.cookie = `imdb_token=${response.token}`;
        console.log(document.cookie)

    } catch (e) {
        console.log('The token is corrupted, sorry');
    }

    return req
})
