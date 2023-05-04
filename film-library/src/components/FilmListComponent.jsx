
import FilmForm from './FilmFormComponent';

import { Table, Form, Button } from "react-bootstrap";
import { useState } from "react";

function FilmList (props) {

    const [showForm, setShowForm] = useState(false);
    const [editableFilm, setEditableFilm] = useState();
    
    const calcLastId = () => {
        return Math.max(...props.films.map( f => f.id));
    }

    return (
        <>
            <h1>Filter: <span className="notbold">{props.selectedFilter}</span></h1>
            <Table striped className="below-h1">
                <tbody> 
                    {   
                    props.films.map( (f) => { 
                    return (
                        <FilmRow 
                            film={f} 
                            key={f.id} 
                            setEditableFilm={setEditableFilm}
                            setShowForm={setShowForm}/> 
                    )}) 
                }
                </tbody>
            </Table> {
                showForm ? 
                    <FilmForm
                        key={editableFilm ? editableFilm.id : -1 }
                        film={editableFilm}
                        addFilm={props.addFilm}
                        updateFilm={props.updateFilm}
                        lastId={calcLastId()}
                        cancel={ () => setShowForm(false)}/> 
                    : <Button 
                        variant="primary" size="lg" className="add-button fixed-right-bottom" 
                        onClick={ () => {setShowForm(true); setEditableFilm()}} > 
                        <i className="bi bi-plus-circle"></i> 
                    </Button>}
        </>
    );
}

function FilmRow (props) {
    let f = props.film;
    return (
        <>
            <tr>
                <td><span className={f.favorite ? 'favorite' : ''}>{f.title}</span></td>
                <td><Form.Check type="checkbox" label="Favorite" defaultChecked={f.favorite ? true : false}/></td>
                <td>{ f.watchDate ? f.watchDate.format('MMMM DD, YYYY') : '' }</td>
                <td>{ f.rating ? <Rating rating={f.rating}/> : '' }</td>
                <td>
                    <Button variant="dark" onClick={ () => {  props.setShowForm(true); props.setEditableFilm(f); } }> 
                        <i className="bi bi-pencil-square"></i> 
                    </Button>
                </td> 
            </tr> 
        </> 
    ); 
}

function Rating (props) {
    return [...Array(5)].map((el, index) =>
        <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  );
}

export default FilmList 