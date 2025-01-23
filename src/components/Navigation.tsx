import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
    background-color: #333;
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
    justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    &.active {
        color: #646cff;
        font-weight: bold;
    }
    &:hover {
        color: #535bf2;
    }
`;

export function Navigation() {
    return (
        <Nav>
            <NavList>
                <li><StyledNavLink to="/">Accueil</StyledNavLink></li>
                <li><StyledNavLink to="/lexicon">Lexique</StyledNavLink></li>
                <li><StyledNavLink to="/training">Entrainements</StyledNavLink></li>
                <li><StyledNavLink to="/about">A propos</StyledNavLink></li>
            </NavList>
        </Nav>
    );
}