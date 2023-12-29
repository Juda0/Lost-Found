import Navbar from "./components/Shared/Navbar.js"
import Home from "./components/Home/Home.js"
import Posts from "./components/Posts/Posts.js"
import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import NoMatch from './components/NoMatch/NoMatch.js'
import { Routes, Route } from 'react-router-dom'
import Newpost from "./components/Posts/Create/NewPost.js"

function App() {
  return (
    <>
    <Navbar />  

    <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/posts" element={ <Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/posts/new" element={<Newpost />} />
    </Routes>


    </>
    
  );
}

export default App;
