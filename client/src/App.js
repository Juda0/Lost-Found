import Navbar from "./components/Navbar.js"
import Posts from "./components/Posts.js"
import NoMatch from './components/NoMatch.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />  

    <Routes>
          <Route path="/" />
          <Route path="/posts" element={ <Posts />} />
          <Route path="*" element={<NoMatch />} />
    </Routes>


    </>
    
  );
}

export default App;
