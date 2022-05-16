import {FilmsInterface} from "../Interface/ResponsesInterfaces";
import axios from "axios";

export default function useGetFilmsList() {
    return (): Promise<FilmsInterface[]> => {
        return axios.get('http://localhost:2345')
            .then(res => res.data)
    }
}