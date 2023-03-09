'use strict';

const dayjs = require('dayjs');

let currentId = 0;

const Film = function (title, isFavorite = false, watchDate = undefined, rating = undefined) { 
    //Properties
    this.id = currentId++;
    this.title = title;
    this.isFavorite = isFavorite;
    this.watchDate = watchDate;
    this.rating = rating;
    
    //Methods

}

const FilmLibrary = function (films) {
    //Properties
    this.filmsArray = films;

    //Methods
    this.print = function () {
        console.log();
        this.filmsArray.forEach( f => console.log( `Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' :  f.rating}`));
    }
    this.sortByDate = function () {
        return [...this.filmsArray].sort( (a, b) => { 
            if (a.watchDate === undefined) 
                return 1; 
            if (b.watchDate === undefined)
                return -1;
            return a.watchDate.isAfter(b.watchDate) ? -1 : 1;
        })
    }
    this.deleteFilm = function (id) {
        let index = this.filmsArray.find( f => f.id === id );
        this.filmsArray.splice(index, 1);
    }

    /**TODO
     * fix deleteFilm
     * add method addNewFilm
     * add method resetWatchedFilms
     * add method getRated
     */
}

const films = new FilmLibrary ([
    new Film ('Pulp Fiction', true, new dayjs('2023-03-10 12:00'), 4),
    new Film ('21 Grams', true, new dayjs('2023-03-17 12:00'), 4),
    new Film ('Star Wars', false),
    new Film ('Matrix', false),
    new Film ('Shrek', false, new dayjs('2023-03-21 12:00'), 3),
]);

films.print();
films.sortByDate();
films.print();

