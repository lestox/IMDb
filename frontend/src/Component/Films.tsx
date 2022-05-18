import {FilmsInterface} from "../Interface/ResponsesInterfaces";

export default function Films({films}: { films: FilmsInterface }) {
    return (
        <div className='bg-light rounded p-3 mb-3'>
            <h3>{films.title}</h3>
            <p>
                <small>
                    Par : {films.author}
                    <br/>
                    Le : {films.date}
                </small>
            </p>
            <p>{films.content}</p>
        </div>
    )
}