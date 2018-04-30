import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Input,
    Form,
    Button
} from 'reactstrap';
import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSearchUrl = this.getSearchUrl.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            isOpen: false,
            searchBar: '',
            redirect: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange(event) {
        this.setState({ searchBar: event.target.value });
    }
    getSearchUrl() {
        const url = "/search?search="
        return url + encodeURI(this.state.searchBar)
    }
    submit(e) {
        e.preventDefault(); 
        // window.location= "http://"+window.location.hostname+":"+window.location.port+this.getSearchUrl()
        withRouter(({ history }) => (history.push('/new-location')))
    }

    render() {
        return (
            <div>
                <Navbar color="dark" className="navbar-dark" light expand="md">
                    <NavbarBrand tag={Link} to="/">React Thing</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Form inline onSubmit={this.submit} >
                                    <FormGroup>
                                        <Input placeholder="Search iTunes" value={this.state.searchBar} onChange={this.handleChange} />
                                        <Link to={this.getSearchUrl()}>
                                            <Button outline color="primary">Search</Button>
                                        </Link>
                                    </FormGroup>
                                </Form>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/tictactoe">TicTacToe</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                  </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
