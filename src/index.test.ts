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

import sequenceCovidBNT162b2 from './data/sequenceCovidBNT162b2';
import sequenceCovidMRNA1273 from './data/sequenceCovidMRNA1273';

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
    expect(getAminoAcidFromCodon('ATG', 'dna')).toEqual('M');
    expect(getAminoAcidFromCodon('GGG', 'dna')).toEqual('G');
    expect(getAminoAcidFromCodon('TGA', 'dna')).toEqual(null);
    expect(() => getAminoAcidFromCodon('UGA', 'dna')).toThrow(
      'Cannot find an amino acid for invalid dna codon: "UGA"',
    );

    expect(getAminoAcidFromCodon('AUG', 'rna')).toEqual('M');
    expect(getAminoAcidFromCodon('GGG', 'rna')).toEqual('G');
    expect(getAminoAcidFromCodon('UGA', 'rna')).toEqual(null);
    expect(() => getAminoAcidFromCodon('TGA', 'rna')).toThrow(
      'Cannot find an amino acid for invalid rna codon: "TGA"',
    );
  });

  test('getAminoAcidDef', () => {
    expect(getAminoAcidDef('M')).toEqual({
      acid: 'M',
      abbr: 'Met',
      name: 'Methionine',
      property: 'Nonpolar',
    });
    expect(getAminoAcidDef('STOP')).toEqual({
      acid: 'STOP',
      abbr: 'STOP',
      name: 'STOP',
      property: null,
    });
    expect(getAminoAcidDef('I')).toEqual({
      acid: 'I',
      abbr: 'Ile',
      name: 'Isoleucine',
      property: 'Nonpolar',
    });
  });

  test('translateSequenceToPolypeptide', () => {
    expect(() => translateSequenceToPolypeptide('')).toThrow(
      'Cannot find an amino acid for invalid rna codon: ""',
    );

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAU')).toEqual({
      polypeptide: ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y'],
      remainingSequence: '',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAA')).toEqual({
      polypeptide: ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y'],
      remainingSequence: 'UAA',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGA')).toEqual({
      polypeptide: ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y'],
      remainingSequence: 'UAAUGA',
    });

    expect(translateSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGAUUU')).toEqual({
      polypeptide: ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y'],
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

  test('Composed Functions', () => {
    const dnaSequence = 'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGATAG';
    const dnaSequenceSm = 'ATGAGATATGCA';
    const dnaSequenceMd = 'ATGCATAGAAAGCGAATA';
    const dnaSequenceLg = 'ATGACACGATATGAGATATGCATAGAAAGCGAATATAGA';
    const rnaSequenceLg = 'UACUGUGCUAUACUCUAUACGUAUCUUUCGCUUAUAUCU';
    const polypeptide = [
      'Y',
      'C',
      'A',
      'I',
      'L',
      'Y',
      'T',
      'Y',
      'L',
      'S',
      'L',
      'I',
      'S',
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

  test('sequenceCovidBNT162b2 -> parse', () => {
    const orfs = findOrfs(sequenceCovidBNT162b2, 'dna');
    const orfMaybe: string | undefined = getLongestOrf(orfs);

    if (!orfMaybe) throw new Error('orf must be defined');
    const orf: string = orfMaybe;

    const translation = translateSequenceToPolypeptide(orf, [], 'dna');
    expect(translation.polypeptide.join('')).toEqual(
      'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIVNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLEGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQTLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNFNFNGLTGTGVLTESNKKFLPFQQFGRDIADTTDAVRDPQTLEILDITPCSFGGVSVITPGTNTSNQVAVLYQDVNCTEVPVAIHADQLTPTWRVYSTGSNVFQTRAGCLIGAEHVNNSYECDIPIGAGICASYQTQTNSPRRARSVASQSIIAYTMSLGAENSVAYSNNSIAIPTNFTISVTTEILPVSMTKTSVDCTMYICGDSTECSNLLLQYGSFCTQLNRALTGIAVEQDKNTQEVFAQVKQIYKTPPIKDFGGFNFSQILPDPSKPSKRSFIEDLLFNKVTLADAGFIKQYGDCLGDIAARDLICAQKFNGLTVLPPLLTDEMIAQYTSALLAGTITSGWTFGAGAALQIPFAMQMAYRFNGIGVTQNVLYENQKLIANQFNSAIGKIQDSLSSTASALGKLQDVVNQNAQALNTLVKQLSSNFGAISSVLNDILSRLDPPEAEVQIDRLITGRLQSLQTYVTQQLIRAAEIRASANLAATKMSECVLGQSKRVDFCGKGYHLMSFPQSAPHGVVFLHVTYVPAQEKNFTTAPAICHDGKAHFPREGVFVSNGTHWFVTQRNFYEPQIITTDNTFVSGNCDVVIGIVNNTVYDPLQPELDSFKEELDKYFKNHTSPDVDLGDISGINASVVNIQKEIDRLNEVAKNLNESLIDLQELGKYEQYIKWPWYIWLGFIAGLIAIVMVTIMLCCMTSCCSCLKGCCSCGSCCKFDEDDSEPVLKGVKLHYT',
    );
  });

  test('sequenceCovidMRNA1273 -> parse', () => {
    const orfs = findOrfs(sequenceCovidMRNA1273, 'dna');
    const orfMaybe: string | undefined = getLongestOrf(orfs);

    if (!orfMaybe) throw new Error('orf must be defined');
    const orf: string = orfMaybe;

    const translation = translateSequenceToPolypeptide(orf, [], 'dna');
    expect(translation.polypeptide.join('')).toEqual(
      'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIVNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLEGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQTLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNFNFNGLTGTGVLTESNKKFLPFQQFGRDIADTTDAVRDPQTLEILDITPCSFGGVSVITPGTNTSNQVAVLYQDVNCTEVPVAIHADQLTPTWRVYSTGSNVFQTRAGCLIGAEHVNNSYECDIPIGAGICASYQTQTNSPRRARSVASQSIIAYTMSLGAENSVAYSNNSIAIPTNFTISVTTEILPVSMTKTSVDCTMYICGDSTECSNLLLQYGSFCTQLNRALTGIAVEQDKNTQEVFAQVKQIYKTPPIKDFGGFNFSQILPDPSKPSKRSFIEDLLFNKVTLADAGFIKQYGDCLGDIAARDLICAQKFNGLTVLPPLLTDEMIAQYTSALLAGTITSGWTFGAGAALQIPFAMQMAYRFNGIGVTQNVLYENQKLIANQFNSAIGKIQDSLSSTASALGKLQDVVNQNAQALNTLVKQLSSNFGAISSVLNDILSRLDPPEAEVQIDRLITGRLQSLQTYVTQQLIRAAEIRASANLAATKMSECVLGQSKRVDFCGKGYHLMSFPQSAPHGVVFLHVTYVPAQEKNFTTAPAICHDGKAHFPREGVFVSNGTHWFVTQRNFYEPQIITTDNTFVSGNCDVVIGIVNNTVYDPLQPELDSFKEELDKYFKNHTSPDVDLGDISGINASVVNIQKEIDRLNEVAKNLNESLIDLQELGKYEQYIKWPWYIWLGFIAGLIAIVMVTIMLCCMTSCCSCLKGCCSCGSCCKFDEDDSEPVLKGVKLHYT',
    );
  });
});
