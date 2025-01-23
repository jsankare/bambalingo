import styled from 'styled-components';
import { DictionaryCard } from "../components/dictionnary/Card.tsx";

const words = [
    {
        id: 1,
        bambara: "Tiaman",
        french: "Jamais"
    },
    {
        id: 2,
        bambara: "Sini",
        french: "Demain"
    },
    {
        id: 3,
        bambara: "Kunù",
        french: "Hier"
    },
    {
        id: 4,
        bambara: "Sini",
        french: "Demain"
    },
    {
        id: 5,
        bambara: "Kunù",
        french: "Hier"
    },
    {
        id: 2,
        bambara: "Sini",
        french: "Demain"
    },
    {
        id: 3,
        bambara: "Kunù",
        french: "Hier"
    },
    {
        id: 2,
        bambara: "Sini",
        french: "Demain"
    },
    {
        id: 3,
        bambara: "Kunù",
        french: "Hier"
    }
]

const expressions = [
    {
        id: 1,
        bambara: "I ni sogoma",
        french: "Bonjour (matin)"
    },
    {
        id: 2,
        bambara: "Na n fo",
        french: "Viens me saluer"
    },
    {
        id: 3,
        bambara: "I ba ka kéné",
        french: "Comment se porte ta mère ?"
    }
]

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    text-align: center;
`;

const ContentContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`


export function DictionnaryPage() {
    return (
        <Container>
            <h2>Mots</h2>
            <ContentContainer>
                {words.map((word) => (
                    <DictionaryCard key={word.id} bambara={word.bambara} french={word.french}/>
                ))}
            </ContentContainer>
            <h2>Expressions</h2>
            <ContentContainer>
                {expressions.map((word) => (
                    <DictionaryCard key={word.id} bambara={word.bambara} french={word.french}/>
                ))}
            </ContentContainer>
        </Container>
    );
}