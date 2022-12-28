import { monoCaseAlphabet } from "../charsSet";
import { type Scale, type Note, makeSilence, makeNoteFromIndexAlterationPair } from "../notesSet/note";
import { diatonicScale } from "../notesSet/notesSet";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";
import { applyToEachChar, pickNoteFromChar } from "./base";

const germanSolmizationChromaticScale: Scale = [
    makeNoteFromIndexAlterationPair(0), // A
    makeNoteFromIndexAlterationPair(1, -0.5), // B
    makeNoteFromIndexAlterationPair(2), // C
    makeNoteFromIndexAlterationPair(3), // D
    makeNoteFromIndexAlterationPair(4), // E
    makeNoteFromIndexAlterationPair(5), // F
    makeNoteFromIndexAlterationPair(6), // G
    makeNoteFromIndexAlterationPair(1), // H
    makeNoteFromIndexAlterationPair(2, 0.5), // C#
    makeNoteFromIndexAlterationPair(3, 0.5), // D#
    makeNoteFromIndexAlterationPair(5, 0.5), // F#
    makeNoteFromIndexAlterationPair(6, 0.5), // G#
];


export const naiveGermanSolmization: TranscriptionAlgorithm = {
    name: "German Solmization Biased Naive Modulus",
    scaleCompatibility: {
        [ScaleType.DIATONIC]: false,
        [ScaleType.CHROMATIC]: true,
        [ScaleType.MICROTONAL]: false
    },

    algorithm: (words: string, options: CharToNoteMappingOptions): Note[] => {
        return applyToEachChar(words, (char: string): Note => {
            if (char === " ") return makeSilence();
        
            if (options.scaleType !== ScaleType.CHROMATIC) {
                return makeSilence();
            }
            return pickNoteFromChar(char, monoCaseAlphabet, germanSolmizationChromaticScale);
        });
    }
}