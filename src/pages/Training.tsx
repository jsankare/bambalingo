import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BambaTitle } from "../components/ui/Title";
import { words } from '../data/words';
import { expressions } from '../data/expressions';
import { sentences } from '../data/sentences';
import type { Word, Expression, Sentence } from '../types/dictionnary';

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

const MainExerciseSelector = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #646cff20 0%, #535bf220 100%);
    border-radius: 12px;
`;

const MainExerciseButton = styled.button<{ active?: boolean }>`
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

const SubExerciseSelector = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0 2rem;
    justify-content: center;
    padding: 0.8rem;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const SubExerciseButton = styled.button<{ active?: boolean }>`
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

const Score = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #646cff;
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

const FillItContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SentenceContainer = styled.div`
    font-size: 1.2rem;
    line-height: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
`;

const WordInput = styled.input`
    padding: 0.5rem;
    border: 2px solid #646cff;
    border-radius: 4px;
    font-size: 1rem;
    width: 120px;
    margin: 0 0.25rem;

    &:focus {
        outline: none;
        border-color: #535bf2;
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
    }
`;

const WordBank = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
`;

const WordOption = styled.button<{ used?: boolean }>`
    padding: 0.5rem 1rem;
    background-color: ${props => props.used ? '#e0e0e0' : '#ffffff'};
    border: 1px solid #646cff;
    border-radius: 4px;
    cursor: ${props => props.used ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.used ? 0.5 : 1};
    color: blue;

    &:hover {
        background-color: ${props => props.used ? '#e0e0e0' : '#f0f0f0'};
    }
`;

