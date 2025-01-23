import styled from "styled-components";

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
`;

const Section = styled.div`
    margin-bottom: 2rem;
    text-align: left;
`;

const Title = styled.h3`
    color: #646cff;
    margin-bottom: 1rem;
`;

const Example = styled.div`
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem 0;
`;

const Letter = styled.span`
    font-weight: bold;
    color: #646cff;
`;

const pronunciationGuideData = [
    {
        letter: "ɛ",
        pronunciation: "le 'è' en français",
        example: "dɛmɛ",
        translation: "aide",
        pronunciationExample: "dèmè"
    },
    {
        letter: "ɔ",
        pronunciation: "le 'o' ouvert en français",
        example: "kɔnɔ",
        translation: "oiseau",
        pronunciationExample: "kono"
    },
    {
        letter: "ŋ",
        pronunciation: "le 'ng' en anglais",
        example: "ŋɔmi",
        translation: "miel",
        pronunciationExample: "ngomi"
    }
];

export function PronunciationGuide() {
    return (
        <Container>
            <Section>
                <Title>Guide de prononciation du Bambara</Title>
                <p>Le bambara utilise l'alphabet latin avec quelques caractères spéciaux. Voici quelques exemples :</p>
            </Section>

            <Section>
                <Title>Lettres spéciales</Title>
                {pronunciationGuideData.map((data, index) => (
                    <Example key={index}>
                        <p><Letter>{data.letter}</Letter> - se prononce comme {data.pronunciation}</p>
                        <p>Exemple: <i>{data.example}</i> ({data.translation}) - prononcé "{data.pronunciationExample}"</p>
                    </Example>
                ))}
            </Section>
        </Container>
    );
}
