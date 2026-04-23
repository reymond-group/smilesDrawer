"""
Generate reference R/S stereochemistry assignments using RDKit.

Reads the molecule list, computes CIP assignments, and writes a JSON
file that the JS test suite can compare against SmilesDrawer's output.

Usage:
    python3 test/stereo-reference/generate-reference.py
"""
import json
import os
from rdkit import Chem
from rdkit.Chem import AllChem, Descriptors
from rdkit.Chem.rdCIPLabeler import AssignCIPLabels


MOLECULES = [
    # Stereocenters
    ['L-Alanine', 'N[C@@H](C)C(=O)O'],
    ['D-Alanine', 'N[C@H](C)C(=O)O'],
    ['L-Serine', 'N[C@@H](CO)C(=O)O'],
    ['L-Threonine', 'N[C@@H]([C@@H](O)C)C(=O)O'],
    ['L-Cysteine', 'N[C@@H](CS)C(=O)O'],
    ['L-Leucine', 'N[C@@H](CC(C)C)C(=O)O'],
    ['L-Isoleucine', 'N[C@@H]([C@H](C)CC)C(=O)O'],
    ['L-Proline', 'OC(=O)[C@@H]1CCCN1'],
    ['L-Phenylalanine', 'N[C@@H](Cc1ccccc1)C(=O)O'],
    ['L-Tryptophan', 'N[C@@H](Cc1c[nH]c2ccccc12)C(=O)O'],
    ['D-Glucose', 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O'],
    ['D-Ribose', 'OC[C@H]1OC(O)[C@H](O)[C@@H]1O'],
    ['(S)-Ibuprofen', 'CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O'],
    ['(R)-Mandelic acid', 'OC(=O)[C@@H](O)c1ccccc1'],
    ['L-Tartaric acid', 'OC(=O)[C@@H](O)[C@@H](O)C(=O)O'],
    ['meso-Tartaric acid', 'OC(=O)[C@@H](O)[C@H](O)C(=O)O'],
    ['Problematic stereo mol', 'ClC1=CC=C(C=C1)COC[C@H]2N(CCC2)CCC3=CC=C(C=C3)OC'],
    # Drugs with stereo
    ['Epinephrine', 'CNC[C@@H](O)c1ccc(O)c(O)c1'],
    ['Nicotine', 'CN1CCC[C@H]1c1cccnc1'],
    ['Penicillin G', 'OC(=O)[C@@H]1C(=O)N2[C@@H]1SC(C)(C)[C@H]2C(=O)NCc1ccccc1'],
    ['Ampicillin', 'N[C@@H](c1ccccc1)C(=O)N[C@H]1[C@@H]2SC(C)(C)[C@@H](N2C1=O)C(=O)O'],
    ['Amoxicillin', 'N[C@@H](c1ccc(O)cc1)C(=O)N[C@H]1[C@@H]2SC(C)(C)[C@@H](N2C1=O)C(=O)O'],
    ['Artemisinin', 'C[C@@H]1CC[C@H]2[C@@H](C)C(=O)O[C@@H]3O[C@@]4(C)CC[C@@H]1[C@@]23OO4'],
    ['Morphine', 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O'],
    ['Codeine v1', 'CN1CC[C@]23[C@@H]4[C@H]1Cc5c2c(c(cc5)OC)O[C@H]3[C@H](C=C4)O'],
    ['Codeine v2', 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)OC)O[C@H]3[C@H](C=C4)O'],
    ['Codeine v3', 'CN1CC[C@]23[C@@H]4[C@H]1CC5C2=C(C(=CC=5)OC)O[C@H]3[C@H](C=C4)O'],
    ['Not Codeine v1', 'COc1ccc2C[C@@H]3N(C)CC[C@]45[C@@H]3Oc1c2[C@@H]4O[C@H]5CC=C'],
    # TODO: Re-enable these when we have better Kekulization:
    # ['Not Codeine v2', 'COC1C=CC=2C[C@@H]3N(C)CC[C@]45[C@@H]3OC=1C2[C@@H]4O[C@H]5CC=C'],
    # ['Not Codeine v3', 'COC1=CC=C2C[C@@H]3N(C)CC[C@]45[C@@H]3OC1=C2[C@@H]4O[C@H]5CC=C'],
    # Nucleotides
    ['Adenosine', 'n2c1c(ncnc1n(c2)[C@@H]3O[C@@H]([C@@H](O)[C@H]3O)CO)N'],
    ['AMP', 'Nc1ncnc2c1ncn2[C@@H]1O[C@H](COP(=O)(O)O)[C@@H](O)[C@H]1O'],
    ['NAD+', 'O=C(N)c1ccc[n+](c1)[C@H]2[C@H](O)[C@H](O)[C@H](O2)COP([O-])(=O)OP(=O)(O)OC[C@H]3O[C@@H](n4cnc5c4ncnc5N)[C@@H]([C@@H]3O)OP(=O)(O)O'],
    ['AZT-like', 'O=C1NC(C(C)=CN1[C@@H]2O[C@H](CO)[C@@H](N=[N+]=[N-])C2)=O'],
    ['GlcNAc', 'CC(=O)N[C@@H]1[C@H](O)[C@@H](O)[C@H](CO)O[C@H]1O'],
    ['Sucrose', 'OC[C@H]1O[C@@](CO)(O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O'],
    ['Glutathione', 'N[C@@H](CCC(=O)N[C@@H](CS)C(=O)NCC(=O)O)C(=O)O'],
    # Sugars
    ['D-Galactose', 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@H]1O'],
    ['D-Mannose', 'OC[C@H]1OC(O)[C@@H](O)[C@@H](O)[C@@H]1O'],
    ['D-Fructose', 'OC[C@@H](O)[C@@H](O)[C@H](O)C(=O)CO'],
    # Cholesterol
    ['Cholesterol', '[C@@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C'],
    ['Taxol', 'CC1=C2[C@@]([C@]([C@H]([C@@H]3[C@]4([C@H](OC4)C[C@@H]([C@]3(C(=O)[C@@H]2OC(=O)C)C)O)OC(=O)C)OC(=O)c5ccccc5)(C[C@@H]1OC(=O)[C@H](O)[C@@H](NC(=O)c6ccccc6)c7ccccc7)O)(C)C'],
    # Complex drugs & natural products
    ['Quinine', 'OC(c1ccnc2ccc(OC)cc12)[C@@H]3C[C@H]4CC[C@@H](C3)N4C=C'],
    ['Quinidine', 'OC(c1ccnc2ccc(OC)cc12)[C@H]3C[C@@H]4CC[C@H](C3)N4C=C'],
    ['Erythromycin', 'CC[C@@H]1OC(=O)[C@H](C)[C@@H](O[C@H]2C[C@@](C)(OC)[C@@H](O)[C@H](C)O2)[C@H](C)[C@@H](O[C@@H]3O[C@H](C)C[C@@H]([C@H]3O)N(C)C)[C@](C)(O)C[C@@H](C)C(=O)[C@H](C)[C@@H](O)[C@]1(C)O'],
    ['Doxorubicin', 'COc1cccc2c1C(=O)c1c(O)c3c(c(O)c1C2=O)C[C@@](O)(C[C@@H]3O[C@H]1C[C@H](N)[C@H](O)[C@H](C)O1)C(=O)CO'],
    ['Vinblastine', '[H][C@]89CN(CCc1c([nH]c2ccccc12)[C@@](C(=O)OC)(c3cc4c(cc3OC)N(C)[C@@]5([H])[C@@](O)(C(=O)OC)[C@H](OC(C)=O)[C@]7(CC)C=CCN6CC[C@]45[C@@]67[H])C8)C[C@](O)(CC)C9'],
    ['Strychnine', 'O=C1C[C@H]2OCC=C3C[C@H]4[C@@H](N5CC[C@@]61[C@@H]5C=CC4)N3C6=CC=C2'],
    ['Reserpine', 'CO[C@H]1[C@@H](CC2=C1NC1=CC(OC)=CC=C21)C(=O)OC'],
    ['Colchicine', 'CC(=O)N[C@H]1CCC2=CC(=C(C(=C2C3=CC=C(C(=O)C=C13)OC)OC)OC)OC'],
    ['Atorvastatin', 'CC(C)c1n(CC[C@@H](O)C[C@@H](O)CC(=O)O)c(c2ccc(F)cc2)c(c1c1ccccc1)C(=O)Nc1ccccc1'],
    ['Simvastatin', 'CCC(C)(C)C(=O)O[C@H]1C[C@@H](O)C=C2C=C[C@H](C)[C@H](CC[C@@H](O)CC(=O)O)[C@@H]21'],
    ['Lovastatin', 'CC[C@H](C)C(=O)O[C@H]1C[C@@H](O)C=C2C=C[C@H](C)[C@H](CC[C@@H](O)CC(=O)O)[C@@H]21'],
    ['Methotrexate', 'CN(Cc1cnc2nc(N)nc(N)c2n1)c1ccc(C(=O)N[C@@H](CCC(=O)O)C(=O)O)cc1'],
    ['Captopril', 'C[C@@H](CS)C(=O)N1CCC[C@H]1C(=O)O'],
    ['Enalapril', 'CCOC(=O)[C@@H](CCc1ccccc1)N[C@@H](C)C(=O)N1CCC[C@H]1C(=O)O'],
    ['Lisinopril', 'NCCCC[C@@H](N[C@@H](CCc1ccccc1)C(=O)O)C(=O)N1CCC[C@H]1C(=O)O'],
    ['Warfarin', 'CC(=O)CC(c1ccccc1)c1c(O)c2ccccc2oc1=O'],
    ['Clopidogrel', 'COC(=O)[C@H](c1ccccc1Cl)N1CCc2sccc2C1'],
    ['Oseltamivir', 'CCOC(=O)C1=C[C@@H](OC(CC)CC)[C@H](NC(C)=O)[C@@H](N)C1'],
    ['Lopinavir', 'CC(C)[C@@H](NC(=O)[C@@H](CC(=O)N[C@H](Cc1ccccc1)[C@H](O)C[C@@H](Cc1ccccc1)NC(=O)C(C)(C)C)CC1CCCCCC1)C(=O)O'],
    ['Ritonavir', 'CC(C)[C@@H](NC(=O)N(C)Cc1csc(n1)C(C)C)C(=O)N[C@@H](C[C@@H](O)[C@H](Cc1ccccc1)NC(=O)OCc1cncs1)Cc1ccccc1'],
    # Terpenes & natural products
    ['Menthol', 'C[C@@H]1CC[C@H](C(C)C)[C@@H](O)C1'],
    ['Camphor', 'CC1(C)[C@@H]2CC[C@]1(C)C(=O)C2'],
    ['alpha-Pinene', 'CC1=CC[C@@H]2C[C@H]1C2(C)C'],
    ['Limonene', 'C=C(C)[C@@H]1CC=C(C)CC1'],
    ['Carvone', 'C=C(C)[C@@H]1CC=C(C)C(=O)C1'],
    ['Borneol', 'CC1(C)[C@@H]2CC[C@]1(C)[C@@H](O)C2'],
    ['Testosterone', 'C[C@]12CC[C@H]3[C@@H](CCC4=CC(=O)CC[C@@]34C)[C@@H]1CC[C@@H]2O'],
    ['Estradiol v1', 'C[C@]12CC[C@H]3[C@@H](CCc4cc(O)ccc43)[C@@H]1CC[C@@H]2O'],
    ['Estradiol v2', 'Oc1ccc2[C@H]3CC[C@]4(C)[C@]5(CC[C@H]4[C@@H]3CCc2c1).O5'],
    ['Estradiol v3', 'C[C@]12CC[C@H]3[C@@H](CCC4=CC(O)=CC=C43)[C@@H]1CC[C@@H]2O'],
    ['Estradiol v4', 'C[C@]12CC[C@H]3[C@@H](CCC4C=C(O)C=CC=43)[C@@H]1CC[C@@H]2O'],
    ['Progesterone', 'C[C@]12CC[C@H]3[C@@H](CCC4=CC(=O)CC[C@@]34C)[C@@H]1CC[C@@H]2C(=O)C'],
    ['Cortisol', 'O[C@@]1(CC[C@@H]2[C@@H]1CC[C@H]1[C@H]3CCC(=O)C=C3CC[C@@]21C)C(=O)CO'],
    ['Dexamethasone', 'C[C@@H]1C[C@H]2[C@@H]3CCC4=CC(=O)C=C[C@]4(C)[C@@]3(F)[C@@H](O)C[C@]2(C)[C@@]1(O)C(=O)CO'],
    # Antibiotics
    ['Ciprofloxacin', 'OC(=O)c1cn(C2CC2)c2cc(N3CCNCC3)c(F)cc2c1=O'],
    ['Levofloxacin', 'C[C@H]1COc2c(N3CCN(C)CC3)c(F)cc3c(=O)c(cn1c23)C(=O)O'],
    ['Azithromycin', 'CC[C@@H]1OC(=O)[C@H](C)[C@@H](O[C@H]2C[C@@](C)(OC)[C@@H](O)[C@H](C)O2)[C@H](C)[C@@H](O[C@@H]3O[C@H](C)C[C@@H]([C@H]3O)N(C)C)[C@](C)(O)C[C@@H](C)CN(C)[C@H](C)[C@@H](O)[C@]1(C)O'],
    ['Daptomycin partial', 'CCCCCCCCCC(=O)N[C@@H](CC(=O)O)C(=O)N[C@H]1CC(=O)N[C@@H](CC(N)=O)C(=O)O1'],
    # Carbohydrates
    ['L-Fucose', 'C[C@@H]1OC(O)[C@@H](O)[C@H](O)[C@@H]1O'],
    ['N-Acetylneuraminic acid v1', 'CC(=O)N[C@@H]1[C@@H](O)C[C@@](O)(OC1[C@H](O)[C@H](O)CO)C(=O)O'],
    ['N-Acetylneuraminic acid v2', 'OC(=O)[C@@]1(O)C[C@H](O)[C@@H](NC(C)=O)[C@@H](O1)[C@H](O)[C@H](O)CO'],
    ['Trehalose v1', 'OC[C@H]1OC(O[C@@H]2OC(CO)[C@@H](O)[C@H](O)[C@H]2O)[C@H](O)[C@@H](O)[C@@H]1O'],
    ['Trehalose v2', 'OC[C@H]1OC(O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@H](O)[C@@H](O)[C@@H]1O'],
    ['Trehalose v3', 'OC[C@@H]1[C@@H](O)[C@H](O)[C@@H](O)[C@H](O1)O[C@@H]2[C@H](O)[C@@H](O)[C@H](O)[C@H](O2)CO'],
    # Macrocycles & complex
    ['Rapamycin partial', 'CO[C@@H]1C[C@@H](CC(=O)[C@@H](CC=C)C(=O)O1)OC'],
    ['Epothilone B', 'CC(/C=C/C1=CSC(C)=N1)[C@@H]1C[C@@H]2O[C@]2(C)CCC[C@@H](O)C(=O)C(=C)[C@@H](C)C(=O)O1'],

    # # Kekulization test cases
    # ['Same DB Pattern', 'C1=NC=CC=C1[C@H](F)C2=CC=CN=C2'],
    # ['Different DB Pattern', 'C1N=CC=CC=1[C@H](F)C2=CC=CN=C2'],
    # ['One Aromatic', 'c1ncccc1[C@H](F)C2=CC=CN=C2'],
    # ['Other Aromatic', 'C1N=CC=CC=1[C@H](F)c2cccnc2'],
    # ['Both Aromatic', 'c1ncccc1[C@H](F)c2cccnc2'],
    # ['One Saturated', 'c1ncccc1[C@H](F)C2CCCNC2'],
    # ['Other Saturated', 'C1NCCCC1[C@H](F)c2cccnc2'],
    # ['Both Saturated', 'C1NCCCC1[C@H](F)C2CCCNC2'],

    # Priority ordering tests
    ['Priority Test v1', 'FOOC(CCl)[C@H](F)C(CF)OOCl'],
    ['Priorirt Test v2', 'FOOC(CCl)[C@@H](F)C(CF)OOCl'],
]


def get_cip_assignments(smiles):
    """Return list of {atomIdx, element, cip} for all CIP stereocenters."""
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None

    # Assign CIP codes
    # Chem.AssignStereochemistry(mol, cleanIt=True, force=True)
    AssignCIPLabels(mol)

    centers = []
    for atom in mol.GetAtoms():
        cip = atom.GetPropsAsDict().get('_CIPCode', None)
        if cip:
            centers.append({
                'atomIdx': atom.GetIdx(),
                'element': atom.GetSymbol(),
                'cip':     cip.upper(),
            })

    return centers


def main():
    reference = {}
    errors = []

    for name, smiles in MOLECULES:
        result = get_cip_assignments(smiles)
        if result is None:
            errors.append(f"RDKit could not parse: {name} ({smiles})")
            continue

        reference[smiles] = {
            'name': name,
            'centers': result,
        }

        # Print summary
        if result:
            descs = [f"  atom {c['atomIdx']}({c['element']}): {c['cip']}" for c in result]
            print(f"{name}: {len(result)} stereocenters")
            for d in descs:
                print(d)
        else:
            print(f"{name}: no stereocenters detected")

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors:
            print(f"  {e}")

    # Write reference file
    out_path = os.path.join(os.path.dirname(__file__), 'reference.json')
    with open(out_path, 'w') as f:
        json.dump(reference, f, indent=2)

    print(f"\nWrote {len(reference)} molecules to {out_path}")


if __name__ == '__main__':
    main()
