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
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import Header from "./Component/Header";

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
      // <Header></Header>
      <div className='container mt-5'>
          <HideIfLogged loggedUser={loggedUser}>
              <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
          </HideIfLogged>

          <HideIfNotLogged loggedUser={loggedUser}>
              <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
          </HideIfNotLogged>

          <FilmsList filmsList={filmsList}/>
      </div>
  )
}