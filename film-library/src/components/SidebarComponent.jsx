
import { Container, ListGroup } from "react-bootstrap";

function Sidebar (props) {
    return (
        <ListGroup variant="flush" as="ul" className="sidebar-filter">
            {
                props.filters.map( (f) => {
                    return (
                        <ListGroup.Item 
                            as="li" 
                            key={f.id} 
                            href={'#' + f.id} 
                            onClick={() => props.onSelect(f.id)}
                            action 
                            active={props.selected === f.id ? true : false}>
                                {f.label}
                        </ListGroup.Item> 
                    );
                })
            }
        </ListGroup>
    );
}

export default Sidebar;