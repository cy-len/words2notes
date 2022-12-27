import type { CharToNoteMapper, ScaleType } from "./algorithms/algoTypes";
import type { Note, Scale } from "./notesSet/note";

function pickNoteAtIndex(noteSet: Scale, index: number, offset: number = 0) {
    return noteSet[(index + offset) % noteSet.length];
}
/*
function char2NoteMod12(char: string) {
    char = char.toLowerCase();
    if (char === " ") return SILENCE;

    return pickNoteAtIndex(halfToneNotes, charSet[char]);
}
*/

export function words2Notes(words: string, algorithm: CharToNoteMapper, scaleType: ScaleType): Note[] {
    let notes = [];

    let split = words.split("");
    for (let i = 0; i < split.length; i++) {
        const char = split[i];
        notes.push(algorithm(char, { scaleType }));
    }

    return notes;
}