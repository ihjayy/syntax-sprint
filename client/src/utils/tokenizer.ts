export interface CodeChar {
    char: string;
    index: number;
    line: number;
    column: number;
    isWhitespace: boolean;
}

export function tokenizeCode(codeBody: string): CodeChar[] {
    const chars: CodeChar[] = [];
    let line = 1;
    let column = 1;

    for (let i = 0; i <codeBody.length; i++) {
        const char = codeBody[i];
        const isWhitespace = char === ' ' || char === '\n' || char === '\t';

        chars.push({
            char,
            index: i,
            line,
            column,
            isWhitespace,
        });

        if (char === '\n') {
            line++;
            column = 1;
        } else {
            column++;
        }
    }

    return chars;
}