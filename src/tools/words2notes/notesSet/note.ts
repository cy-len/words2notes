const rawDiatonicScale = ["A", "B", "C", "D", "E", "F", "G"];
const noteByIndexHasNonOverlappingSharp = [true, false, true, true, false, true, true];

function alterationSymbolFromNumber(alteration: number): string {
    if (alteration == 0.5) return "#";
    if (alteration == -0.5) return "b";
    if (alteration == 0.25) return "½#";
    if (alteration == -0.25) return "½b";
    if (alteration == 0.75) return "#½#";
    if (alteration == -0.75) return "b½b";

    return "";
}

export interface NoteMetadata {
    generatorString: string;
}

export interface Note {
    isSilence: boolean;
    name: string; // A#
    baseName: string; // A
    indexInDiatonicScale: number; // 0-7 number, 0=A -> 7=G
    alteration: number; // in tones, +0.5 for sharp, -0.25 for quartertone under
    metadata: NoteMetadata;
};

export type Scale = Note[];

export const SILENCE = "_";

export function makeSilence(generatorString: string = ""): Note {
    return {
        isSilence: true,
        name: SILENCE,
        baseName: SILENCE,
        indexInDiatonicScale: -1,
        alteration: 0,
        metadata: {
            generatorString
        }
    }
};

export function makeNoteFromIndexAlterationPair(indexInDiatonicScale: number, alteration: number = 0, generatorString: string = ""): Note {
    const alterationString = alterationSymbolFromNumber(alteration);
    const baseName = rawDiatonicScale[indexInDiatonicScale];

    return {
        isSilence: false,
        name: `${baseName}${alterationString}`,
        baseName,
        indexInDiatonicScale,
        alteration,
        metadata: {
            generatorString
        }
    };
}

export function noteHasNonOverlappingSharp(index: number): boolean {
    return noteByIndexHasNonOverlappingSharp[index];
}