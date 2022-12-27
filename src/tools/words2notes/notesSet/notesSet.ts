import { makeNoteFromIndexAlterationPair, noteHasNonOverlappingSharp, type Note, type Scale } from "./note";

function makeScale(sharps: boolean, halfSharps: boolean): Scale {
    const scale: Scale = [];

    for (let i = 0; i < 7; i++) {
        scale.push(makeNoteFromIndexAlterationPair(i));
        
        if (halfSharps) {
            scale.push(makeNoteFromIndexAlterationPair(i, 0.25));
        }
        if (sharps && noteHasNonOverlappingSharp(i)) {
            scale.push(makeNoteFromIndexAlterationPair(i, 0.5));
        }
    }

    return scale;
}
export const diatonicScale: Scale = makeScale(false, false);
export const chromaticScale: Scale = makeScale(true, false);
export const microtonalChromaticScale: Scale = makeScale(true, true);