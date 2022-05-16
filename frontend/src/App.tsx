import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
  const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
    status: 'error',
    token: "",
    username: ""
  })
  const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
  const [blogList, setBlogList] = useState<BlogInterface[]>([])
  // Determines if the user wants to LogIn or to Register
  const [needsLogin, setNeedsLogin] = useState<boolean>(true)
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

  const login = useLogin();
  const register = useRegister();
  const getBlogList = useGetBlogList();
  const cookies = useGetCookies();
  const eraseCookie = useEraseCookie();

  useEffect(() => {
    if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
      console.log('got cookies !', loggedUser)
      setLoggedUser(prev => ({
        ...prev,
        username: cookies.hetic_username,
        token: cookies.hetic_token
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
    getBlogList()
        .then(data => {
          setBlogList(data)
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

  return (
      <div className='container mt-5'>
        <HideIfLogged loggedUser={loggedUser}>
          <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
        </HideIfLogged>

        <HideIfNotLogged loggedUser={loggedUser}>
          <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
          <BlogForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
        </HideIfNotLogged>

        <BlogList blogList={blogList}/>
      </div>
  )
}