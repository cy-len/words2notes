import { type Note, makeSilence, makeNoteFromIndexAlterationPair } from "../notesSet/note";
import { ScaleType, type CharToNoteMappingOptions, type TranscriptionAlgorithm } from "./algoTypes";

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

    algorithm: (words: string, options: CharToNoteMappingOptions): Note[] => {
        const possibleVowels = Object.keys(frenchSynestheticVowelsCharToNote);
        possibleVowels.sort((a, b) => b.length - a.length); // Sort longest to smallest

        if (options.scaleType === ScaleType.DIATONIC) {
            const diatonicOutput: Note[] = [];
            let index = 0;
            while (index < words.length) {
                if (words.charAt(index) === " ") {
                    diatonicOutput.push(makeSilence());
                    index++;
                } else {
                    let found = false;
                    for (const vowel of possibleVowels) {
                        if (words.indexOf(vowel, index) === index) {
                            const noteId = frenchSynestheticVowelsCharToNote[vowel];
                            diatonicOutput.push(makeNoteFromIndexAlterationPair(noteId, 0, vowel));
    
                            index += vowel.length;
                            found = true;
                        }
                    }
    
                    if (!found) {
                        index++;
                    }
                }
            }

            return diatonicOutput;
        }

        const chromaticOutput: Note[] = [];
        let index = 0;
        let lastConsonnant = "";
        while (index < words.length) {
            if (words.charAt(index) === " ") {
                chromaticOutput.push(makeSilence());
                index++;
            } else {
                let found = false;
                for (const vowel of possibleVowels) {
                    if (words.indexOf(vowel, index) === index) {
                        const noteId = frenchSynestheticVowelsCharToNote[vowel];
                        const alteration = frenchSynestheticConsonnantsAlterationModifier[lastConsonnant];
                        chromaticOutput.push(makeNoteFromIndexAlterationPair(noteId, alteration, `${lastConsonnant}${vowel}`));

                        index += vowel.length;
                        found = true;
                        lastConsonnant = "";
                    }
                }

                if (!found) {
                    const char = words.charAt(index);
                    if (frenchSynestheticConsonnantsAlterationModifier[char] !== undefined) {
                        lastConsonnant = char;
                    }
                    index++;
                }
            }
        }

        return chromaticOutput;
    }
}