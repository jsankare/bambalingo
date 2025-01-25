import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #646cff20 0%, #535bf220 100%);
    border-radius: 12px;
`;

const Button = styled.button<{ active?: boolean }>`
    padding: 1.2rem 2rem;
    background-color: ${props => props.active ? '#646cff' : '#1a1a1a'};
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    border: 2px solid ${props => props.active ? '#535bf2' : 'transparent'};
    transition: all 0.3s ease;

    &:hover {
        background-color: #535bf2;
        transform: translateY(-2px);
    }
`;

interface Props {
    activeGame: 'couples' | 'fillit';
    onGameChange: (game: 'couples' | 'fillit') => void;
}

export function MainExerciseSelector({ activeGame, onGameChange }: Props) {
    return (
        <Container>
            <Button
                active={activeGame === 'couples'}
                onClick={() => onGameChange('couples')}
            >
                Couples
            </Button>
            <Button
                active={activeGame === 'fillit'}
                onClick={() => onGameChange('fillit')}
            >
                Fill It
            </Button>
        </Container>
    );
}
