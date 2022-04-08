//@ts-check
const Drawer = require('./Drawer')
const Parser = require('./Parser')
const ReactionParser = require('./ReactionParser')
const SvgDrawer = require('./SvgDrawer')
const ReactionDrawer = require('./ReactionDrawer')

class SmilesDrawer {
    constructor(moleculeOptions = {}, reactionOptions = {}) {
        this.drawer = new SvgDrawer(moleculeOptions);
        this.reactionDrawer = new ReactionDrawer(reactionOptions, moleculeOptions);
    }

    draw(smiles, target, theme = 'light', successCallback = null, errorCallback = null) {
        if (smiles.contains('>')) {
            try {
                this.#drawMolecule(smiles, target, theme, successCallback);
            } catch (err) {
                errorCallback(err);
            }
        } else {
            try {
                this.#drawReaction(smiles, target, theme, successCallback);
            } catch (err) {
                errorCallback(err);
            }
        }
    }

    #drawMolecule(smiles, target, theme, callback) {
        let targets = this.#getTarget(target);
        let parseTree = Parser.parse(smiles);

        for (var i = 0; i < targets.length; i++) {
            let t = targets[i];
            this.drawer.draw(parseTree, t, theme, false);
            callback(t);
        }
    }

    #drawReaction(smiles, target, theme, callback) {
        let targets = this.#getTarget(target);
        let reaction = ReactionParser.parse(smiles);

        for (var i = 0; i < targets.length; i++) {
            let t = targets[i];

            callback(t);
        }
    }

    #getTarget(target) {
        if (target === null || target === 'svg') {
            return [document.createElementNS('http://www.w3.org/2000/svg', 'svg')];
        } else if (target === 'canvas') {
            return [document.createElementNS('http://www.w3.org/2000/svg', 'canvas')];
        } else if (target === 'img') {
            return [document.createElementNS('http://www.w3.org/2000/svg', 'img')];
        } else {
            return document.querySelectorAll(target);
        }
    }
}