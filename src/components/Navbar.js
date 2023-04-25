import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from "../auth/actions/userActions";
import { connect } from "react-redux";
import {useNavigate} from 'react-router-dom';

function NavigationBar({logoutUser}) {
    const history = useNavigate();
    return (
        <Navbar bg='dark' variant='dark' fixed='top'>
            <Container>
                <Navbar.Brand>P A R K W I S E</Navbar.Brand>
                <Navbar.Toggle aria-controls="website-navbar" />
                <Navbar.Collapse id="website-navbar" className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="../mappage">H O M E</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#" >S U P P O R T</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="../" onClick={logoutUser(history)}>L O G O U T</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default connect(null, {logoutUser})(NavigationBar);
// export default NavigationBar;