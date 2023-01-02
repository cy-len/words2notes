import { monoCaseAlphabet, type CharMap } from "../charsSet";
import { type Scale, type Note, makeSilence, makeNoteFromIndexAlterationPair } from "../notesSet/note";
import { diatonicScale } from "../notesSet/notesSet";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";
import { applyToEachChar, pickNoteFromChar } from "./base";

const englishSolmizationChromaticScale: Scale = [
    makeNoteFromIndexAlterationPair(0), // A
    makeNoteFromIndexAlterationPair(1), // B
    makeNoteFromIndexAlterationPair(2), // C
    makeNoteFromIndexAlterationPair(3), // D
    makeNoteFromIndexAlterationPair(4), // E
    makeNoteFromIndexAlterationPair(5), // F
    makeNoteFromIndexAlterationPair(6), // G
    makeNoteFromIndexAlterationPair(0, 0.5), // A#
    makeNoteFromIndexAlterationPair(2, 0.5), // C#
    makeNoteFromIndexAlterationPair(3, 0.5), // D#
    makeNoteFromIndexAlterationPair(5, 0.5), // F#
    makeNoteFromIndexAlterationPair(6, 0.5), // G#
];
/* const englishSolmizationMicrotonalScale: Scale = [
    makeNoteFromIndexAlterationPair(0), // A
    makeNoteFromIndexAlterationPair(1), // B
    makeNoteFromIndexAlterationPair(2), // C
    makeNoteFromIndexAlterationPair(3), // D
    makeNoteFromIndexAlterationPair(4), // E
    makeNoteFromIndexAlterationPair(5), // F
    makeNoteFromIndexAlterationPair(6), // G
    makeNoteFromIndexAlterationPair(0, 0.5), // A#
    makeNoteFromIndexAlterationPair(2, 0.5), // C#
    makeNoteFromIndexAlterationPair(3, 0.5), // D#
    makeNoteFromIndexAlterationPair(5, 0.5), // F#
    makeNoteFromIndexAlterationPair(6, 0.5), // G#
    makeNoteFromIndexAlterationPair(0, 0.25), // A #/2
    makeNoteFromIndexAlterationPair(1, 0.25), // B #/2
    makeNoteFromIndexAlterationPair(2, 0.25), // C #/2
    makeNoteFromIndexAlterationPair(3, 0.25), // D #/2
    makeNoteFromIndexAlterationPair(4, 0.25), // E #/2
    makeNoteFromIndexAlterationPair(5, 0.25), // F #/2
    makeNoteFromIndexAlterationPair(6, 0.25), // G #/2
    makeNoteFromIndexAlterationPair(0, 0.75), // A 1.5#
    makeNoteFromIndexAlterationPair(2, 0.75), // C 1.5#
    makeNoteFromIndexAlterationPair(3, 0.75), // D 1.5#
    makeNoteFromIndexAlterationPair(5, 0.75), // F 1.5#
    makeNoteFromIndexAlterationPair(6, 0.75), // G 1.5#
]; */


export const naiveEnglishSolmization: TranscriptionAlgorithm = {
    name: "English Solmization Biased Naive Modulus",
    scaleCompatibility: {
        [ScaleType.DIATONIC]: true,
        [ScaleType.CHROMATIC]: true,
        [ScaleType.MICROTONAL]: false
    },

    algorithm: (words: string, options: CharToNoteMappingOptions): Note[] => {
        return applyToEachChar(words, (char: string): Note => {
            if (char === " ") return makeSilence();
        
            if (options.scaleType === ScaleType.DIATONIC) {
                return pickNoteFromChar(char, monoCaseAlphabet, diatonicScale, {
                    generatorString: char
                });
            }
            return pickNoteFromChar(char, monoCaseAlphabet, englishSolmizationChromaticScale, {
                generatorString: char
            });
        });
    }
}