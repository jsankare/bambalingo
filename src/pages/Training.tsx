import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BambaTitle } from "../components/ui/Title";
import { MainExerciseSelector } from '../components/training/MainExerciseSelector';
import { SubExerciseSelector } from '../components/training/SubExerciseSelector';
import { CouplesGame } from '../components/training/CouplesGame';
import { FillItGame } from '../components/training/FillItGame';
import { words } from '../data/words';
import { expressions } from '../data/expressions';
import { sentences } from '../data/sentences';
import type { Word, Expression } from '../types/dictionnary';

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

const Score = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #646cff;
`;

const EndMessage = styled.div`
    text-align: center;
    margin-top: 2rem;
`;

interface PositionedItem extends Omit<Word | Expression, 'created_at' | 'updated_at'> {
    position: {
        top: number;
        left: number;
    };
    type: 'bambara' | 'french';
}

type GameType = 'couples' | 'fillit';
type ContentType = 'words' | 'expressions';

export function TrainingPage() {
    const [gameType, setGameType] = useState<GameType>('couples');
    const [contentType, setContentType] = useState<ContentType>('words');
    const [score, setScore] = useState(0);
    const [currentItems, setCurrentItems] = useState<PositionedItem[]>([]);
    const [remainingItems, setRemainingItems] = useState<(Word | Expression)[]>([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [shuffledSentences, setShuffledSentences] = useState(sentences);

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

    useEffect(() => {
        if (gameType === 'couples') {
            const items = contentType === 'words' ? [...words] : [...expressions];
            setRemainingItems(items.sort(() => Math.random() - 0.5));
            setCurrentItems([]);
        } else {
            setShuffledSentences([...sentences].sort(() => Math.random() - 0.5));
            setCurrentSentenceIndex(0);
        }
        setScore(0);
    }, [contentType, gameType]);

    useEffect(() => {
        if (gameType === 'couples' && currentItems.length === 0 && remainingItems.length > 0) {
            setupNewRound();
        }
    }, [currentItems, remainingItems]);

    const handleFillItComplete = (correct: boolean) => {
        setScore(prev => prev + (correct ? 1 : -1));
        if (correct) {
            setCurrentSentenceIndex(prev => prev + 1);
        }
    };

    const currentSentence = shuffledSentences[currentSentenceIndex];
    const isGameComplete = (gameType === 'couples' && currentItems.length === 0 && remainingItems.length === 0) ||
        (gameType === 'fillit' && currentSentenceIndex >= shuffledSentences.length);

    return (
        <Container>
            <BambaTitle title="Entrainements"/>
            <Content>
                <MainExerciseSelector
                    activeGame={gameType}
                    onGameChange={setGameType}
                />

                {gameType === 'couples' && (
                    <SubExerciseSelector
                        activeContent={contentType}
                        onContentChange={setContentType}
                    />
                )}

                <Score>Score: {score}</Score>

                {!isGameComplete && gameType === 'couples' && currentItems.length > 0 && (
                    <CouplesGame
                        items={currentItems}
                        onItemsChange={setCurrentItems}
                        onScoreChange={(delta) => setScore(prev => Math.max(0, prev + delta))}
                    />
                )}

                {!isGameComplete && gameType === 'fillit' && currentSentence && (
                    <FillItGame
                        sentence={currentSentence.bambara}
                        translation={currentSentence.french}
                        onComplete={handleFillItComplete}
                    />
                )}

                {isGameComplete && (
                    <EndMessage>
                        <h2>Félicitations !</h2>
                        <p>Vous avez terminé tous les {gameType === 'couples' ?
                            (contentType === 'words' ? 'mots' : 'expressions') :
                            'phrases'}.</p>
                        <p>Score final : {score}</p>
                        {gameType === 'couples' && (
                            <button onClick={() => setContentType(contentType === 'words' ? 'expressions' : 'words')}>
                                Essayer les {contentType === 'words' ? 'expressions' : 'mots'}
                            </button>
                        )}
                    </EndMessage>
                )}
            </Content>
        </Container>
    );
}
