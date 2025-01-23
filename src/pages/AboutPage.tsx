import styled from 'styled-components';

const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
`;

const Content = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
`;

export function AboutPage() {
    return (
        <Container>
            <Title>About Us</Title>
            <Content>
                <p>This is me templating the website.</p>
            </Content>
        </Container>
    );
}