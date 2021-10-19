import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

export default function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>SE Helper</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">

                            <LinkContainer to='/portfolio'>
                                <Nav.Link >My Portfolio</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='admin-menu'>
                                    <LinkContainer to='/admin/user-list'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/portfolio-list'>
                                        <NavDropdown.Item>Portfolio List</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/wishlist-list'>
                                        <NavDropdown.Item>Wishlist List</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}