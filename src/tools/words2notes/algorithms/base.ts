import type { CharMap } from "../charsSet";
import type { Note, Scale } from "../notesSet/note";

export function pickNoteFromChar(char: string, charSet: CharMap, noteSet: Scale): Note {
    const rawIndex = charSet[char.toLowerCase()];
    return noteSet[rawIndex % noteSet.length];
}

export function applyToEachChar(words: string, callback: (char: string) => Note): Note[] {
    let notes = [];

    let split = words.split("");
    for (let i = 0; i < split.length; i++) {
        const char = split[i];
        notes.push(callback(char));
    }

    return notes;
}