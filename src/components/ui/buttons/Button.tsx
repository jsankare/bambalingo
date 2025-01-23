import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ButtonProps } from '../../../types';

const Wrapper = styled.div`
    padding: 1rem;
    background-color: #333;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 0 auto;
    max-width: 200px;
    cursor: pointer;
    &:hover {
        background-color: #535bf2;
    }
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
        color: white;
    }
`;

export function BambaButton({ link, text }: ButtonProps) {
    return (
        <Wrapper>
            <StyledNavLink to={link}>{text}</StyledNavLink>
        </Wrapper>
    );
}