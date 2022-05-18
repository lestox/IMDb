import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import useLogin from "./Hook/useLogin";
import {FilmsInterface, LoginResponseInterface} from "./Interface/ResponsesInterfaces";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import useGetFilmsList from "./Hook/useGetFilmsList";

import FilmsList from "./Component/FilmsList";
import useEraseCookie from "./Hook/UseEraseCookie";
import useRegister from "./Hook/UseRegister";
import useGetCookies from "./Hook/UseGetCookie";

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [filmsList, setFilmsList] = useState<FilmsInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getFilmsList = useGetFilmsList();
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('imdb_token') && Object.keys(cookies).includes('imdb_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.imdb_username,
                token: cookies.imdb_token
            }))
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])

    useEffect(() => {
        getFilmsList()
            .then(data => {
                setFilmsList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }

  useEffect(() => {
    getFilmsList()
        .then(data => {
          setFilmsList(data)
        })
  }, [])

  return (
      <div className='container mt-5'>
        <FilmsList filmsList={filmsList}/>
      </div>
  )
}