chain = s:(atom branch* (bond? ring)* branch* bond? chain? branch*) {
    var branches = [];
    var rings = [];

    for(var i = 0; i < s[1].length; i++) {
        branches.push(s[1][i]);
    }


    for(var i = 0; i < s[2].length; i++) {
        var bond = (s[2][i][0]) ? s[2][i][0] : '-';
        rings.push({
            'bond': bond,
            'id': s[2][i][1]
        });
    }

    for(var i = 0; i < s[3].length; i++) {
        branches.push(s[3][i]);
    }

    for(var i = 0; i < s[6].length; i++) {
        branches.push(s[6][i]);
    }

    return {
        'atom': s[0],
        'isBracket': s[0].element ? true : false,
        'branches': branches,
        'branchCount': branches.length,
        'ringbonds': rings,
        'ringbondCount': rings.length,
        'bond': s[4] ? s[4] : '-',
        'next': s[5],
        'hasNext': s[5] ? true : false
    }

    return s;
}

// This bond is the first bond in the branch (e.g the bond between
// N and O in this example: CN(OC)C
branch = b:('(' bond? chain ')') {
    var bond = (b[1]) ? b[1] : '-';
    b[2].branchBond = bond;
    return b[2]
}

atom = a:(smartsexpression / organicsymbol / aromaticsymbol / bracketatom / wildcard) {
    return a;
}

// . is assumed to be a bond
bond = b:([-=#$:/\\.]) {
    return b;
}

bracketatom = '[' b:smartsexpression ']' {
    return b
}

bracketcontent = b:(isotope? ('se' / 'as' / aromaticsymbol / elementsymbol / wildcard) chiral?
                    hcount? charge? class?) {
    return {
        'isotope': b[1],
        'element': b[2],
        'chirality': b[3],
        'hcount': b[4],
        'charge': b[5],
        'class': b[6]
    }
}

smartsexpression = e:(smartsatomicsymbol / bracketcontent ([,;] (smartsatomicsymbol / bracketcontent))*) {
	return {
    	'smarts': e
    }
}

smartsatomicsymbol = s:([aA@] / '#'[1-9][0-9]* / [DHhRrvXx\-+][0-9]?) {
	return s;
}

organicsymbol = o:('B''r'? / 'C''l'? / [NOPSFI]) {
    if(o.length > 1) return o.join('');
    return o;
}

aromaticsymbol = a:([bcnops]) {
    return a;
}

wildcard = w:('*') {
    return w;
}

elementsymbol = e:([A-Z][a-z]?) {
    return e.join('');
}

ring = r:('%'[1-9][0-9] / [0-9]) {
    if(r.length == 1) return Number(r);
    return Number(r.join('').replace('%', ''));
}

chiral = c:('@'('@' / 'TH'[12] / 'AL'[12] / 'SP'[1-3] / 'TB'[1-9][0-9]? / 'OH'[1-9][0-9]?)?) {
    if(!c[1]) return '@';
    if(c[1] == '@') return '@@';

    return c[1].join('').replace(',', '');
}

charge = c:(poscharge / negcharge) {
    return c;
}

poscharge = c:('+'('+' / [1-9][0-9]?)?) {
    if(!c[1]) return 1;
    if(c[1] != '+') return Number(c[1].join(''));
    return 2;
}


negcharge = c:('-'('-' / [1-9][0-9]?)?) {
    if(!c[1]) return -1;
    if(c[1] != '-') return -Number(c[1].join(''));
    return -2;
}

hcount = h:('H'[0-9]?) {
    if(h[1]) return Number(h[1]);
    return 1;
}


class = c:(':'([1-9][0-9]* / [0])) {
    return Number(c[1][0] + c[1][1].join(''));
}


isotope = i:([1-9][0-9]?[0-9]?) {
    return Number(i.join(''));
}