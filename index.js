'use strict';

const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');

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
    //PROPERTIES
    this.array = films;

    //METHODS

    //manipulating internal array
    this.addNewFilm = function (film) {
        if (film instanceof Film)
            this.array.push(film);
    }
    this.print = function () {
        this.array.forEach(f => console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' : f.rating}`));
    }
    this.sortByDate = function () {
        return [...this.array].sort((a, b) => {
            if (a.watchDate === undefined)
                return 1;
            if (b.watchDate === undefined)
                return -1;
            return a.watchDate.isAfter(b.watchDate) ? -1 : 1;
        }).forEach(f => console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' : f.rating}`));
    }
    this.deleteFilm = function (id) {
        let index = this.array.findIndex(f => f.id === id);
        if (index != -1)
            this.array.splice(index, 1);
    }
    this.resetWatchedFilms = function () {
        this.array.forEach(f => f.watchDate = undefined);
    }
    this.getRated = function () {
        let shallowArray = this.array
            .filter(f => f.rating != undefined)
            .sort((a, b) => { return b.rating - a.rating; });
        shallowArray.forEach(f => console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.isFavorite === undefined ? 'not specified' : f.isFavorite}, Watch date: ${f.watchDate === undefined ? 'not specified' : f.watchDate}, Score: ${f.rating === undefined ? 'not specified' : f.rating}`));
        return shallowArray;
    }

    //communicating with database
    this.connectToDB = function (dbName) {
        console.log('Connection to ' + dbName + '...');
        this.db = new sqlite3.Database(dbName, (err) => { if (err) throw err; });
        console.log('Connected!');
    }
    this.closeDB = function () {
        console.log('Closing connection to DB...');
        this.db.close();
        console.log('Database connection ended');
    }
    /**
     * Store a new movie into the database. Once completed, print a confirmation/failure message.
     */
    this.storeFilmDB = function (film) {
        return new Promise ((resolve, reject) => {
            const sql = `insert into films (title, favorite, watchdate, rating) values ('${film.title}', ${film.isFavorite}, '${film.watchdate}', ${film.rating});`;
            this.db.run(sql, (err) => {if (err) { throw err; }});
            console.log(`"${film.title}" inserted!`)
        });
    }

    /**
     * Delete a movie from the database (using its ID as a reference). Once completed, print a confirmation/failure message. 
     */
    this.deleteFilmDB = function () {

    }
    /**
     * Delete the watch date of all the films stored in the database. Once completed, print a confirmation/failure message.
     */
    this.deleteAllWatchdates = function () {

    }

    //get filtered from database

    /**
     * Get all the films stored in the database and return (a Promise that resolves to) an array of Film objects
     */
    this.getAllFilms = async function () {
        return new Promise((resolve, reject) => {
            const sql = 'select * from films';
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
    /** 
     * Get all the favorite films stored in the database and return (a Promise that resolves to) an array of Film objects. 
    */
    this.getFavorites = function () {
        return new Promise((resolve, reject) => {
            const sql = 'select * from films where favorite = 1';
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
    /** 
     * Get all the films watched today stored in the database and return (a Promise that resolves to) an 
     * array of Film objects*/
    this.getWatchedToday = function () {
        return new Promise((resolve, reject) => {
            const sql = `select * from films where watchdate = '${dayjs().format('YYYY-MM-DD')}'`;
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
    /**
     * Get, through a parametric query, the films stored in the database whose watch date is earlier than 
     * a given date received as a parameter. Return (a Promise that resolves to) an array of Film objects.
     */
    this.getWatchedBeforeDate = function (date) {
        return new Promise((resolve, reject) => {
            const sql = `select * from films where watchdate < '${dayjs(date).format('YYYY-MM-DD')}'`;
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
    /**
     * Get, through a parametric query, the films in the database whose rating is greater than or equal to 
     * a given number received as a parameter. Return (a Promise that resolves to) an array of Film 
     * objects
     */
    this.getRatedMoreThan = function (score) {
        return new Promise((resolve, reject) => {
            const sql = `select * from films where rating > ${score}`;
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
    /**
     * Get, through a parametric query, the films in the database whose title contains a given string 
     * received as a parameter. Return (a Promise that resolves to) an array of Film objects.
     */
    this.getMatchingTitles = function (string) {
        return new Promise((resolve, reject) => {
            const sql = `select * from films where title like '%${string}%'`;
            this.db.all(sql, [], (err, rows) => { 
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }
}

//test code Lab 1
/*
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
*/

//test code Lab 2

async function main() {
    let films = new FilmLibrary();
    films.connectToDB('films.db');

    //let allFilms = await films.getAllFilms();
    //console.log(allFilms);

    //let allFavorites = await films.getFavorites();
    //console.log(allFavorites);

    //let watchedToday = await films.getWatchedToday();
    //console.log(watchedToday);

    //let watchedBeforeDate = await films.getWatchedBeforeDate('03-20-2023');
    //console.log(watchedBeforeDate);

    //let ratedMoreThan = await films.getRatedMoreThan(3);
    //console.log(ratedMoreThan);

    //let matchingTitles = await films.getMatchingTitles('s');
    //console.log(matchingTitles);

    //await films.storeFilmDB(new Film('Treasure Planet', 1, dayjs('04-23-2018'), 5));
    //console.log(await films.getMatchingTitles('planet'));

    

    films.closeDB();
}

main();
