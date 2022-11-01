import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import SignUp from './components/signup'
import SignIn from './components/signin'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          {/* <Route exact path='/home' element={< Contact />}></Route> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
