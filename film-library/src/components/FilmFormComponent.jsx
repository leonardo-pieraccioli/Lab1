
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useState } from "react";
import dayjs from "dayjs";

function FilmForm (props) {

    const [id, setId] = useState(props.film ? props.film.id : props.lastId + 1);
    const [title, setTitle] = useState(props.film ? props.film.title : '');
    const [watchDate, setWatchDate] = useState(props.film ? dayjs(props.film.watchDate).format('YYYY-MM-DD') : undefined);
    const [rating, setRating] = useState(props.film ? props.film.rating : undefined);
    const [favorite, setFavorite] = useState(props.film ? props.film.favorite : false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const film = {"id": id, "title": title, "favorite": favorite, "rating": rating};

        console.log(watchDate);
        if (watchDate)
            film.watchDate = dayjs(watchDate);

        if (props.film) {
            props.updateFilm(film);
        } else {
            props.addFilm(film);
        }
        props.cancel();
    }

    return (
        <Container className='d-flex justify-content-center'>
        <Form md={3} onSubmit={handleSubmit} className="container justify-md-content-between bg-light p-4">
            <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Title</Form.Label>
                <Col><Form.Control type="text" value={title} minLength={2} required={true} onChange={(event) => setTitle(event.target.value)}></Form.Control></Col>
            </Form.Group>
             <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Watch Date</Form.Label>
                <Col><Form.Control type="date" value={watchDate} onChange={(event) => setWatchDate(event.target.value)}></Form.Control></Col>
            </Form.Group> 
             <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Rating</Form.Label>
                <Col><Form.Control  type="number" value={rating}  onChange={(event) => setRating(event.target.value)}></Form.Control></Col>
            </Form.Group> 
            <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Favorite</Form.Label>
                <Col><Form.Check type="switch" checked={favorite} onChange={(event) => setFavorite(event.target.checked)}></Form.Check></Col>
            </Form.Group> 
            <Container className='d-flex justify-content-center'>
                <Button variant="primary" type="submit" className="form-button-add">Add</Button> 
                <Button variant="danger" onClick={props.cancel}>Cancel</Button>
            </Container>
        </Form>
        </Container>
    );
}

export default FilmForm;