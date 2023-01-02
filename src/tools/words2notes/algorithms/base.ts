import type { CharMap } from "../charsSet";
import type { Note, NoteMetadata, Scale } from "../notesSet/note";

export function pickNoteFromChar(char: string, charSet: CharMap, noteSet: Scale, customMetadata: NoteMetadata | null = null): Note {
    const rawIndex = charSet[char.toLowerCase()];

    const pickedNote = noteSet[rawIndex % noteSet.length];

    if (customMetadata) {
        return {
            ...pickedNote,
            metadata: customMetadata
        }
    }

    return pickedNote;
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