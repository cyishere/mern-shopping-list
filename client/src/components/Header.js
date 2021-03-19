import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { logout } from "../slices/authSlice";
import Register from "./Register";
import Login from "./Login";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user } = useSelector((state) => state.auth);

  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const showLinks = isAuth ? (
    <>
      {isAuth && (
        <NavItem>
          <Button className="text" disabled>
            Hello, {user.name}
          </Button>
        </NavItem>
      )}
      <NavItem>
        <Button color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </NavItem>
    </>
  ) : (
    <>
      <NavItem>
        <Login />
      </NavItem>
      <NavItem>
        <Register />
      </NavItem>
    </>
  );

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <NavbarBrand href="/">Shopping List</NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {showLinks}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
