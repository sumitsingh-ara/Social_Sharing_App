import './App.css';
import {AllRoutes} from './components/All/AllRoutes';
import {Navbar} from './components/All/Navbar'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div style={{marginTop: '12vh'}}></div>
     <AllRoutes/>
    </div>
  );
}

export default App;
