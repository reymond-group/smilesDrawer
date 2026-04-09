function flash(element) {
    element.classList.add('flash');
    setTimeout(() => {
       element.classList.remove('flash');
    }, 500);
}

function installExporters(getSvg) {
    function attachListener(id, event, handler) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    function download(href, filename) {
        const a = document.createElement('a');
        a.setAttribute('download', filename);
        a.setAttribute('href', href);
        a.click();
    }

    async function getXml() {
        return new XMLSerializer().serializeToString(await getSvg());
    }

    async function getCanvas() {
        return new Promise(async (resolve, reject) => {
            const img = document.createElement('img');
            img.onerror = function(error) {reject(error);}
            img.onload  = function() {
                const canvas  = document.createElement('canvas');
                canvas.width  = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
                resolve(canvas);
            }

            // This triggers the (async) load process that will eventually resolve or reject:
            img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(await getXml());
        });
    }

    attachListener('copy-png', 'click', async (event) => {
        const canvas = await getCanvas();
        const blob   = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const cbitem = new ClipboardItem({'image/png': blob});
        await navigator.clipboard.write([cbitem]);
        flash(event.target);
    });

    attachListener('copy-svg', 'click', async (event) => {
        try {
            const cbitem = new ClipboardItem({'image/svg+xml': await getXml()});
            await navigator.clipboard.write([cbitem]);
            flash(event.target);
        }
        catch (error) {
            alert('Your browser does not support copying SVGs as images. Try copying the SVG source as text or downloading the SVG instead.');
            event.target.disabled = true;
        }
    });

    attachListener('copy-xml', 'click', async (event) => {
        await navigator.clipboard.writeText(await getXml());
        flash(event.target);
    });

    attachListener('save-png', 'click', async (event) => {
        const canvas = await getCanvas();
        download(canvas.toDataURL(), 'molecule.png');
    });

    attachListener('save-svg', 'click', async (event) => {
        const data_url = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(await getXml());
        download(data_url, 'molecule.svg');
    });
}

function setOptions(element, options) {
    // Assign any existing values in `options` to the corresponding inputs:
    for (const [name, value] of Object.entries(options)) {
        const input = element.querySelector('[name=' + name + ']');
        if (input instanceof HTMLInputElement) {
            if (input.type === 'checkbox') {
                input.checked = !!value;
            }
            else if (input.type === 'number') {
                // Hide tiny floating point inaccuracies:
                // https://stackoverflow.com/q/3612744
                input.value = parseFloat(value.toFixed(6));
            }
            else {
                input.value = value;
            }
        }
        else if (input instanceof HTMLSelectElement) {
            input.value = value;
        }
        else {
            console.warn('Couldn\'t find an input for ' + name);
        }
    }
}

function installOptions(element, options, callback) {
    setOptions(element, options);

    // Update `options` whenever an input changes:
    element.addEventListener('change', (event) => {
        const name  = event.target.name;
        let   value = event.target.value;

        if (event.target.getAttribute('type') === 'number') {
            value = parseFloat(value);
        }
        else if (event.target.getAttribute('type') === 'checkbox') {
            value = event.target.checked;
        }

        options[name] = value;
        if (callback) {
            callback(event, name, value);
        }
    });
}
