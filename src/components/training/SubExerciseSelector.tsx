import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0 2rem;
    justify-content: center;
    padding: 0.8rem;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const Button = styled.button<{ active?: boolean }>`
    padding: 0.8rem 1.5rem;
    background-color: ${props => props.active ? '#646cff' : '#ffffff'};
    color: ${props => props.active ? 'white' : '#1a1a1a'};
    border: 1px solid ${props => props.active ? '#535bf2' : '#e0e0e0'};
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.active ? '#535bf2' : '#f0f0f0'};
    }
`;

interface Props {
    activeContent: 'words' | 'expressions';
    onContentChange: (content: 'words' | 'expressions') => void;
}

export function SubExerciseSelector({ activeContent, onContentChange }: Props) {
    return (
        <Container>
            <Button
                active={activeContent === 'words'}
                onClick={() => onContentChange('words')}
            >
                Mots
            </Button>
            <Button
                active={activeContent === 'expressions'}
                onClick={() => onContentChange('expressions')}
            >
                Expressions
            </Button>
        </Container>
    );
}
