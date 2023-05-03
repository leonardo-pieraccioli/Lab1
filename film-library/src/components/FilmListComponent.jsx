
import { Col, Table, Form } from "react-bootstrap";

function FilmList (props) {
    return (
        <>
            <h1>Filter: <span className="notbold">{props.selectedFilter}</span></h1>
            <Table striped className="below-h1">
                <tbody>
                { props.films.map( (f) => { return (<FilmRow film={f} key={f.id}/> ) } ) }
                </tbody>
            </Table>
        </>
    );
}

function FilmRow (props) {
    let f = props.film;
    return (
        <>
            <tr>
                <td><span className={f.favorite ? 'favorite' : ''}>{f.title}</span></td>
                <td>
                    <Form.Check type="checkbox" label="Favorite" defaultChecked={f.favorite ? true : false}/>
                </td>
                <td>
                    { f.watchDate ? f.watchDate.format('MMMM DD, YYYY') : '' }
                </td>
                <td>
                    { f.rating ? <Rating rating={f.rating}/> : '' }
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