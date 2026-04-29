function e(type, attrs = {}, text = undefined) {
    const element = document.createElement(type)
    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value)
    }
    if(text) {
        element.innerText = text
    }
    return element
}

function loadTests(element, tests) {
    const mol_drawer = new SmilesDrawer.SmiDrawer({width: 200, height: 150, compactDrawing: false})
    const rxn_drawer = new SmilesDrawer.SmiDrawer({width: 500, height: 150, compactDrawing: false})

    tests.forEach((test) => {
        const div   = e('div', {class: 'test-case'})
        const desc  = e('div', {class: 'description'}, test.desc)
        div.append(desc)

        const status = e('span', {class: 'status ' + test.status}, '(typically ' + test.status + ')')
        desc.append(status)

        if (test.cause) {
            const cause = e('div', {class: 'cause'}, test.cause)
            div.append(cause)
        }

        test.smiles.forEach((smiles) => {
            if (smiles.includes('__')) {
                var chunks = [smiles, smiles.split(' ', 1)];
            }
            else {
                var chunks = smiles.split(/\s+/)
            }

            const frame   = e('div', {class: 'frame'})
            const caption = e('div', {class: 'caption', title: chunks[0]}, chunks[1] || chunks[0])

            const drawer = smiles.includes('>')? rxn_drawer : mol_drawer;
            drawer.draw(chunks[0], 'canvas', 'light',
                canvas => {frame.append(canvas)},
                error  => {console.log(error)}
            )

            frame.append(caption)
            div.append(frame)
        })

        element.append(div)
    })
}
