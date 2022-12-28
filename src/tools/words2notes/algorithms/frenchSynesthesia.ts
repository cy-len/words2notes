import { monoCaseAlphabet } from "../charsSet";
import { type Scale, type Note, makeSilence, makeNoteFromIndexAlterationPair } from "../notesSet/note";
import { diatonicScale } from "../notesSet/notesSet";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";
import { pickNoteFromChar } from "./base";

const frenchSynestheticVowelsCharToNote: { [key: string]: number } = {
    "a": 0, // La
    "e": 3, // Ré
    "i": 4, // Mi
    "o": 6, // Sol
    "u": 1, // Si (su)
    "y": 1, // Si
    "ou": 5, // Fa (fou)
    "ai": 3, // Ré
    "eu": 2, // Do (deu)
    "au": 3, // Do
    "eau": 3, // Do
    "oi": 5, // Fa
};

const frenchSynestheticConsonnantsAlterationModifier: { [key: string]: number } = {
    "b": 0,
    "c": 0,
    "d": 0,
    "f": -0.5,
    "g": 0,
    "h": 0,
    "j": 0,
    "k": 0,
    "l": -0.5,
    "m": -0.5,
    "n": -0.5,
    "p": 0,
    "q": 0,
    "r": 0.5,
    "s": 0.5,
    "t": 0.5,
    "v": -0.5,
    "w": -0.5,
    "x": 0.5,
    "z": 0.5,
};


export const frenchSynesthesia: TranscriptionAlgorithm = {
    name: "French Synesthesia",
    scaleCompatibility: {
        [ScaleType.DIATONIC]: true,
        [ScaleType.CHROMATIC]: true,
        [ScaleType.MICROTONAL]: false
    },

    // TODO assumes full string
    algorithm: (words: string, options: CharToNoteMappingOptions): Note[] => {
        let input = words;

        const possibleVowels = Object.keys(frenchSynestheticVowelsCharToNote);
        possibleVowels.sort((a, b) => b.length - a.length); // Sort longest to smallest

        possibleVowels.forEach((vowel) => {
            input = input.replaceAll(vowel, `${frenchSynestheticVowelsCharToNote[vowel]}`);
        });

        if (options.scaleType === ScaleType.DIATONIC) {
            const diatonicOutput: Note[] = [];
            for (let i = 0; i < input.length; i++) {
                const letter = input.charAt(i);
                if (letter === " ") {
                    diatonicOutput.push(makeSilence());
                } else {
                    const noteId = parseInt(letter);
                    if (!isNaN(noteId)) {
                        diatonicOutput.push(makeNoteFromIndexAlterationPair(noteId));
                    }
                }
            }

            return diatonicOutput;
        }

        const chromaticOutput: Note[] = [];
        let nextAlteration = 0;
        for (let i = 0; i < input.length; i++) {
            const letter = input.charAt(i);
            if (letter === " ") {
                chromaticOutput.push(makeSilence());
            } else {
                const noteId = parseInt(letter);
                if (!isNaN(noteId)) {
                    chromaticOutput.push(makeNoteFromIndexAlterationPair(noteId, nextAlteration));
                    nextAlteration = 0;
                } else if (letter in frenchSynestheticConsonnantsAlterationModifier) {
                    nextAlteration = frenchSynestheticConsonnantsAlterationModifier[letter];
                }
            }
        }

        return chromaticOutput;
    }
}