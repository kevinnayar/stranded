export type BaseSymbol = 'A' | 'C' | 'G' | 'T' | 'U';

export type BaseName = 'Adenine' | 'Cytosine' | 'Guanine' | 'Thymine' | 'Uracil';

export type AminoAcid =
  | 'A'
  | 'R'
  | 'N'
  | 'D'
  | 'C'
  | 'E'
  | 'Q'
  | 'G'
  | 'H'
  | 'I'
  | 'L'
  | 'K'
  | 'M'
  | 'F'
  | 'P'
  | 'S'
  | 'STOP'
  | 'T'
  | 'W'
  | 'Y'
  | 'V';

export type AminoAcidAbbr =
  | 'Phe'
  | 'Leu'
  | 'Ser'
  | 'Tyr'
  | 'STOP'
  | 'Cys'
  | 'Trp'
  | 'Pro'
  | 'His'
  | 'Gln'
  | 'Arg'
  | 'Ile'
  | 'Met'
  | 'Thr'
  | 'Asn'
  | 'Lys'
  | 'Val'
  | 'Ala'
  | 'Asp'
  | 'Glu'
  | 'Gly';

export type AminoAcidName =
  | 'Alanine'
  | 'Arginine'
  | 'Asparagine'
  | 'Aspartic acid'
  | 'Cysteine'
  | 'Glutamine'
  | 'Glutamic acid'
  | 'Glycine'
  | 'Histidine'
  | 'Isoleucine'
  | 'Leucine'
  | 'Lysine'
  | 'Methionine'
  | 'Phenylalanine'
  | 'Proline'
  | 'Serine'
  | 'STOP'
  | 'Threonine'
  | 'Tryptophan'
  | 'Tyrosine'
  | 'Valine';

export type AminoAcidProp = 'Nonpolar' | 'Polar' | 'Basic' | 'Acidic';

export type AminoAcidDef = {
  acid: AminoAcid;
  name: AminoAcidName;
  abbr: AminoAcidAbbr;
  property: null | AminoAcidProp;
};


