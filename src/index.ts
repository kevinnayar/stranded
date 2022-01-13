import {
  BaseSymbol,
  BaseName,
  AminoAcid,
  AminoAcidDef,
  AminoAcidName,
  AminoAcidLetter,
  AminoAcidProp,
} from './types';

import {
  baseLookup,
  dnaToAminoAcidLookup,
  rnaToAminoAcidLookup,
  aminoAcidToNameLookup,
  aminoAcidToLetterLookup,
  aminoAcidToPropertyLookup,
} from './lookups';

export function getBaseName(base: BaseSymbol): BaseName {
  const name = baseLookup[base];
  if (!name) {
    throw new Error(`Cannot find name for invalid base symbol: "${base}"`);
  }
  return name;
}

function transcribeDnaBaseToRnaBase(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case 'A': return 'U';
    case 'C': return 'G';
    case 'G': return 'C';
    case 'T': return 'A';
    default: throw new Error(`Cannot transcribe invalid DNA base symbol: "${base}"`);
  }
}

function transcribeRnaBaseToDnaBase(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case 'A': return 'T';
    case 'C': return 'G';
    case 'G': return 'C';
    case 'U': return 'A';
    default: throw new Error(`Cannot transcribe invalid RNA base symbol: "${base}"`);
  }
}

export function transcribeDnaToRna(dna: string): string {
  let rna = '';
  for (const letter of dna) {
    const base: any = letter as keyof BaseSymbol;
    rna += transcribeDnaBaseToRnaBase(base);
  }
  return rna;
}

export function transcribeRnaToDna(rna: string): string {
  let dna = '';
  for (const letter of rna) {
    const base: any = letter as keyof BaseSymbol;
    dna += transcribeRnaBaseToDnaBase(base);
  }
  return dna;
}

