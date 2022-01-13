import {
  getBaseName,
  transcribeDnaToRna,
  transcribeRnaToDna,
  getAminoAcidFromCodon,
  getAminoAcidDef,
  translateSequenceToPolypeptide,
  findOrfs,
  getLongestOrf,
} from './index';

describe('index', () => {
  test('getBaseName', () => {
    expect(getBaseName('A')).toEqual('Adenine');
    expect(getBaseName('C')).toEqual('Cytosine');
    expect(getBaseName('G')).toEqual('Guanine');
    expect(getBaseName('T')).toEqual('Thymine');
    expect(getBaseName('U')).toEqual('Uracil');
  });

  test('transcribeDnaToRna', () => {
    expect(transcribeDnaToRna('ACTGACTG')).toEqual('UGACUGAC');
  });

  test('transcribeRnaToDna', () => {
    expect(transcribeRnaToDna('UGACUGAC')).toEqual('ACTGACTG');
  });

  test('getAminoAcidFromCodon', () => {
    expect(getAminoAcidFromCodon('ATG', 'dna')).toEqual('Met');
    expect(getAminoAcidFromCodon('GGG', 'dna')).toEqual('Gly');
    expect(getAminoAcidFromCodon('TGA', 'dna')).toEqual(null);
    expect(() => getAminoAcidFromCodon('UGA', 'dna')).toThrow(
      'Cannot find an amino acid for invalid dna codon: "UGA"',
    );

    expect(getAminoAcidFromCodon('AUG', 'rna')).toEqual('Met');
    expect(getAminoAcidFromCodon('GGG', 'rna')).toEqual('Gly');
    expect(getAminoAcidFromCodon('UGA', 'rna')).toEqual(null);
    expect(() => getAminoAcidFromCodon('TGA', 'rna')).toThrow(
      'Cannot find an amino acid for invalid rna codon: "TGA"',
    );
  });

  test('getAminoAcidDef', () => {
    expect(getAminoAcidDef('Met')).toEqual({
      abbr: 'Met',
      letter: 'M',
      name: 'Methionine',
      property: 'Nonpolar',
    });
    expect(getAminoAcidDef('STOP')).toEqual({
      abbr: 'STOP',
      letter: 'STOP',
      name: 'STOP',
      property: null,
    });
    expect(getAminoAcidDef('Ile')).toEqual({
      abbr: 'Ile',
      letter: 'I',
      name: 'Isoleucine',
      property: 'Nonpolar',
    });
  });

  test('translateSequenceToPolypeptide', () => {
    expect(() => translateSequenceToPolypeptide('')).toThrow(
      'Cannot find an amino acid for invalid rna codon: ""',
    );

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAU')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: '',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAA')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAA',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGA')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAAUGA',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGAUUU')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAAUGAUUU',
    });
  });

  test('findOrfs', () => {
    const sequence = 'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGATAG';
    expect(findOrfs(sequence, 'dna')).toEqual([
      'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGA',
      'ATGAGATATGCA',
      'ATGCATAGAAAGCGAATA',
    ]);
  });

  test('getLongestOrf', () => {
    expect(getLongestOrf([
      'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGA',
      'ATGAGATATGCA',
      'ATGCATAGAAAGCGAATA',
    ])).toEqual('ATGACACGATATGAGATATGCATAGAAAGCGAATATAGA');
  });

  test('all', () => {
    const dnaSequence = 'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGATAG';
    const dnaSequenceSm = 'ATGAGATATGCA';
    const dnaSequenceMd = 'ATGCATAGAAAGCGAATA';
    const dnaSequenceLg = 'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGA';
    const rnaSequenceLg = 'UACUGUGCUAUACUCUAUACGUAUCUUUCGCUUAUAUCU';
    const polypeptide = [
      'Tyr',
      'Cys',
      'Ala',
      'Ile',
      'Leu',
      'Tyr',
      'Thr',
      'Tyr',
      'Leu',
      'Ser',
      'Leu',
      'Ile',
      'Ser',
    ];

    expect(findOrfs(dnaSequence, 'dna')).toEqual([dnaSequenceLg, dnaSequenceSm, dnaSequenceMd]);
    expect(getLongestOrf([dnaSequenceLg, dnaSequenceSm, dnaSequenceMd])).toEqual(dnaSequenceLg);
    expect(transcribeDnaToRna(dnaSequenceLg)).toEqual(rnaSequenceLg);
    expect(translateSequenceToPolypeptide(rnaSequenceLg).polypeptide).toEqual(polypeptide);

    expect(
      translateSequenceToPolypeptide(
        transcribeDnaToRna(
          getLongestOrf(
            findOrfs(dnaSequence, 'dna')
          ) || ''
        ),
      ).polypeptide,
    ).toEqual(polypeptide);
  });
});
