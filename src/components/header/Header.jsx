import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="mr-auto" >Excursão</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>

              <NavItem>
                <NavLink href="/components/"><Link to="/">Home</Link></NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/components/"> <Link to="/veiculos">Veículos</Link></NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/components/"> <Link to="/excursoes">Excursões</Link></NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Header;
