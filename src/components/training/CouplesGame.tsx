import { useState } from 'react';
import styled from 'styled-components';
import type { Word, Expression } from '../../types/dictionnary';

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

interface PositionedItem extends Omit<Word | Expression, 'created_at' | 'updated_at'> {
    position: {
        top: number;
        left: number;
    };
    type: 'bambara' | 'french';
}

interface Props {
    items: PositionedItem[];
    onItemsChange: (items: PositionedItem[]) => void;
    onScoreChange: (delta: number) => void;
}

export function CouplesGame({ items, onItemsChange, onScoreChange }: Props) {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

        if (e.target instanceof HTMLElement) {
            const gameArea = e.currentTarget.closest('.game-area');
            if (gameArea) {
                const rect = gameArea.getBoundingClientRect();
                const x = e.clientX - rect.left - dragOffset.x;
                const y = e.clientY - rect.top - dragOffset.y;

                const [type, id] = e.currentTarget.id.split('-');

                const newItems = items.map(item => {
                    if (item.id === id && item.type === type) {
                        return {
                            ...item,
                            position: {
                                top: Math.max(0, Math.min(y, 460)),
                                left: Math.max(0, Math.min(x, 1000))
                            }
                        };
                    }
                    return item;
                });
                onItemsChange(newItems);
            }
        }
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        const sourceId = e.dataTransfer.getData('text/plain');

        if (sourceId === targetId) return;

        const [sourceType, sourceItemId] = sourceId.split('-');
        const [targetType, targetItemId] = targetId.split('-');

        if (e.target instanceof HTMLElement && e.target.classList.contains('draggable-item')) {
            if (sourceItemId === targetItemId && sourceType !== targetType) {
                const hasBoth = items.filter(item =>
                    item.id === sourceItemId
                ).length === 2;

                if (hasBoth) {
                    onScoreChange(1);
                    onItemsChange(items.filter(item => item.id !== sourceItemId));
                }
            } else {
                onScoreChange(-1);
            }
        }
    };

    return (
        <GameArea className="game-area">
            {items.map((item) => (
                <DraggableItem
                    key={`${item.type}-${item.id}`}
                    id={`${item.type}-${item.id}`}
                    className="draggable-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, `${item.type}-${item.id}`)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, `${item.type}-${item.id}`)}
                    isDragging={draggedItem === `${item.type}-${item.id}`}
                    top={item.position.top}
                    left={item.position.left}
                >
                    {item.type === 'bambara' ? item.bambara : item.french}
                </DraggableItem>
            ))}
        </GameArea>
    );
}
