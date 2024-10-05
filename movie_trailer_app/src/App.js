import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider } 
  from "react-router-dom";
import MoviesLayout from "./components/layouts/MoviesLayout";
import MoviesHomepage from "./components/pages/MoviesHomepage";
import FeaturedMovies from "./components/pages/FeaturedMovies";
import AllFeaturedMovies from "./components/pages/AllFeaturedMovies"
import AllUpcomingMovies from "./components/pages/AllUpcomingMovies"
import AllTopRatedMovies from "./components/pages/AllTopRatedMovies"
import MovieDetail, { fetchSingleMovie } from "./components/pages/MovieDetail";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/movies-app" element={<MoviesLayout />}>
    <Route index element={<MoviesHomepage />}/>
    <Route path="featured"  element={<FeaturedMovies />}/>
    <Route path="all-featured-movies" element={<AllFeaturedMovies />} />
    <Route path="all-upcoming-movies" element={<AllUpcomingMovies />}/>
    <Route path="all-top-rated-movies" element={<AllTopRatedMovies />}/>
    <Route path=":id" element={<MovieDetail />} loader={fetchSingleMovie}/>
  </Route>
))


function App() {
  return (
    <div className="App bg-gray-900">
      <RouterProvider  router={router}/>
    </div>
  );
}

export default App;
