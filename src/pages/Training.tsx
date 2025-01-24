import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BambaTitle } from "../components/ui/Title";
import { words } from '../data/words';
import { expressions } from '../data/expressions';

const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Content = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
    min-height: 600px;
`;

const Controls = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
`;

const Button = styled.button<{ active?: boolean }>`
    padding: 1rem 1.5rem;
    background-color: ${props => props.active ? '#646cff' : '#1a1a1a'};
    color: white;
    &:hover {
        background-color: #535bf2;
    }
`;

const Score = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

const GameArea = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 2rem;
`;

const DraggableItem = styled.div<{ top: number; left: number; isDragging?: boolean }>`
    position: absolute;
    padding: 1rem;
    background-color: ${props => props.isDragging ? '#535bf2' : '#ffffff'};
    border: 2px solid #646cff;
    border-radius: 8px;
    cursor: move;
    user-select: none;
    transition: transform 0.1s;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    min-width: 150px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #f0f0f0;
    }

    &.dragging {
        opacity: 0.5;
        transform: scale(1.05);
    }
`;

type ContentType = 'words' | 'expressions';

interface Item {
    id: number;
    bambara: string;
    french: string;
}

interface PositionedItem extends Item {
    position: {
        top: number;
        left: number;
    };
    type: 'bambara' | 'french';
}

export function TrainingPage() {
    const [contentType, setContentType] = useState<ContentType>('words');
    const [score, setScore] = useState(0);
    const [currentItems, setCurrentItems] = useState<PositionedItem[]>([]);
    const [remainingItems, setRemainingItems] = useState<Item[]>([]);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const generateRandomPosition = () => {
        return {
            top: Math.random() * 400,
            left: Math.random() * 900,
        };
    };

    const setupNewRound = () => {
        if (remainingItems.length < 4) {
            if (remainingItems.length === 0) return;
            const items = remainingItems.slice(0, remainingItems.length);
            const positionedItems: PositionedItem[] = [];

            items.forEach(item => {
                // Ensure both parts are added together
                const bambaraPos = generateRandomPosition();
                const frenchPos = generateRandomPosition();
                positionedItems.push(
                    {
                        ...item,
                        position: bambaraPos,
                        type: 'bambara'
                    },
                    {
                        ...item,
                        position: frenchPos,
                        type: 'french'
                    }
                );
            });

            setCurrentItems(positionedItems);
            setRemainingItems([]);
            return;
        }

        const items = remainingItems.slice(0, 4);
        const positionedItems: PositionedItem[] = [];

        items.forEach(item => {
            const bambaraPos = generateRandomPosition();
            const frenchPos = generateRandomPosition();
            positionedItems.push(
                {
                    ...item,
                    position: bambaraPos,
                    type: 'bambara'
                },
                {
                    ...item,
                    position: frenchPos,
                    type: 'french'
                }
            );
        });

        setCurrentItems(positionedItems);
        setRemainingItems(remainingItems.slice(4));
    };

    useEffect(() => {
        const items = contentType === 'words' ? [...words] : [...expressions];
        setRemainingItems(items.sort(() => Math.random() - 0.5));
        setCurrentItems([]);
        setScore(0);
    }, [contentType]);

    useEffect(() => {
        if (currentItems.length === 0 && remainingItems.length > 0) {
            setupNewRound();
        }
    }, [currentItems, remainingItems]);

    const handleDragStart = (e: React.DragEvent, itemId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setDraggedItem(itemId);
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.setData('text/plain', itemId);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('dragging');
        setDraggedItem(null);

        // Handle free movement
        if (e.target instanceof HTMLElement) {
            const gameArea = e.currentTarget.closest('.game-area');
            if (gameArea) {
                const rect = gameArea.getBoundingClientRect();
                const x = e.clientX - rect.left - dragOffset.x;
                const y = e.clientY - rect.top - dragOffset.y;

                const [type, id] = e.currentTarget.id.split('-');

                setCurrentItems(prev => prev.map(item => {
                    if (item.id.toString() === id && item.type === type) {
                        return {
                            ...item,
                            position: {
                                top: Math.max(0, Math.min(y, 460)),
                                left: Math.max(0, Math.min(x, 1000))
                            }
                        };
                    }
                    return item;
                }));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        const sourceId = e.dataTransfer.getData('text/plain');

        if (sourceId === targetId) return;

        const [sourceType, sourceItemId] = sourceId.split('-');
        const [targetType, targetItemId] = targetId.split('-');

        // Check if it's a match attempt
        if (e.target instanceof HTMLElement && e.target.classList.contains('draggable-item')) {
            if (sourceItemId === targetItemId && sourceType !== targetType) {
                // Ensure both parts exist before removing
                const hasBoth = currentItems.filter(item =>
                    item.id.toString() === sourceItemId
                ).length === 2;

                if (hasBoth) {
                    setScore(prev => prev + 1);
                    setCurrentItems(prev => prev.filter(item =>
                        item.id.toString() !== sourceItemId
                    ));
                }
            } else {
                setScore(prev => prev - 1);
            }
        }
    };

    return (
        <Container>
            <BambaTitle title="Entrainements"/>
            <Content>
                <Controls>
                    <Button
                        active={contentType === 'words'}
                        onClick={() => setContentType('words')}
                    >
                        Mots
                    </Button>
                    <Button
                        active={contentType === 'expressions'}
                        onClick={() => setContentType('expressions')}
                    >
                        Expressions
                    </Button>
                </Controls>

                <Score>Score: {score}</Score>

                {currentItems.length > 0 && (
                    <GameArea className="game-area">
                        {currentItems.map((item) => (
                            <DraggableItem
                                key={`${item.type}-${item.id}`}
                                id={`${item.type}-${item.id}`}
                                className="draggable-item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, `${item.type}-${item.id}`)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, `${item.type}-${item.id}`)}
                                isDragging={draggedItem === `${item.type}-${item.id}`}
                                top={item.position.top}
                                left={item.position.left}
                            >
                                {item.type === 'bambara' ? item.bambara : item.french}
                            </DraggableItem>
                        ))}
                    </GameArea>
                )}

                {currentItems.length === 0 && remainingItems.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <h2>Félicitations !</h2>
                        <p>Vous avez terminé tous les {contentType === 'words' ? 'mots' : 'expressions'}.</p>
                        <p>Score final : {score}</p>
                        <Button onClick={() => setContentType(contentType === 'words' ? 'expressions' : 'words')}>
                            Essayer les {contentType === 'words' ? 'expressions' : 'mots'}
                        </Button>
                    </div>
                )}
            </Content>
        </Container>
    );
}
