<script>
    import Molecule from './Molecule.svelte';

    const options = {width: 300, height: 200};
</script>

<div>
    <Molecule options={options} smiles="C" />
    <Molecule options={options} smiles="CC" />
    <Molecule options={options} smiles="CCC" />
    <Molecule options={options} smiles="CCCC" />
</div>
