import { useState, useMemo } from "react";
import styled from "styled-components";
import { DictionaryCard } from "../components/dictionnary/Card";
import { PronunciationGuide } from "../components/dictionnary/PronunciationGuide";
import { BambaTitle } from "../components/ui/Title";

const words = [
    { id: 1, bambara: "Tiaman", french: "Jamais" },
    { id: 2, bambara: "Sini", french: "Demain" },
    { id: 3, bambara: "Kunù", french: "Hier" },
    { id: 4, bambara: "Bi", french: "Aujourd'hui" },
    { id: 5, bambara: "Dɔgɔ", french: "Petit" },
    { id: 6, bambara: "Ba", french: "Grand" },
    { id: 7, bambara: "Ji", french: "Eau" },
    { id: 8, bambara: "Dumuni", french: "Nourriture" },
    { id: 9, bambara: "Mɔgɔ", french: "Personne" },
    { id: 10, bambara: "So", french: "Maison" }
];

const expressions = [
    { id: 1, bambara: "I ni sogoma", french: "Bonjour (matin)" },
    { id: 2, bambara: "Na n fo", french: "Viens me saluer" },
    { id: 3, bambara: "I ba ka kéné", french: "Comment se porte ta mère ?" },
    { id: 4, bambara: "K'i ni su", french: "Bonsoir" },
    { id: 5, bambara: "I ni ce", french: "Merci" },
    { id: 6, bambara: "Ka sɔrɔ ka taa", french: "Au revoir" },
    { id: 7, bambara: "I dankɛra", french: "S'il te plaît" },
    { id: 8, bambara: "N tɛ a fɛ", french: "Je ne veux pas" },
    { id: 9, bambara: "N bɛ taa", french: "Je m'en vais" },
    { id: 10, bambara: "I ka kɛnɛ?", french: "Comment vas-tu ?" }
];

const Wrapper = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center
`;

const Controls = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
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

const FilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const Input = styled.input`
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid #646cff;
    background-color: transparent;
    color: inherit;
`;

const Select = styled.select`
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid #646cff;
    background-color: transparent;
    color: inherit;
`;

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const Pagination = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 2rem;
`;

const PageButton = styled(Button)`
    min-width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type ContentType = 'words' | 'expressions' | 'pronunciation';
type SortDirection = 'asc' | 'desc';
type SortField = 'bambara' | 'french';

const ITEMS_PER_PAGE = 9;

export function LexiconPage() {
    const [contentType, setContentType] = useState<ContentType>('pronunciation');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('bambara');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAndSortedContent = useMemo(() => {
        if (contentType === 'pronunciation') return [];
        const content = contentType === 'words' ? words : expressions;

        return content
            .filter(item =>
                item.bambara.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.french.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const compareResult = a[sortField].localeCompare(b[sortField]);
                return sortDirection === 'asc' ? compareResult : -compareResult;
            });
    }, [contentType, searchTerm, sortField, sortDirection]);

    const totalPages = Math.ceil(filteredAndSortedContent.length / ITEMS_PER_PAGE);
    const paginatedContent = filteredAndSortedContent.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, contentType, sortField, sortDirection]);

    return (
        <Wrapper>
            <BambaTitle title="Lexique"/>

            <Controls>
                <Button
                    active={contentType === 'pronunciation'}
                    onClick={() => setContentType('pronunciation')}
                >
                    Prononciation
                </Button>
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

            {contentType === 'pronunciation' ? (
                <PronunciationGuide />
            ) : (
                <>
                    <FilterContainer>
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <Select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value as SortField)}
                        >
                            <option value="bambara">Trier par Bambara</option>
                            <option value="french">Trier par Français</option>
                        </Select>

                        <Select
                            value={sortDirection}
                            onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                        >
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                        </Select>
                    </FilterContainer>

                    <ContentContainer>
                        {paginatedContent.map((item) => (
                            <DictionaryCard
                                key={item.id}
                                bambara={item.bambara}
                                french={item.french}
                            />
                        ))}
                    </ContentContainer>

                    {totalPages > 1 && (
                        <Pagination>
                            <PageButton
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                «
                            </PageButton>
                            <PageButton
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </PageButton>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <PageButton
                                    key={page}
                                    active={currentPage === page}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </PageButton>
                            ))}
                            <PageButton
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </PageButton>
                            <PageButton
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </PageButton>
                        </Pagination>
                    )}
                </>
            )}
        </Wrapper>
    );
}
