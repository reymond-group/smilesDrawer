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
        'isSMARTS': s[0].property ? true : false,
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

atom = a:(organicsymbol / aromaticsymbol / bracket / wildcard) {
    return a;
}

// . is assumed to be a bond
bond = b:([-=#$:/\\.]) {
    return b;
}

bracket = b:('[' (bracketatom / smartsatomicsymbol) ']') {
	return b[1];
}

bracketatom = b: (isotope? ('se' / 'as' / aromaticsymbol / elementsymbol ![0-9] / wildcard) chiral?
                     hcount? charge? class?) {
    return {
        'isotope': b[0],
        'element': b[1][0],
        'chirality': b[2] && b[2].join ? b[2].join('').replace(',', '') : b[2],
        'hcount': b[3],
        'charge': b[4],
        'class': b[5]
    }
}

smartsatomicsymbol = s:(chiral[\?]? / [aA] / '#'[1-9][0-9]?[0-9]? / [DHhRrvXx][0-9]? / poscharge / negcharge) {
	if (Number.isInteger(s)) {
    	return {
        	property: 'charge',
            value: s
        }
    } else if (s === '@' || s === '@@') {
    	return {
        	property: 'chirality',
            value: s
        }
    } else if (s[0] === '#') {
    	return {
        	property: 'atomic_number',
            value: Number(s.slice(1).join('').replace(',', ''))
        }
    } else if (s[0].length === 2) {
    	return {
        	property: 'chirality',
            value: [s[0][0], Number(s[0].slice(1).join('')), s[1] ? true : false],
        }
    } else {
    	return {
        	property: s[0],
            value: s[1]
        }
    }
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

elementsymbol = e:('Ac' / 'Ag' / 'Al' / 'Am' / 'Ar' / 'As' / 'At' / 'Au' /
'B'[aehikr]? /
'C'[adeflmnorsu]? /
'Db' / 'Ds' / 'Dy' /
'Er' / 'Es' / 'Eu' /
'F'[elmr]? /
'Ga' / 'Ge' / 'Gd' / 'Ge' /
'H'[efgos]? /
'I'[nr]? /
'K'[r]? /
'La' / 'Li' / 'Lr' / 'Lu' / 'Lv' /
'Mc' / 'Md' / 'Mg' / 'Mn' / 'Mo' / 'Mt' /
'N'[abdehiop]? /
'O'[gs]? /
'P'[abdmortu]? /
'Ra' / 'Rb' / 'Re' / 'Rf' / 'Rg' / 'Rh' / 'Rn' / 'Ru' /
'S'[bcegimnr]? /
'Ta' / 'Tb' / 'Tc' / 'Te' / 'Th' / 'Ti' / 'Tl' / 'Tm' / 'Ts' /
'U' /
'V' /
'W' /
'Xe' /
'Y''b'? /
'Zn' / 'Zr') {
	if(Array.isArray(e)) return e.join('');
    return e;
}

ring = r:('%'[1-9][0-9] / [0-9]) {
    if(r.length == 1) return Number(r);
    return Number(r.join('').replace('%', ''));
}

chiral = c:('@'('@' / 'TH'[12] / 'AL'[12] / 'SP'[1-3] / 'TB'[1-9][0-9]? / 'OH'[1-9][0-9]?)?) {
    if(!c[1]) return '@';
    if(c[1] == '@') return '@@';

    return c[1];
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