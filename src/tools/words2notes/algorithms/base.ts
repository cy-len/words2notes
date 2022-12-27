import type { CharMap } from "../charsSet";
import type { Note, Scale } from "../notesSet/note";

export function pickNoteFromChar(char: string, charSet: CharMap, noteSet: Scale): Note {
    const rawIndex = charSet[char.toLowerCase()];
    return noteSet[rawIndex % noteSet.length];
}