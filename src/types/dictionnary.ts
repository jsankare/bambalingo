export interface expression {
    id: number;
    french: string;
    bambara: string;
}

export interface DictionaryCardProps {
    french: string;
    bambara: string;
}

export interface Expression {
    id: string;
    bambara: string;
    french: string;
    created_at: string;
    updated_at: string;
}

export interface Word {
    id: string;
    bambara: string;
    french: string;
    created_at: string;
    updated_at: string;
}

export interface Sentence {
    id: string;
    bambara: string;
    french: string;
    words: Word[];
    created_at: string;
    updated_at: string;
}