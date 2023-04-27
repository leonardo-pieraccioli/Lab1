'use strict';

//const dayjs = require("dayjs");

let currentId = 0;

const Film = function (title, isFavorite = false, watchDate = undefined, rating = undefined) {
    //Properties
    this.id = currentId++;
    this.title = title;
    this.isFavorite = isFavorite;
    this.watchDate = watchDate;
    this.rating = rating;
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
    this.getAll = function () {
        return films;
    }
    this.getFavorites = function () {
        return films.filter( f => f.isFavorite );
    }
    this.getBestRated = function () {
        return films.filter( f => f.rating == 5 );
    }
    this.getSeenLastMonth = function () {
        return films.filter( f => f.watchDate != undefined && dayjs(f.watchDate).month() == dayjs().month() - 1);
    }
    this.getUnseen = function () {
        return films.filter( f => f.watchDate == undefined );
    }
}

/*  
    <li class="list-group-item" id="PulpFiction">
        <div class="d-flex w-100 justify-content-between">
            <p class="favorite text-start col-4">Pulp Fiction</p>
            <span class="custom-control custom-checkbox col-2">
                <input type="checkbox" class="custom-control-input" id="check-f1" checked>
                <label class="custom-control-label" for="check-f1">Favorite</label>
            </span>
            <small class="watch-date col-3">March 10, 2023</small>
            <span class="rating text-end col-3">
                <img src="imgs/full_star.png" width="16" height="16">
                <img src="imgs/full_star.png" width="16" height="16">
                <img src="imgs/full_star.png" width="16" height="16">
                <img src="imgs/full_star.png" width="16" height="16">
                <img src="imgs/empty_star.png" width="16" height="16">
            </span>
        </div>
    </li>
*/

function createFilmRow(film){   
    //CONTAINERS
    //<li class="list-group-item" id="PulpFiction">
    const il = document.createElement("li");
    il.className = "list-group-item";
    il.id = film.title;

    //<div class="d-flex w-100 justify-content-between">
    const div = document.createElement("div");
    div.className = "d-flex w-100 justify-content-between";

    //TITLE
    //<p class="favorite text-start col-4">Pulp Fiction</p>
    const titleP = document.createElement("p");
    let titleClassName = "text-start col-4";
    if (film.isFavorite) {
        titleClassName += " favorite";
    }
    titleP.className = titleClassName;
    titleP.innerText = film.title;

    div.appendChild(titleP);

    //FAVORITE CHECKBOX
    //<span class="custom-control custom-checkbox col-2">
    const favoriteCheckbox = document.createElement("span");
    favoriteCheckbox.className = "custom-control custom-checkbox col-2";

    //<input type="checkbox" class="custom-control-input" id="check-f1" checked>
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.className = "custom-control-input";
    inputCheckbox.id = "check-f" + film.id;
    if ( film.isFavorite )
        inputCheckbox.setAttribute("checked", "");
    favoriteCheckbox.appendChild(inputCheckbox);

    //<label class="custom-control-label" for="check-f1">Favorite</label>
    const labelCheckbox = document.createElement("label");
    labelCheckbox.className = "custom-control-label";
    labelCheckbox.for = "check-f" + film.id;
    labelCheckbox.innerText = "Favorite";
    favoriteCheckbox.appendChild(labelCheckbox);

    div.appendChild(favoriteCheckbox);

    //DATE
    //<small class="watch-date col-3">March 10, 2023</small>
    const date = document.createElement("small");
    date.className = "watch-date col-3";
    date.innerText = film.watchDate != undefined ? dayjs(film.watchDate).format('MMMM D, YYYY') : "";

    div.appendChild(date);

    //RATING
    // <span class="rating text-end col-3">
    //     <img src="imgs/full_star.png" width="16" height="16">
    //     <img src="imgs/full_star.png" width="16" height="16">
    //     <img src="imgs/full_star.png" width="16" height="16">
    //     <img src="imgs/full_star.png" width="16" height="16">
    //     <img src="imgs/empty_star.png" width="16" height="16">
    // </span>
    const ratingSpan = document.createElement("span");
    ratingSpan.className = "rating text-end col-3";

    for (let i = 0; i < film.rating; i++) {
        let fullStar = document.createElement("img");
        fullStar.src = "imgs/full_star.png";
        fullStar.width = '16';
        fullStar.height = '16';
        ratingSpan.appendChild(fullStar);
    }
    for (let i = 0; i < 5 - film.rating; i++) {
        let emptyStar = document.createElement("img");
        emptyStar.src = "imgs/empty_star.png";
        emptyStar.width = '16';
        emptyStar.height = '16';
        ratingSpan.appendChild(emptyStar);
    }

    div.appendChild(ratingSpan);

    il.appendChild(div);

    return il;

}

