start = s:chain whitespace* x:('|' [a-z0-9,;]i* '|')?{
	if (x && x[1].join) {
		s.extended = x[1].join('');
    }
	return s;
}

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

atom = a:(organicsymbol / aromaticsymbol / bracketatom / wildcard) {
    return a;
}

// . is assumed to be a bond
bond = b:([-=#$:/\\.]) {
    return b;
}

bracketatom = '[' b:bracketcontent ']' {
    return {
        'isotope': b[0],
        'element': b[1],
        'chirality': b[2],
        'hcount': b[3],
        'charge': b[4],
        'class': b[5]
    }
}

bracketcontent = b:(isotope? ('se' / 'as' / aromaticsymbol / elementsymbol / wildcard) chiral? hcount? charge? class?) {
	return b;
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

whitespace 'whitespace'
  = '\t'
  / '\v'
  / '\f'
  / ' '
  / '\u00A0'
  / '\uFEFF'
  / Zs
  
 Zs = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]