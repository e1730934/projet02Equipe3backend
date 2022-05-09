function testRegex(JJ, MM, AA, sequenceChiffres) {
    const regexJJ = /^0[1-9]|[12]\d|3[01]$/;
    const regexMM = /^0[1-9]|1[0-2]$/;
    const regexAA = /^\d{2}$/;
    const regexSChiffres = /^\d{4}$/;
    return (
        regexJJ.test(JJ)
        && regexMM.test(MM)
        && regexAA.test(AA)
        && regexSChiffres.test(sequenceChiffres)
    );
}

module.exports = { testRegex };
