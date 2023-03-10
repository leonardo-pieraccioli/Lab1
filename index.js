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

const FilmLibrary = function (films = []) {
    //Properties
    this.array = films;

    //Methods
    this.addNewFilm = function (film) {
        if (film instanceof Film) 
            this.array.push(film);                
    }
    this.print = function () {
        this.array.forEach( f => console.log( `Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' :  f.rating}`));
    }
    this.sortByDate = function () {
        return [...this.array].sort( (a, b) => { 
            if (a.watchDate === undefined) 
                return 1; 
            if (b.watchDate === undefined)
                return -1;
            return a.watchDate.isAfter(b.watchDate) ? -1 : 1;
        }).forEach( f => console.log( `Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' :  f.rating}`));
    }
    this.deleteFilm = function (id) {
        let index = this.array.findIndex( f => f.id === id);
        if (index != -1)
            this.array.splice(index, 1);
    }
    this.resetWatchedFilms = function () {
        this.array.forEach( f => f.watchDate = undefined);
    }
    this.getRated = function () {
        let shallowArray = this.array
            .filter( f => f.rating != undefined)
            .sort( (a,b) => { return b.rating - a.rating; });
        shallowArray.forEach( f => console.log( `Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' :  f.rating}`));
        return shallowArray;
    }
}

//test code

const filmLibrary = new FilmLibrary ([
    new Film ('Pulp Fiction', true, new dayjs('2023-03-10 12:00'), 5),
    new Film ('21 Grams', true, new dayjs('2023-03-17 12:00'), 4),
    new Film ('Star Wars', false)
]);

console.log('First insertion');
filmLibrary.print();
filmLibrary.addNewFilm(new Film ('Matrix', false));
filmLibrary.addNewFilm(new Film ('Shrek', false, new dayjs('2023-03-21 12:00'), 3));

console.log('\nInserted 2 films');
filmLibrary.print();

console.log('\nSort by date');
filmLibrary.sortByDate();

filmLibrary.resetWatchedFilms();

console.log('\nReset watched films');
filmLibrary.print();

console.log('\nGet rated films in descending order');
filmLibrary.getRated();