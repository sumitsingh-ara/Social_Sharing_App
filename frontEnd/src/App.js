import './App.css';
import {TodosRoutes} from './components/Todos/TodosRoutes';
import {Navbar} from './components/All/Navbar'
function App() {
  return (
    <div className="App">
      <Navbar/>
     <TodosRoutes/>
    </div>
  );
}

export default App;
