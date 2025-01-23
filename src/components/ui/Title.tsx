import styled from "styled-components";
import { Title } from "../../types";

const StyledTitle = styled.h1`
    color: #a1a1a1;
    text-align: center;
`;

export const BambaTitle = ({ title }: Title) => {
    return (
        <StyledTitle>{title}</StyledTitle>
    );
}