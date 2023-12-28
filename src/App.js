/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

import EditMovieForm from "./components/EditMovieForm";
import { REG_TYPE, UseAxios } from "./hooks/useAxios";
import { useHistory } from "react-router-dom";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const {push}=useHistory();
  //const[requestDo,movies,loading,error]=UseAxios([])
  useEffect(() => {
      axios.get('http://localhost:9000/api/movies')
        .then(res => {
          setMovies(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    //requestDo({reqType:REG_TYPE.GET,endPoint:"http://localhost:9000/api/movies"})
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
     .then((res)=>{
      console.log("silme:",res.data);
      setMovies(res.data)
      push("/movies")
     }).catch((err)=>{
      console.log("silme yapılamadı:",err.message);
     })
  }

  const addToFavorites = (movie) => {
    if(favoriteMovies.find((item)=>item.id===movie.id)) return;
      setFavoriteMovies([...favoriteMovies,movie]);
    

    
  
      
  }

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
            <EditMovieForm movies={movies} setMovies={setMovies}  setFavoriteMovies={setFavoriteMovies}  />
            </Route>

            <Route path="/movies/add">
            <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie addToFavorites={addToFavorites} deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
            
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

