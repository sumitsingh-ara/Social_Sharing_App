import './App.css';
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {AllRoutes} from './components/All/AllRoutes';
import {Navbar} from './components/All/Navbar'
function App() {
  const [searchParams, setSearchParams] = useSearchParams(); //to not loose the state of page or data fetched by user in the case of reloading;
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search,setSearch] = useState((searchParams.get("search"))|| "");
  const [sortBy,setSortBy] = useState(searchParams.get("sortBy") || "");
  const [filterBy,setFilterBy] = useState(searchParams.get("filterBy") || "");
  const [limit,setLimit] = useState(Number(searchParams.get("limit")) || 6);
  let passerSearchParams={
    page:page,
    setPage:setPage,
    setSortBy:setSortBy,
    sortBy:sortBy,
    searchParams:searchParams,
    setSearchParams:setSearchParams,
    filterBy:filterBy,
    setFilterBy:setFilterBy,
    limit:limit,
    setLimit:setLimit,
    search:search,
    setSearch:setSearch
  }
  return (
    <div className="App">
      <Navbar passerSearchParams={passerSearchParams}/>
      <div style={{marginTop: '12vh'}}></div>
     <AllRoutes passerSearchParams={passerSearchParams} />
    </div>
  );
}

export default App;
