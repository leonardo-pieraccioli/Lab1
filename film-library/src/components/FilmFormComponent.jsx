
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useState } from "react";

function FilmForm (props) {

    

    const handleSubmit = () => {

    }

    return (
        <Container className='d-flex justify-content-center'>
        <Form md={3} onSubmit={handleSubmit} className="container justify-md-content-between bg-light p-4">
            <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Title</Form.Label>
                <Col><Form.Control type="text" minLength={2} required={true} onChange={(event) => setText(event.target.value)}></Form.Control></Col>
            </Form.Group>
             <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Watch Date</Form.Label>
                <Col><Form.Control type="date" onChange={(event) => setDate(event.target.value)}></Form.Control></Col>
            </Form.Group> 
             <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Rating</Form.Label>
                <Col><Form.Control  type="number" onChange={(event) => setDate(event.target.value)}></Form.Control></Col>
            </Form.Group> 
            <Form.Group as={Row} className='mb-3'>
                <Form.Label column>Favorite</Form.Label>
                <Col><Form.Check onChange={(event) => setName(event.target.value)}></Form.Check></Col>
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