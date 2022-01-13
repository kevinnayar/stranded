import {
  BaseSymbol,
  BaseName,
  AminoAcid,
  AminoAcidName,
  AminoAcidLetter,
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
  TTT: 'Phe',
  TTC: 'Phe',
  TTA: 'Leu',
  TTG: 'Leu',

  TCT: 'Ser',
  TCC: 'Ser',
  TCA: 'Ser',
  TCG: 'Ser',

  TAT: 'Tyr',
  TAC: 'Tyr',
  TAA: 'STOP',
  TAG: 'STOP',

  TGT: 'Cys',
  TGC: 'Cys',
  TGA: 'STOP',
  TGG: 'Trp',

  CTT: 'Leu',
  CTC: 'Leu',
  CTA: 'Leu',
  CTG: 'Leu',

  CCT: 'Pro',
  CCC: 'Pro',
  CCA: 'Pro',
  CCG: 'Pro',

  CAT: 'His',
  CAC: 'His',
  CAA: 'Gln',
  CAG: 'Gln',

  CGT: 'Arg',
  CGC: 'Arg',
  CGA: 'Arg',
  CGG: 'Arg',

  ATT: 'Ile',
  ATC: 'Ile',
  ATA: 'Ile',
  ATG: 'Met',

  ACT: 'Thr',
  ACC: 'Thr',
  ACA: 'Thr',
  ACG: 'Thr',

  AAT: 'Asn',
  AAC: 'Asn',
  AAA: 'Lys',
  AAG: 'Lys',

  AGT: 'Ser',
  AGC: 'Ser',
  AGA: 'Arg',
  AGG: 'Arg',

  GTT: 'Val',
  GTC: 'Val',
  GTA: 'Val',
  GTG: 'Val',

  GCT: 'Ala',
  GCC: 'Ala',
  GCA: 'Ala',
  GCG: 'Ala',

  GAT: 'Asp',
  GAC: 'Asp',
  GAA: 'Glu',
  GAG: 'Glu',

  GGT: 'Gly',
  GGC: 'Gly',
  GGA: 'Gly',
  GGG: 'Gly',
} as const;

export const rnaToAminoAcidLookup: Record<string, AminoAcid> = {
  UUU: 'Phe',
  UUC: 'Phe',
  UUA: 'Leu',
  UUG: 'Leu',

  UCU: 'Ser',
  UCC: 'Ser',
  UCA: 'Ser',
  UCG: 'Ser',

  UAU: 'Tyr',
  UAC: 'Tyr',
  UAA: 'STOP',
  UAG: 'STOP',

  UGU: 'Cys',
  UGC: 'Cys',
  UGA: 'STOP',
  UGG: 'Trp',

  CUU: 'Leu',
  CUC: 'Leu',
  CUA: 'Leu',
  CUG: 'Leu',

  CCU: 'Pro',
  CCC: 'Pro',
  CCA: 'Pro',
  CCG: 'Pro',

  CAU: 'His',
  CAC: 'His',
  CAA: 'Gln',
  CAG: 'Gln',

  CGU: 'Arg',
  CGC: 'Arg',
  CGA: 'Arg',
  CGG: 'Arg',

  AUU: 'Ile',
  AUC: 'Ile',
  AUA: 'Ile',
  AUG: 'Met',

  ACU: 'Thr',
  ACC: 'Thr',
  ACA: 'Thr',
  ACG: 'Thr',

  AAU: 'Asn',
  AAC: 'Asn',
  AAA: 'Lys',
  AAG: 'Lys',

  AGU: 'Ser',
  AGC: 'Ser',
  AGA: 'Arg',
  AGG: 'Arg',

  GUU: 'Val',
  GUC: 'Val',
  GUA: 'Val',
  GUG: 'Val',

  GCU: 'Ala',
  GCC: 'Ala',
  GCA: 'Ala',
  GCG: 'Ala',

  GAU: 'Asp',
  GAC: 'Asp',
  GAA: 'Glu',
  GAG: 'Glu',

  GGU: 'Gly',
  GGC: 'Gly',
  GGA: 'Gly',
  GGG: 'Gly',
} as const;

export const aminoAcidToNameLookup: Record<AminoAcid, AminoAcidName> = {
  Ala: 'Alanine',
  Arg: 'Arginine',
  Asn: 'Asparagine',
  Asp: 'Aspartic acid',
  Cys: 'Cysteine',
  Gln: 'Glutamine',
  Glu: 'Glutamic acid',
  Gly: 'Glycine',
  His: 'Histidine',
  Ile: 'Isoleucine',
  Leu: 'Leucine',
  Lys: 'Lysine',
  Met: 'Methionine',
  Phe: 'Phenylalanine',
  Pro: 'Proline',
  Ser: 'Serine',
  STOP: 'STOP',
  Thr: 'Threonine',
  Trp: 'Tryptophan',
  Tyr: 'Tyrosine',
  Val: 'Valine',
} as const;

export const aminoAcidToLetterLookup: Record<AminoAcid, AminoAcidLetter> = {
  Ala: 'A',
  Arg: 'R',
  Asn: 'N',
  Asp: 'D',
  Cys: 'C',
  Glu: 'E',
  Gln: 'Q',
  Gly: 'G',
  His: 'H',
  Ile: 'I',
  Leu: 'L',
  Lys: 'K',
  Met: 'M',
  Phe: 'F',
  Pro: 'P',
  Ser: 'S',
  STOP: 'STOP',
  Thr: 'T',
  Trp: 'W',
  Tyr: 'Y',
  Val: 'V',
} as const;

export const aminoAcidToPropertyLookup: Record<AminoAcid, null | AminoAcidProp> = {
  Ala: 'Nonpolar',
  Arg: 'Basic',
  Asn: 'Polar',
  Asp: 'Acidic',
  Cys: 'Polar',
  Gln: 'Polar',
  Glu: 'Acidic',
  Gly: 'Nonpolar',
  His: 'Basic',
  Ile: 'Nonpolar',
  Leu: 'Nonpolar',
  Lys: 'Basic',
  Met: 'Nonpolar',
  Phe: 'Nonpolar',
  Pro: 'Nonpolar',
  Ser: 'Polar',
  STOP: null,
  Thr: 'Nonpolar',
  Trp: 'Nonpolar',
  Tyr: 'Polar',
  Val: 'Nonpolar',
} as const;

