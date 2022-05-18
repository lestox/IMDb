import useGetCookies from "./UseGetCookie";

export default function useEraseCookie() {
    return () => {
        document.cookie = 'imdb_token'+'=; Max-Age=-99999999;';
        document.cookie = 'imdb_username'+'=; Max-Age=-99999999;';
    }
}
