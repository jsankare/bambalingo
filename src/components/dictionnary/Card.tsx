import styled from "styled-components";
import { DictionaryCardProps } from "../../types/dictionnary.ts";

const Bambara = styled.h3`
    margin: 0;
    transition: all 0.2s;
`

const French = styled.p`
    margin: 0;
    transition: all 0.2s;
`

const Wrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 1.5rem;
    transition: all 0.5s;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    &:hover {
        transform: translateY(-0.5rem);
        > ${Bambara} {
            background: linear-gradient(to right, #009900 0%, #009900 33%, #FFFF00 33%, #FFFF00 67%, #FF0000 67%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
`

export const DictionaryCard = ({ french, bambara }: DictionaryCardProps) => {
    return (
        <Wrapper>
            <Bambara>{bambara}</Bambara>
            <French>{french}</French>
        </Wrapper>
    )
}