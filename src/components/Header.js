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

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSearchUrl = this.getSearchUrl.bind(this);
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
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("pressed")
            this.props.history.push("/")
        }
    }
    render() {
        return (
            <div>
                <Navbar color="dark" className="navbar-dark" light expand="md">
                    <NavbarBrand tag={Link} to="/">Itunes Thing</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Form inline>
                                    <FormGroup>
                                        <Input placeholder="Search iTunes" onKeyPress={this._handleKeyPress} value={this.state.searchBar} onChange={this.handleChange} />
                                        <Button href={this.getSearchUrl()} color="secondary">Search</Button>
                                        {/* <Link to={this.getSearchUrl()}>
                                            <Button outline color="primary">Search</Button>
                                        </Link> */}
                                    </FormGroup>
                                </Form>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/RHCP">RHCP</NavLink>
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
