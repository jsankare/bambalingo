import styled from 'styled-components';
import { BambaTitle } from "../components/ui/Title.tsx";

const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const Content = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
`;

export function TrainingPage() {
    return (
        <Container>
            <BambaTitle title="Entrainements"/>
            <Content>
                <p>On s'entraine !</p>
            </Content>
        </Container>
    );
}