import styled from 'styled-components';
import { BambaButton } from "../components/ui/buttons/Button";
import { BambaTitle } from "../components/ui/Title.tsx";

const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const Content = styled.div`
    background-color: white;
    color: black;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export function HomePage() {
    return (
        <Container>
            <BambaTitle title="Accueil"/>
            <Content>
                <p>This is the home page of our application. Feel free to explore!</p>
                <BambaButton link="/about" text="About Us" />
            </Content>
        </Container>
    );
}