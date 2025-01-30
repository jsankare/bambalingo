import styled from "styled-components";
import { pronunciationRules } from "../../data/lexicon";

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

const Rule = styled.span`
    font-weight: bold;
    color: #646cff;
`;

const Note = styled.p`
    font-style: italic;
    color: #666;
    margin-top: 1rem;
    font-size: 0.9rem;
`;

export function PronunciationGuide() {
    return (
        <Container>
            <Section>
                <Title>Guide de prononciation du Bambara</Title>
                <p>Le bambara utilise l'alphabet latin avec des caractères spéciaux. Voici un guide complet :</p>
            </Section>

            {pronunciationRules.map((section, index) => (
                <Section key={index}>
                    <Title>{section.title}</Title>
                    <p>{section.description}</p>

                    {section.cases.map((item, caseIndex) => (
                        <Example key={caseIndex}>
                            <p><Rule>{item.rule}</Rule> - {item.pronunciation}</p>
                            <p>Exemple: <i>{item.example}</i> ({item.translation})
                                {item.simplifiedPhonetic && ` - prononcé "${item.simplifiedPhonetic}"`}</p>
                            {item.note && <Note>{item.note}</Note>}
                        </Example>
                    ))}

                    {section.note && <Note>{section.note}</Note>}
                </Section>
            ))}
        </Container>
    );
}