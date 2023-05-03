
import { Nav, Navbar, Container, Form, Image, Button } from "react-bootstrap";

function NavComp (props) {
    return (
        <Navbar bg="primary" variant="dark">
            <Container fluid className="justify-content-between">
                <Navbar.Brand href="#"> <i className="bi bi-collection-play navbar-icon-size"/> Film Library</Navbar.Brand>
                <NavSearchBar></NavSearchBar>
                <NavProfile></NavProfile>
            </Container>
        </Navbar>
    );
};

function NavSearchBar (props) {
    return (
        <Form>
            <Form.Control type="email" placeholder="Search for a film"></Form.Control>
        </Form>
    );
}

function NavProfile (props) {
    return (
        <Button>
            <i className="bi bi-person-circle navbar-icon-size"></i>
        </Button>
    );
}

export default NavComp;