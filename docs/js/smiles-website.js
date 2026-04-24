(function(window) {
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var DEFAULT_RENDER_OPTIONS = {
        scale: 0,
        width: 550,
        height: 450,
        bondThickness: 1.1,
        bondLength: 19,
        shortBondLength: 0.6,
        bondSpacing: 3.2,
        fontSizeLarge: 6.3,
        fontSizeSmall: 2.4,
        padding: 10
    };

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    function isPlainObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    function clone(value) {
        var result;
        var key;
        var i;

        if (isArray(value)) {
            result = [];
            for (i = 0; i < value.length; i++) {
                result.push(clone(value[i]));
            }
            return result;
        }

        if (isPlainObject(value)) {
            result = {};
            for (key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    result[key] = clone(value[key]);
                }
            }
            return result;
        }

        return value;
    }

    function mergeInto(target, source) {
        var key;

        if (!isPlainObject(source)) {
            return target;
        }

        for (key in source) {
            if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

            if (isPlainObject(source[key]) && isPlainObject(target[key])) {
                mergeInto(target[key], source[key]);
            } else if (isPlainObject(source[key])) {
                target[key] = clone(source[key]);
            } else if (isArray(source[key])) {
                target[key] = clone(source[key]);
            } else {
                target[key] = source[key];
            }
        }

        return target;
    }

    function mergeObjects() {
        var result = {};
        var i;

        for (i = 0; i < arguments.length; i++) {
            mergeInto(result, arguments[i]);
        }

        return result;
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function round(value, decimals) {
        var factor = Math.pow(10, decimals || 0);
        return Math.round(value * factor) / factor;
    }

    function ensureOption(options, key, fallback) {
        if (typeof options[key] === 'undefined' || options[key] === null || options[key] === '') {
            options[key] = fallback;
        }
    }

    function getDefaultRenderOptions() {
        return clone(DEFAULT_RENDER_OPTIONS);
    }

    function waitForFonts(callback) {
        if (!callback) return;

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function() {
                window.requestAnimationFrame(callback);
            }, function() {
                window.requestAnimationFrame(callback);
            });
            return;
        }

        window.addEventListener('load', function() {
            window.requestAnimationFrame(callback);
        }, {once: true});
    }

    function getPageTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    function isReaction(smiles) {
        var depth = 0;
        var i;

        for (i = 0; i < smiles.length; i++) {
            if (smiles[i] === '[') depth++;
            else if (smiles[i] === ']') depth--;
            else if (smiles[i] === '>' && depth === 0) return true;
        }

        return false;
    }

    function estimateComplexity(smiles) {
        var ringMarkers = (smiles.match(/%\d{2}|\d/g) || []).length;
        var branches = (smiles.match(/[()]/g) || []).length;
        var stereo = (smiles.match(/@/g) || []).length;
        var hetero = (smiles.match(/Br|Cl|Si|Na|Li|Ca|Mg|[NOSPFIB]/g) || []).length;
        var charges = (smiles.match(/[+-]/g) || []).length;
        var bonds = (smiles.match(/[=#]/g) || []).length;

        return {
            length: smiles.length,
            ringMarkers: ringMarkers,
            branches: branches,
            stereo: stereo,
            hetero: hetero,
            charges: charges,
            bonds: bonds,
            score: smiles.length + ringMarkers * 4 + branches * 2 + stereo * 5 + hetero * 2 + charges * 3 + bonds
        };
    }

    function getMoleculeFactor(score) {
        if (score >= 360) return 0.34;
        if (score >= 240) return 0.44;
        if (score >= 180) return 0.56;
        if (score >= 140) return 0.64;
        if (score >= 100) return 0.76;
        if (score >= 70) return 0.86;
        if (score >= 45) return 0.94;
        return 1;
    }

    function getReactionFactor(score) {
        if (score >= 180) return 0.66;
        if (score >= 130) return 0.76;
        if (score >= 95) return 0.86;
        return 1;
    }

    function buildMoleculeOptions(baseOptions, smiles, settings) {
        var options = mergeObjects(getDefaultRenderOptions(), baseOptions || {});
        var adaptive = !settings || settings.adaptive !== false;
        var metrics = estimateComplexity(smiles);
        var factor = getMoleculeFactor(metrics.score);

        ensureOption(options, 'scale', DEFAULT_RENDER_OPTIONS.scale);
        ensureOption(options, 'bondThickness', DEFAULT_RENDER_OPTIONS.bondThickness);
        ensureOption(options, 'bondLength', DEFAULT_RENDER_OPTIONS.bondLength);
        ensureOption(options, 'shortBondLength', DEFAULT_RENDER_OPTIONS.shortBondLength);
        ensureOption(options, 'bondSpacing', DEFAULT_RENDER_OPTIONS.bondSpacing);
        ensureOption(options, 'fontSizeLarge', DEFAULT_RENDER_OPTIONS.fontSizeLarge);
        ensureOption(options, 'fontSizeSmall', DEFAULT_RENDER_OPTIONS.fontSizeSmall);
        ensureOption(options, 'padding', DEFAULT_RENDER_OPTIONS.padding);

        if (typeof options.isomeric === 'undefined') options.isomeric = true;
        if (typeof options.explicitHydrogens === 'undefined') options.explicitHydrogens = false;

        if (adaptive) {
            options.bondLength = round(clamp(options.bondLength * clamp(factor + 0.12, 0.46, 1), 7.2, DEFAULT_RENDER_OPTIONS.bondLength), 1);
            options.fontSizeLarge = round(clamp(options.fontSizeLarge * factor, 4.1, DEFAULT_RENDER_OPTIONS.fontSizeLarge), 1);
            options.fontSizeSmall = round(clamp(options.fontSizeSmall * clamp(factor + 0.08, 0.7, 1), 1.7, DEFAULT_RENDER_OPTIONS.fontSizeSmall), 1);
            options.padding = Math.round(clamp(options.padding * clamp(factor + 0.18, 0.7, 1), 6, 14));

            if (typeof options.compactDrawing === 'undefined') {
                options.compactDrawing = metrics.score >= 70;
            }
        } else if (typeof options.compactDrawing === 'undefined') {
            options.compactDrawing = true;
        }

        if (settings && settings.renderConfig) {
            options = mergeObjects(options, settings.renderConfig);
        }

        return {
            metrics: metrics,
            options: options
        };
    }

    function buildReactionOptions(baseOptions, smiles, settings) {
        var options = mergeObjects(getDefaultRenderOptions(), baseOptions || {});
        var adaptive = !settings || settings.adaptive !== false;
        var metrics = estimateComplexity(smiles);
        var factor = getReactionFactor(metrics.score);

        ensureOption(options, 'scale', DEFAULT_RENDER_OPTIONS.scale);
        ensureOption(options, 'bondThickness', DEFAULT_RENDER_OPTIONS.bondThickness);
        ensureOption(options, 'bondLength', DEFAULT_RENDER_OPTIONS.bondLength);
        ensureOption(options, 'shortBondLength', DEFAULT_RENDER_OPTIONS.shortBondLength);
        ensureOption(options, 'bondSpacing', DEFAULT_RENDER_OPTIONS.bondSpacing);
        ensureOption(options, 'fontSizeLarge', DEFAULT_RENDER_OPTIONS.fontSizeLarge);
        ensureOption(options, 'fontSizeSmall', DEFAULT_RENDER_OPTIONS.fontSizeSmall);
        ensureOption(options, 'padding', DEFAULT_RENDER_OPTIONS.padding);

        if (typeof options.explicitHydrogens === 'undefined') options.explicitHydrogens = false;

        if (adaptive) {
            options.bondLength = round(clamp(options.bondLength * factor, 10.5, DEFAULT_RENDER_OPTIONS.bondLength), 1);
            options.fontSizeLarge = round(clamp(options.fontSizeLarge * clamp(factor + 0.04, 0.72, 1), 4.8, DEFAULT_RENDER_OPTIONS.fontSizeLarge), 1);
            options.padding = Math.round(clamp(options.padding * clamp(factor + 0.1, 0.78, 1), 7, 16));
        }

        options.compactDrawing = false;

        if (settings && settings.renderConfig) {
            options = mergeObjects(options, settings.renderConfig);
        }

        return {
            metrics: metrics,
            options: options
        };
    }

    function readJsonAttribute(node, attribute) {
        var value;

        if (!node) return null;

        value = node.getAttribute(attribute);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch (error) {
            return null;
        }
    }

    function getRenderConfig(node) {
        return readJsonAttribute(node, 'data-render-config');
    }

    function resetSvg(svg) {
        var fresh;
        var i;
        var attr;

        if (!svg) return svg;

        fresh = document.createElementNS(SVG_NS, 'svg');

        for (i = 0; i < svg.attributes.length; i++) {
            attr = svg.attributes[i];
            fresh.setAttribute(attr.name, attr.value);
        }

        if (svg.parentNode) {
            svg.parentNode.replaceChild(fresh, svg);
        }

        return fresh;
    }

    function applySvgBox(svg, kind, options, layout) {
        var config = layout || {};
        var containerWidth = config.containerWidth || 0;
        var width = options && options.width ? options.width : 500;
        var height = options && options.height ? options.height : 500;

        if (!svg) return;

        svg.classList.add('w-full');
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.display = 'block';
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        if (kind === 'reaction') {
            svg.style.maxWidth = '100%';
            svg.style.maxHeight = Math.max(height, config.minHeight || 0) + 'px';
            return;
        }

        svg.style.maxWidth = containerWidth > 0 ? Math.min(width, containerWidth) + 'px' : width + 'px';
        svg.style.maxHeight = Math.max(height, config.minHeight || 0) + 'px';
    }

    function applyThemeSurface(surface, themeName, themePresets, themeSurfaceModes) {
        var preset;
        var isDarkSurface;

        if (!surface || !themePresets) return;

        preset = themePresets[themeName] || themePresets.light;
        isDarkSurface = themeSurfaceModes && themeSurfaceModes[themeName] === 'dark';

        surface.style.backgroundColor = preset.BACKGROUND || '';
        surface.style.backgroundImage = isDarkSurface
            ? 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.2))';
    }

    function renderSmiles(config) {
        var svg = config && config.svg;
        var smiles = config && config.smiles ? String(config.smiles).trim() : '';
        var kind = config && config.kind && config.kind !== 'auto'
            ? config.kind
            : (isReaction(smiles) ? 'reaction' : 'molecule');
        var profile = kind === 'reaction'
            ? buildReactionOptions(config && config.baseOptions ? config.baseOptions : {}, smiles, {
                adaptive: !config || config.adaptive !== false,
                renderConfig: config && config.renderConfig ? config.renderConfig : null
            })
            : buildMoleculeOptions(config && config.baseOptions ? config.baseOptions : {}, smiles, {
                adaptive: !config || config.adaptive !== false,
                renderConfig: config && config.renderConfig ? config.renderConfig : null
            });
        var themeName = config && config.themeName ? config.themeName : 'light';

        function done(extra) {
            applySvgBox(svg, kind, profile.options, config && config.layout ? config.layout : null);

            if (config && config.onSuccess) {
                config.onSuccess(mergeObjects({
                    kind: kind,
                    metrics: profile.metrics,
                    options: profile.options,
                    svg: svg
                }, extra || {}));
            }
        }

        function fail(error) {
            if (config && config.onError) {
                config.onError(error, kind, svg);
            }
        }

        if (!svg) {
            return {
                kind: kind,
                metrics: profile.metrics,
                options: profile.options,
                svg: svg
            };
        }

        if (config && config.reset !== false) {
            svg = resetSvg(svg);
        }

        if (config && config.svgId) {
            svg.id = config.svgId;
        }

        applySvgBox(svg, kind, profile.options, config && config.layout ? config.layout : null);

        if (!smiles) {
            done({empty: true});
            return {
                kind: kind,
                metrics: profile.metrics,
                options: profile.options,
                svg: svg
            };
        }

        // Library ratio is sigma = bondLength / 3 (defaults: sigma 10, bondLength 30).
        // Mirror that ratio so custom bond lengths don't produce oversized heat blobs.
        var autoSigma = profile.options && profile.options.bondLength
            ? profile.options.bondLength / 3
            : 10;

        try {
            if (kind === 'reaction') {
                new SmiDrawer(
                    mergeObjects({}, profile.options, config && config.reactionWeights ? {
                        weights: mergeObjects({
                            sigma: autoSigma,
                            opacity: 0.72,
                            additionalPadding: 30
                        }, config.weightOptions || {})
                    } : {}),
                    mergeObjects({}, config && config.reactionOptions ? config.reactionOptions : {})
                ).draw(smiles, svg, themeName, function() {
                    done();
                }, function(error) {
                    fail(error);
                }, config && config.reactionWeights ? config.reactionWeights : null);
            } else if (config && config.weights && config.weights.length) {
                new SmiDrawer(
                    mergeObjects({}, profile.options, {
                        weights: mergeObjects({
                            sigma: autoSigma,
                            opacity: 0.72,
                            additionalPadding: 30
                        }, config.weightOptions || {})
                    }),
                    mergeObjects({}, config && config.reactionOptions ? config.reactionOptions : {})
                ).draw(smiles, svg, themeName, null, null, config.weights);

                done();
            } else if (config && config.highlights && config.highlights.length) {
                SmilesDrawer.parse(smiles, function(tree) {
                    new SmilesDrawer.SvgDrawer(profile.options).draw(
                        tree, svg, themeName, null, false, config.highlights
                    );
                    done({tree: tree});
                }, function(error) {
                    fail(error);
                });
            } else {
                SmilesDrawer.parse(smiles, function(tree) {
                    new SmilesDrawer.SvgDrawer(profile.options).draw(tree, svg, themeName);
                    done({tree: tree});
                }, function(error) {
                    fail(error);
                });
            }
        } catch (error) {
            fail(error);
        }

        return {
            kind: kind,
            metrics: profile.metrics,
            options: profile.options,
            svg: svg
        };
    }

    window.SmilesWebsite = {
        applySvgBox: applySvgBox,
        applyThemeSurface: applyThemeSurface,
        buildMoleculeOptions: buildMoleculeOptions,
        buildReactionOptions: buildReactionOptions,
        getDefaultRenderOptions: getDefaultRenderOptions,
        getPageTheme: getPageTheme,
        getRenderConfig: getRenderConfig,
        isReaction: isReaction,
        mergeObjects: mergeObjects,
        renderSmiles: renderSmiles,
        resetSvg: resetSvg,
        waitForFonts: waitForFonts
    };
})(window);
