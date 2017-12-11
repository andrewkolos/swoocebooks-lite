/**
 * Evaluates a mathematical expression. Returns*/
export function evalMathExpression(expression: string, ensureCleanInput: boolean = true) {
    let simpleMathRegex = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/g;

    if (isFinite(+expression))
        return parseFloat(expression);
    else if (simpleMathRegex.test(expression)) {
        return parseFloat(eval(expression));
    } else {
        console.log('triggering');
        return NaN;
    }
}