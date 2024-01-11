import Navbar from "./components/Shared/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Posts from "./components/Posts/Posts.js"
import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import NoMatch from './components/NoMatch/NoMatch.js'
import { Routes, Route } from 'react-router-dom'
import Newpost from "./components/Posts/Create/NewPost.js"
import ViewPost from "./components/Posts/View/ViewPost.js"
import Find from "./components/Posts/Find/Find.js"

function App() {
  return (
    <>
    <Navbar />  

    <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/find" element={ <Find />} />
          <Route path="/posts" element={ <Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/posts/new" element={<Newpost />} />
          <Route path="/posts/:id/view" element={<ViewPost />} />
    </Routes>


    </>
    
  );
}

export default App;
