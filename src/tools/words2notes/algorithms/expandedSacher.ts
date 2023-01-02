import { monoCaseAlphabet } from "../charsSet";
import { type Scale, type Note, makeSilence, makeNoteFromIndexAlterationPair } from "../notesSet/note";
import { diatonicScale } from "../notesSet/notesSet";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";
import { applyToEachChar, pickNoteFromChar } from "./base";

const expandedSacherMapper: Scale = [
    makeNoteFromIndexAlterationPair(0), // A
    makeNoteFromIndexAlterationPair(1, -0.5), // B
    makeNoteFromIndexAlterationPair(2), // C
    makeNoteFromIndexAlterationPair(3), // D
    makeNoteFromIndexAlterationPair(4), // E
    makeNoteFromIndexAlterationPair(5), // F
    makeNoteFromIndexAlterationPair(6), // G
    makeNoteFromIndexAlterationPair(1), // H
    makeNoteFromIndexAlterationPair(2, 0.5), // C#  I
    makeNoteFromIndexAlterationPair(3, 0.5), // D#  J
    makeNoteFromIndexAlterationPair(5, 0.5), // F#  K
    makeNoteFromIndexAlterationPair(6, 0.5), // G#  L
    makeNoteFromIndexAlterationPair(4), // E  M(i)
    makeNoteFromIndexAlterationPair(4, -0.5), // Eb  N (half M)
    makeNoteFromIndexAlterationPair(6), // G  O (sOl)
    makeNoteFromIndexAlterationPair(5), // F  P(ha)
    makeNoteFromIndexAlterationPair(0), // A  Q (too low probability otherwise)
    makeNoteFromIndexAlterationPair(3), // D  R
    makeNoteFromIndexAlterationPair(4, -0.5), // Eb  S
    makeNoteFromIndexAlterationPair(1), // H  T (ti)
    makeNoteFromIndexAlterationPair(2), // C  U(t)
    makeNoteFromIndexAlterationPair(2, 0.5), // C#  V (sharp U)
    makeNoteFromIndexAlterationPair(3), // D  W (double sharp U)
    makeNoteFromIndexAlterationPair(1, -0.5), // Bb  X
    makeNoteFromIndexAlterationPair(5, 0.5), // F#  Y
    makeNoteFromIndexAlterationPair(6, 0.5), // G#  Z
];


export const expandedSacher: TranscriptionAlgorithm = {
    name: "Expanded Sacher",
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
            return pickNoteFromChar(char, monoCaseAlphabet, expandedSacherMapper, {
                generatorString: char
            });
        });
    }
}