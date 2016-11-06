function draw() {}

let sent = S.value, iter = 1;
S.onchange = () => sent = S.value;
R.onclick  = () => { draw(); sent = improve(sent, loadRules()) }

function loadRules() {
    const rules = {};
    T.value.split('\n').map(r => r.split(/\s*→\s*/)).forEach(([ch, prod]) => rules[ch] = prod);
    return rules;
}

function improve(str, rules) {
    let res = "";

    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        res += ch in rules ? rules[ch] : ch;
    }

    iter++;
    return res;
}