export function getAminoAcidFromCodon(codon: string, type: 'dna' | 'rna'): null | AminoAcid {
  const lookup = type === 'dna' ? dnaToAminoAcidLookup : rnaToAminoAcidLookup;
  const aminoAcid = lookup[codon];
  if (!aminoAcid) {
    throw new Error(`Cannot find an amino acid for invalid ${type} codon: "${codon}"`);
  }
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

export function getAminoAcidDef(abbr: AminoAcid): AminoAcidDef {
  const name: AminoAcidName = aminoAcidToNameLookup[abbr];
  if (!name) {
    throw new Error(`Could not find "name" for amino acid: "${abbr}"`);
  }

  const letter: AminoAcidLetter = aminoAcidToLetterLookup[abbr];
  if (!letter) {
    throw new Error(`Could not find "letter" for amino acid: "${abbr}"`);
  }

  const property: null | AminoAcidProp = aminoAcidToPropertyLookup[abbr];
  if (typeof property !== 'string' && property !== null) {
    throw new Error(`Could not find "property" for amino acid: "${abbr}"`);
  }

  return {
    abbr,
    name,
    letter,
    property,
  };
}

export type PolypeptideTranslation = {
  polypeptide: AminoAcid[];
  remainingSequence: string;
};

export function translateSequenceToPolypeptide(
  sequence: string,
  polypeptide: AminoAcid[] = [],
  type: 'dna' | 'rna' = 'rna',
): PolypeptideTranslation {
  const codonLength = 3;
  const codon = sequence.slice(0, codonLength);
  const remainingSequence = sequence.slice(codonLength);
  const aminoAcid = type === 'dna'
    ? getAminoAcidFromCodon(codon, 'dna')
    : getAminoAcidFromCodon(codon, 'rna')

  if (aminoAcid) polypeptide.push(aminoAcid);

  if (!aminoAcid || remainingSequence.length < codonLength) {
    return {
      polypeptide,
      remainingSequence: !aminoAcid ? sequence : remainingSequence,
    };
  }

  return translateSequenceToPolypeptide(remainingSequence, polypeptide, type);
}

type OrfSequenceBuilderCodons = {
  current: string,
  start: 'ATG' | 'AUG',
  stops: Record<string, 1>,
};

type OrfSequenceBuilderFrame = {
  current: string;
  started: boolean;
  stopped: boolean;
};

function orfSequenceBuilder(
  codons: OrfSequenceBuilderCodons,
  frameIn: OrfSequenceBuilderFrame,
): OrfSequenceBuilderFrame {
  const frame = { ...frameIn };

  // have not started and is start codon
  if (!frame.started && codons.start === codons.current) {
    frame.started = true;
    frame.current += codons.current;
  // have started but haven't stopped
  } else if (frame.started && !frame.stopped) {
    // is stop codon
    if (codons.stops[codons.current] === 1) {
      frame.stopped = true;
    // is not stop codon
    } else {
      frame.current += codons.current;
    }
  }

  return { ...frame };
}

type Orfs = [
  string | undefined,
  string | undefined,
  string | undefined,
];

export function findOrfs(sequence: string, type: 'dna' | 'rna'): Orfs {
  const startCodon = type === 'dna' ? 'ATG' : 'AUG';
  const stopCodons: Record<string, 1> = type === 'dna'
    ? { TAA: 1, TAG: 1, TGA: 1 }
    : { UAA: 1, UAG: 1, UGA: 1 };

  let frame1 = '';
  let frame1Started = false;
  let frame1Stopped = false;

  let frame2 = '';
  let frame2Started = false;
  let frame2Stopped = false;

  let frame3 = '';
  let frame3Started = false;
  let frame3Stopped = false;

  for (let i = 0; i < sequence.length; i += 3) {
    const base1 = sequence[i];
    const base2 = sequence[i + 1]
    const base3 = sequence[i + 2];
    const base4 = sequence[i + 3];
    const base5 = sequence[i + 4];

    if (base1 && base2 && base3) {
      const codon = `${base1}${base2}${base3}`;
      const { current, started, stopped } = orfSequenceBuilder({
        current: codon,
        start: startCodon,
        stops: stopCodons,
      }, {
        current: frame1,
        started: frame1Started,
        stopped: frame1Stopped,
      });

      frame1 = current;
      frame1Started = started;
      frame1Stopped = stopped;
    }

    if (base2 && base3 && base4) {
      const codon = `${base2}${base3}${base4}`;
      const { current, started, stopped } = orfSequenceBuilder(
        {
          current: codon,
          start: startCodon,
          stops: stopCodons,
        },
        {
          current: frame2,
          started: frame2Started,
          stopped: frame2Stopped,
        },
      );

      frame2 = current;
      frame2Started = started;
      frame2Stopped = stopped;
    }

    if (base3 && base4 && base5) {
      const codon = `${base3}${base4}${base5}`;
      const { current, started, stopped } = orfSequenceBuilder(
        {
          current: codon,
          start: startCodon,
          stops: stopCodons,
        },
        {
          current: frame3,
          started: frame3Started,
          stopped: frame3Stopped,
        },
      );

      frame3 = current;
      frame3Started = started;
      frame3Stopped = stopped;
    }
  }

  const orfs: Orfs = [
    frame1Started && frame1Stopped ? frame1 : undefined,
    frame2Started && frame2Stopped ? frame2 : undefined,
    frame3Started && frame3Stopped ? frame3 : undefined,
  ];
  return orfs;
}

export function getLongestOrf(orfs: Orfs): string | undefined {
  if (!orfs[0] && !orfs[1] && orfs[2]) return undefined;

  let longest = 0;
  let index: null | number = null;

  for (let i = 0; i < orfs.length; i += 1) {
    const seq = orfs[i];
    const len = typeof seq === 'string'
      ? seq.length
      : 0;

    if (typeof index !== 'number' || len > longest) {
      longest = len;
      index = i;
    }
  }

  return index !== null ? orfs[index] : undefined;
}





