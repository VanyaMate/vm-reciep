export const getRandomInt = function (min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomWords = function (wordsLib: string, amount: number): string {
    const words: string[]         = wordsLib
        .split(',')
        .map((word) => word.trim());
    const selectedWords: string[] = [];

    for (let i = 0; i < amount; i++) {
        const wordIndex: number = getRandomInt(0, words.length);
        selectedWords.push(words[wordIndex]);
    }

    return selectedWords.join(' ');
};