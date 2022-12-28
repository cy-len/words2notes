import type { Note } from "../notesSet/note";

export enum ScaleType {
    DIATONIC = 0,
    CHROMATIC = 1,
    MICROTONAL = 2
};

export interface CharToNoteMappingOptions {
    scaleType: ScaleType;
}

export type CharToNoteMapper = (char: string, options: CharToNoteMappingOptions) => Note;
export type StringToNotesMapper = (words: string, options: CharToNoteMappingOptions) => Note[];

export type ScaleTypeCompatibilitySet = Record<ScaleType, boolean>;

export interface TranscriptionAlgorithm {
    name: string;
    algorithm: StringToNotesMapper;
    scaleCompatibility: ScaleTypeCompatibilitySet;
}