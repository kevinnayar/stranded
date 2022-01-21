import {
  BaseSymbol,
  BaseName,
  AminoAcid,
  AminoAcidName,
  AminoAcidAbbr,
  AminoAcidProp,
} from './types';

export const baseLookup: Record<BaseSymbol, BaseName> = {
  A: 'Adenine',
  C: 'Cytosine',
  G: 'Guanine',
  T: 'Thymine',
  U: 'Uracil',
} as const;

export const dnaToAminoAcidLookup: Record<string, AminoAcid> = {
  TTT: 'F',
  TTC: 'F',
  TTA: 'L',
  TTG: 'L',

  TCT: 'S',
  TCC: 'S',
  TCA: 'S',
  TCG: 'S',

  TAT: 'Y',
  TAC: 'Y',
  TAA: 'STOP',
  TAG: 'STOP',

  TGT: 'C',
  TGC: 'C',
  TGA: 'STOP',
  TGG: 'W',

  CTT: 'L',
  CTC: 'L',
  CTA: 'L',
  CTG: 'L',

  CCT: 'P',
  CCC: 'P',
  CCA: 'P',
  CCG: 'P',

  CAT: 'H',
  CAC: 'H',
  CAA: 'Q',
  CAG: 'Q',

  CGT: 'R',
  CGC: 'R',
  CGA: 'R',
  CGG: 'R',

  ATT: 'I',
  ATC: 'I',
  ATA: 'I',
  ATG: 'M',

  ACT: 'T',
  ACC: 'T',
  ACA: 'T',
  ACG: 'T',

  AAT: 'N',
  AAC: 'N',
  AAA: 'K',
  AAG: 'K',

  AGT: 'S',
  AGC: 'S',
  AGA: 'R',
  AGG: 'R',

  GTT: 'V',
  GTC: 'V',
  GTA: 'V',
  GTG: 'V',

  GCT: 'A',
  GCC: 'A',
  GCA: 'A',
  GCG: 'A',

  GAT: 'D',
  GAC: 'D',
  GAA: 'E',
  GAG: 'E',

  GGT: 'G',
  GGC: 'G',
  GGA: 'G',
  GGG: 'G',
} as const;

export const rnaToAminoAcidLookup: Record<string, AminoAcid> = {
  UUU: 'F',
  UUC: 'F',
  UUA: 'L',
  UUG: 'L',

  UCU: 'S',
  UCC: 'S',
  UCA: 'S',
  UCG: 'S',

  UAU: 'Y',
  UAC: 'Y',
  UAA: 'STOP',
  UAG: 'STOP',

  UGU: 'C',
  UGC: 'C',
  UGA: 'STOP',
  UGG: 'W',

  CUU: 'L',
  CUC: 'L',
  CUA: 'L',
  CUG: 'L',

  CCU: 'P',
  CCC: 'P',
  CCA: 'P',
  CCG: 'P',

  CAU: 'H',
  CAC: 'H',
  CAA: 'Q',
  CAG: 'Q',

  CGU: 'R',
  CGC: 'R',
  CGA: 'R',
  CGG: 'R',

  AUU: 'I',
  AUC: 'I',
  AUA: 'I',
  AUG: 'M',

  ACU: 'T',
  ACC: 'T',
  ACA: 'T',
  ACG: 'T',

  AAU: 'N',
  AAC: 'N',
  AAA: 'K',
  AAG: 'K',

  AGU: 'S',
  AGC: 'S',
  AGA: 'R',
  AGG: 'R',

  GUU: 'V',
  GUC: 'V',
  GUA: 'V',
  GUG: 'V',

  GCU: 'A',
  GCC: 'A',
  GCA: 'A',
  GCG: 'A',

  GAU: 'D',
  GAC: 'D',
  GAA: 'E',
  GAG: 'E',

  GGU: 'G',
  GGC: 'G',
  GGA: 'G',
  GGG: 'G',
} as const;

export const aminoAcidToNameLookup: Record<AminoAcid, AminoAcidName> = {
  A: 'Alanine',
  R: 'Arginine',
  N: 'Asparagine',
  D: 'Aspartic acid',
  C: 'Cysteine',
  Q: 'Glutamine',
  E: 'Glutamic acid',
  G: 'Glycine',
  H: 'Histidine',
  I: 'Isoleucine',
  L: 'Leucine',
  K: 'Lysine',
  M: 'Methionine',
  F: 'Phenylalanine',
  P: 'Proline',
  S: 'Serine',
  STOP: 'STOP',
  T: 'Threonine',
  W: 'Tryptophan',
  Y: 'Tyrosine',
  V: 'Valine',
} as const;

export const aminoAcidToLetterLookup: Record<AminoAcid, AminoAcidAbbr> = {
  A: 'Ala',
  R: 'Arg',
  N: 'Asn',
  D: 'Asp',
  C: 'Cys',
  E: 'Glu',
  Q: 'Gln',
  G: 'Gly',
  H: 'His',
  I: 'Ile',
  L: 'Leu',
  K: 'Lys',
  M: 'Met',
  F: 'Phe',
  P: 'Pro',
  S: 'Ser',
  STOP: 'STOP',
  T: 'Thr',
  W: 'Trp',
  Y: 'Tyr',
  V: 'Val',
} as const;

export const aminoAcidToPropertyLookup: Record<AminoAcid, null | AminoAcidProp> = {
  A: 'Nonpolar',
  R: 'Basic',
  N: 'Polar',
  D: 'Acidic',
  C: 'Polar',
  Q: 'Polar',
  E: 'Acidic',
  G: 'Nonpolar',
  H: 'Basic',
  I: 'Nonpolar',
  L: 'Nonpolar',
  K: 'Basic',
  M: 'Nonpolar',
  F: 'Nonpolar',
  P: 'Nonpolar',
  S: 'Polar',
  STOP: null,
  T: 'Nonpolar',
  W: 'Nonpolar',
  Y: 'Polar',
  V: 'Nonpolar',
} as const;

