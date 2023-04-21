//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard'
import MapPage from './pages/Map/MapPage';
import Location from './pages/Location/Location';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import {StyledContainer} from './components/Styles';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// import AuthRoute from './components/AuthRoute';
// import BasicRoute from './components/BasicRoute';
import {connect} from 'react-redux';

function App({checked}) {
  return (
    <Router>

      {checked &&

        <Routes>       
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
          {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
          <Route path='/mappage' element={ <MapPage /> }></Route>
          <Route path='/location/:locationId' element={ <Location /> }></Route>    
        </Routes>
    }
    </Router>
  );
}

const mapStateToProps = ({session}) => ({
      checked: session.checked
})
export default connect(mapStateToProps)(App);