const NextButton = styled.button`
    padding: 1rem 2rem;
    background-color: #646cff;
    color: black;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    cursor: pointer;
    margin-top: 2rem;

    &:hover {
        background-color: #535bf2;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;

type GameType = 'couples' | 'fillit';
type ContentType = 'words' | 'expressions';

interface PositionedItem extends Omit<Word | Expression, 'created_at' | 'updated_at'> {
    position: {
        top: number;
        left: number;
    };
    type: 'bambara' | 'french';
}

interface FillItState {
    currentSentence: Sentence | null;
    userInputs: string[];
    wordsOrder: string[];
    wordOptions: Word[];
    usedWords: Set<string>;
    remainingSentences: Sentence[];
}

export function TrainingPage() {
    const [gameType, setGameType] = useState<GameType>('couples');
    const [contentType, setContentType] = useState<ContentType>('words');
    const [score, setScore] = useState(0);
    const [currentItems, setCurrentItems] = useState<PositionedItem[]>([]);
    const [remainingItems, setRemainingItems] = useState<(Word | Expression)[]>([]);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [fillItState, setFillItState] = useState<FillItState>({
        currentSentence: null,
        userInputs: [],
        wordsOrder: [],
        wordOptions: [],
        usedWords: new Set(),
        remainingSentences: []
    });
    const [errorMessage, setErrorMessage] = useState('');

    const generateRandomPosition = () => ({
        top: Math.random() * 400,
        left: Math.random() * 900,
    });

    const setupNewRound = () => {
        if (remainingItems.length === 0) return;

        const itemCount = Math.min(4, remainingItems.length);
        const items = remainingItems.slice(0, itemCount);
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
        setRemainingItems(remainingItems.slice(itemCount));
    };

    const setupNewFillItRound = () => {
        if (fillItState.remainingSentences.length === 0) return;

        const nextSentence = fillItState.remainingSentences[0];
        const scrambledWords = nextSentence.words.slice();
        for (let i = scrambledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scrambledWords[i], scrambledWords[j]] = [scrambledWords[j], scrambledWords[i]];
        }

        const scrambledWordOptions = scrambledWords.slice();
        for (let i = scrambledWordOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scrambledWordOptions[i], scrambledWordOptions[j]] = [scrambledWordOptions[j], scrambledWordOptions[i]];
        }

        setFillItState(prev => ({
            ...prev,
            currentSentence: nextSentence,
            userInputs: Array(scrambledWords.length).fill(''),
            wordsOrder: scrambledWords.map(word => word.bambara),
            wordOptions: scrambledWordOptions.map(option => ({ ...option, used: false })),
            usedWords: new Set(),
            remainingSentences: prev.remainingSentences.slice(1)
        }));
    };

    useEffect(() => {
        if (gameType === 'couples') {
            const items = contentType === 'words' ? [...words] : [...expressions];
            setRemainingItems(items.sort(() => Math.random() - 0.5));
            setCurrentItems([]);
        } else {
            setFillItState({
                currentSentence: null,
                userInputs: [],
                wordsOrder: [],
                wordOptions: [],
                usedWords: new Set(),
                remainingSentences: [...sentences].sort(() => Math.random() - 0.5)
            });
        }
        setScore(0);
    }, [contentType, gameType]);

    useEffect(() => {
        if (gameType === 'couples' && currentItems.length === 0 && remainingItems.length > 0) {
            setupNewRound();
        } else if (gameType === 'fillit' && !fillItState.currentSentence && fillItState.remainingSentences.length > 0) {
            setupNewFillItRound();
        }
    }, [currentItems, remainingItems, gameType, fillItState.currentSentence, fillItState.remainingSentences]);

    const handleWordSelect = (word: Word, index: number) => {
        if (fillItState.usedWords.has(word.id)) return;

        const wordBambara = word.bambara;
        const correctIndex = fillItState.wordsOrder.indexOf(wordBambara);

        setFillItState(prev => {
            const newInputs = [...prev.userInputs];
            newInputs[index] = wordBambara;

            const newUsedWords = new Set(prev.usedWords);
            newUsedWords.add(word.id);

            const wordOptions = [...prev.wordOptions];
            const wordToRemove = wordOptions.find(option => option.id === word.id);
            if (wordToRemove) {
                wordToRemove.used = true;
            }

            return {
                ...prev,
                userInputs: newInputs,
                usedWords: newUsedWords,
                wordOptions: wordOptions
            };
        });
        setErrorMessage('');
    };

    const handleRemoveWord = (index: number) => {
        setFillItState(prev => {
            const newInputs = [...prev.userInputs];
            newInputs[index] = '';

            const newUsedWords = new Set(prev.usedWords);
            const word = prev.currentSentence?.words.find((word, i) => i === index);
            if (word) {
                newUsedWords.delete(word.id);
            }

            const wordOptions = [...prev.wordOptions];
            const wordToRemove = wordOptions.find(option => option.id === word?.id);
            if (wordToRemove) {
                wordToRemove.used = false;
            }

            return {
                ...prev,
                userInputs: newInputs,
                usedWords: newUsedWords,
                wordOptions: wordOptions
            };
        });
        setErrorMessage('');
    };

    const checkAnswers = () => {
        if (!fillItState.currentSentence) return;

        const correct = fillItState.currentSentence.words.every(
            (word, index) => word.bambara === fillItState.userInputs[index]
        );

        if (!correct) {
            setScore(prev => Math.max(0, prev - 1));
            setErrorMessage(`Incorrect words: ${fillItState.currentSentence.words.map((word, index) =>
                word.bambara !== fillItState.userInputs[index] ? word.bambara : null
            ).filter(Boolean).join(', ')}`);
        } else {
            setScore(prev => prev + 1);
            setErrorMessage('');
            setupNewFillItRound();
        }
    };

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

                setCurrentItems(prev => prev.map(item => {
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

        if (e.target instanceof HTMLElement && e.target.classList.contains('draggable-item')) {
            if (sourceItemId === targetItemId && sourceType !== targetType) {
                const hasBoth = currentItems.filter(item =>
                    item.id === sourceItemId
                ).length === 2;

                if (hasBoth) {
                    setScore(prev => prev + 1);
                    setCurrentItems(prev => prev.filter(item =>
                        item.id !== sourceItemId
                    ));
                }
            } else {
                setScore(prev => Math.max(0, prev - 1));
            }
        }
    };

    return (
        <Container>
            <BambaTitle title="Entrainements"/>
            <Content>
                <MainExerciseSelector>
                    <MainExerciseButton
                        active={gameType === 'couples'}
                        onClick={() => setGameType('couples')}
                    >
                        Couples
                    </MainExerciseButton>
                    <MainExerciseButton
                        active={gameType === 'fillit'}
                        onClick={() => setGameType('fillit')}
                    >
                        Fill It
                    </MainExerciseButton>
                </MainExerciseSelector>

                {gameType === 'couples' && (
                    <SubExerciseSelector>
                        <SubExerciseButton
                            active={contentType === 'words'}
                            onClick={() => setContentType('words')}
                        >
                            Mots
                        </SubExerciseButton>
                        <SubExerciseButton
                            active={contentType === 'expressions'}
                            onClick={() => setContentType('expressions')}
                        >
                            Expressions
                        </SubExerciseButton>
                    </SubExerciseSelector>
                )}

                <Score>Score: {score}</Score>

                {gameType === 'couples' && currentItems.length > 0 && (
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

                {gameType === 'fillit' && fillItState.currentSentence && (
                    <FillItContainer>
                        <div>
                            <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                                Traduisez en Bambara : <strong>{fillItState.currentSentence.french}</strong>
                            </p>
                            {errorMessage && (
                                <ErrorMessage>{errorMessage}</ErrorMessage>
                            )}
                            <SentenceContainer>
                                {fillItState.userInputs.map((input, index) => (
                                    <WordInput
                                        key={index}
                                        value={input}
                                        readOnly
                                        placeholder="______"
                                        style={{
                                            cursor: input !== '' ? 'pointer' : 'auto'
                                        }}
                                        onClick={() => handleRemoveWord(index)}
                                    />
                                ))}
                            </SentenceContainer>
                            <WordBank>
                                {fillItState.wordOptions.map((word) => (
                                    <WordOption
                                        key={word.id}
                                        onClick={() => {
                                            const index = fillItState.userInputs.findIndex(input => input === '');
                                            if (index !== -1) handleWordSelect(word, index);
                                        }}
                                        used={word.used}
                                    >
                                        {word.bambara}
                                    </WordOption>
                                ))}
                            </WordBank>
                            <NextButton
                                onClick={checkAnswers}
                                disabled={fillItState.userInputs.includes('')}
                            >
                                Vérifier
                            </NextButton>
                        </div>
                    </FillItContainer>
                )}

                {((gameType === 'couples' && currentItems.length === 0 && remainingItems.length === 0) ||
                    (gameType === 'fillit' && !fillItState.currentSentence && fillItState.remainingSentences.length === 0)) && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <h2>Félicitations !</h2>
                        <p>Vous avez terminé tous les {gameType === 'couples' ? (contentType === 'words' ? 'mots' : 'expressions') : 'phrases'}.</p>
                        <p>Score final : {score}</p>
                        {gameType === 'couples' && (
                            <SubExerciseButton onClick={() => setContentType(contentType === 'words' ? 'expressions' : 'words')}>
                                Essayer les {contentType === 'words' ? 'expressions' : 'mots'}
                            </SubExerciseButton>
                        )}
                    </div>
                )}
            </Content>
        </Container>
    );
}
