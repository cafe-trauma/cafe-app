export interface Question {
    id: number;
    category: string;
    text: string;
    q_type: string;
    options?: Opt[];
    answer: Answer[];
    tags?: string;
    help_text?: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Opt {
    id: number;
    text: string;
    free: boolean;
}

export interface Answer {
    text?: string;
    check?: string;
    integer?: number;
    yesno?: boolean;
    question: number;
}

export interface Definition {
    word: string;
    definition: string;
}