//TODO: Implement filters

function createFilmsTable (films){
    const filmsTable = document.getElementById('list-films');
    filmsTable.innerHTML = '';

    for (let f of films){
        const filmRow = createFilmRow(f);
        filmsTable.appendChild(filmRow);
    }
}

function filterAllFilms(e) { 
    const filters = document.getElementById("left-sidebar");
    const thisFilter = document.getElementById("filter-all");
    if (thisFilter.className.includes("active")) {
        console.log("Filter already active");
        return;
    }
    let prevActive = filters.querySelector(".active");
    
    prevActive.classList.remove("active");
    thisFilter.classList.add("active");

    createFilmsTable(films.array);
}

function filterFavoritesFilms(e) {
    const filters = document.getElementById("left-sidebar");
    const thisFilter = document.getElementById("filter-favorites");
    if (thisFilter.className.includes("active")) {
        console.log("Filter already active");
        return;
    }
    let prevActive = filters.querySelector(".active");
    
    prevActive.classList.remove("active");
    thisFilter.classList.add("active");

    createFilmsTable(films.getFavorites());
}

function filterBestFilms(e) {
    const filters = document.getElementById("left-sidebar");
    const thisFilter = document.getElementById("filter-best");
    if (thisFilter.className.includes("active")) {
        console.log("Filter already active");
        return;
    }
    let prevActive = filters.querySelector(".active");
    
    prevActive.classList.remove("active");
    thisFilter.classList.add("active");

    createFilmsTable(films.getBestRated());
}

function filterSeenLastMonthFilms(e){
    const filters = document.getElementById("left-sidebar");
    const thisFilter = document.getElementById("filter-seen-last-month");
    if (thisFilter.className.includes("active")) {
        console.log("Filter already active");
        return;
    }
    let prevActive = filters.querySelector(".active");
    
    prevActive.classList.remove("active");
    thisFilter.classList.add("active");

    createFilmsTable(films.getSeenLastMonth());
}

function filterUnseenFilms(e){
    const filters = document.getElementById("left-sidebar");
    const thisFilter = document.getElementById("filter-unseen");
    if (thisFilter.className.includes("active")) {
        console.log("Filter already active");
        return;
    }
    let prevActive = filters.querySelector(".active");
    
    prevActive.classList.remove("active");
    thisFilter.classList.add("active");

    createFilmsTable(films.getUnseen());
}

function enableFilters() {
    const filterAll = document.getElementById("filter-all");
    const filterFavorites = document.getElementById("filter-favorites");
    const filterBest = document.getElementById("filter-best");
    const filterSeenLastMonth = document.getElementById("filter-seen-last-month");
    const filterUnseen = document.getElementById("filter-unseen");
    
    filterAll.addEventListener('click', (e) => filterAllFilms(e));
    filterFavorites.addEventListener('click', (e) => filterFavoritesFilms(e));
    filterBest.addEventListener('click', (e) => filterBestFilms(e));
    filterSeenLastMonth.addEventListener('click', (e) => filterSeenLastMonthFilms(e));
    filterUnseen.addEventListener('click', (e) => filterUnseenFilms(e));
}

let films = new FilmLibrary([
    new Film("Pulp Fiction", true, dayjs('2023-03-23'), 5), 
    new Film("V per Vendetta", true, dayjs('2019-06-23'), 4),
    new Film("Bad Boys", false, undefined, 3)
]);

//test code Lab 4
function main () {
    films.print();
    console.log(films.array[1]);
    console.log(films.array[2]);
    createFilmsTable(films.array);
    enableFilters();
}

main ();