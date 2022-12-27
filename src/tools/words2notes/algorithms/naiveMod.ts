import { monoCaseAlphabet } from "../charsSet";
import { type Note, makeSilence, type Scale } from "../notesSet/note";
import { chromaticScale, diatonicScale, microtonalChromaticScale } from "../notesSet/notesSet";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";
import { pickNoteFromChar } from "./base";

export const naiveMod: TranscriptionAlgorithm = {
    name: "Naive Modulus",
    scaleCompatibility: {
        [ScaleType.DIATONIC]: true,
        [ScaleType.CHROMATIC]: true,
        [ScaleType.MICROTONAL]: true
    },

    algorithm: (char: string, options: CharToNoteMappingOptions): Note => {
        if (char === " ") return makeSilence();
    
        let noteSet: Scale = diatonicScale;
        if (options.scaleType === ScaleType.CHROMATIC) {
            noteSet = chromaticScale;
        } else if (options.scaleType === ScaleType.MICROTONAL) {
            noteSet = microtonalChromaticScale;
        }
    
        return pickNoteFromChar(char, monoCaseAlphabet, noteSet);
    }
}