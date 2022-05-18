import {FilmsInterface} from "../Interface/ResponsesInterfaces";
import Films from "./Films";

export default function FilmsList({filmsList}: { filmsList: FilmsInterface[] }) {
    return (
        <div className='p-5'>
            <h1 className='text-center mb-5'>Tous les films</h1>
            {filmsList.map((films: FilmsInterface) => (
                <Films films={films} key={films.id}/>
            ))}
        </div>
    )
}