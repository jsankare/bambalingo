import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Word } from '../../types/dictionnary';

const Container = styled.div`
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

interface Props {
    sentence: string;
    translation: string;
    onComplete: (correct: boolean) => void;
}

export function FillItGame({ sentence, translation, onComplete }: Props) {
    const [words, setWords] = useState<Word[]>([]);
    const [shuffledWordBank, setShuffledWordBank] = useState<Word[]>([]);
    const [userInputs, setUserInputs] = useState<string[]>([]);
    const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Split sentence into words, preserving punctuation
        const wordMatches = sentence.match(/[\wɛɔŋ]+|[^\s\wɛɔŋ]+/g) || [];
        const newWords = wordMatches.map((word, index) => ({
            id: `word-${index}`,
            bambara: word,
            french: '', // We don't need translations for individual words
            created_at: '',
            updated_at: ''
        }));

        // Create and shuffle the word bank once
        const wordBankWords = newWords.filter(word => !/[^\wɛɔŋ]/.test(word.bambara));
        const shuffled = [...wordBankWords].sort(() => Math.random() - 0.5);

        setWords(newWords);
        setShuffledWordBank(shuffled);
        setUserInputs(Array(newWords.length).fill(''));
        setUsedWords(new Set());
        setErrorMessage('');
    }, [sentence]);

    const handleWordSelect = (word: Word, index: number) => {
        if (usedWords.has(word.id)) return;

        setUserInputs(prev => {
            const newInputs = [...prev];
            newInputs[index] = word.bambara;
            return newInputs;
        });

        setUsedWords(prev => {
            const newSet = new Set(prev);
            newSet.add(word.id);
            return newSet;
        });

        setErrorMessage('');
    };

    const handleRemoveWord = (index: number) => {
        const word = words[index];
        if (!word) return;

        setUserInputs(prev => {
            const newInputs = [...prev];
            newInputs[index] = '';
            return newInputs;
        });

        setUsedWords(prev => {
            const newSet = new Set(prev);
            newSet.delete(word.id);
            return newSet;
        });

        setErrorMessage('');
    };

    const checkAnswers = () => {
        const correct = words.every(
            (word, index) => word.bambara === userInputs[index]
        );

        if (!correct) {
            setErrorMessage(`Incorrect words: ${words.map((word, index) =>
                word.bambara !== userInputs[index] ? word.bambara : null
            ).filter(Boolean).join(', ')}`);
        }

        onComplete(correct);
    };

    return (
        <Container>
            <div>
                <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                    Traduisez en Bambara : <strong>{translation}</strong>
                </p>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <SentenceContainer>
                    {userInputs.map((input, index) => (
                        <WordInput
                            key={index}
                            value={input}
                            readOnly
                            placeholder={/[^\wɛɔŋ]/.test(words[index]?.bambara || '') ? words[index]?.bambara : '______'}
                            style={{
                                cursor: input !== '' ? 'pointer' : 'auto',
                                width: /[^\wɛɔŋ]/.test(words[index]?.bambara || '') ? '40px' : '120px'
                            }}
                            onClick={() => handleRemoveWord(index)}
                        />
                    ))}
                </SentenceContainer>
                <WordBank>
                    {shuffledWordBank.map((word) => (
                        <WordOption
                            key={word.id}
                            onClick={() => {
                                const index = userInputs.findIndex(input => input === '');
                                if (index !== -1) handleWordSelect(word, index);
                            }}
                            used={usedWords.has(word.id)}
                        >
                            {word.bambara}
                        </WordOption>
                    ))}
                </WordBank>
                <NextButton
                    onClick={checkAnswers}
                    disabled={userInputs.includes('')}
                >
                    Vérifier
                </NextButton>
            </div>
        </Container>
    );
}
