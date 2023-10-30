import React, { useState, useEffect } from 'react';
import axios from 'axios';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movie) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const savedArr = saved;
    savedArr.find((a) => a.id === movie.id) !== null && savedArr.push(movie);
    setSaved([...savedArr]);
  };

  return (
    <div>

      <KaydedilenlerListesi list={saved} />

      <div><Switch>
        <Route path="/" exact>
          <FilmListesi movies={movieList} />
        </Route>
        <Route path="/filmler/:id">
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
            saved={saved}
          />
        </Route>

      </Switch>

      </div>
    </div>
  );
}
