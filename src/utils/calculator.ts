export const evaluateExpression = (expression: string): number => {
  try {
    // Remplace les espaces multiples par un seul espace
    const cleanedExpression = expression.trim().replace(/\s+/g, ' ');
    // Remplace les espaces par des +
    const withOperators = cleanedExpression.replace(/\s/g, '+');
    // Nettoie les opérateurs consécutifs
    const sanitizedExpression = withOperators
      .replace(/\+{2,}/g, '+')           // Remplace plusieurs + consécutifs par un seul
      .replace(/\-{2,}/g, '-')           // Remplace plusieurs - consécutifs par un seul
      .replace(/\+\-/g, '-')             // Remplace +- par -
      .replace(/\-\+/g, '-');            // Remplace -+ par -
    
    // Évalue l'expression
    const result = Function(`'use strict'; return (${sanitizedExpression})`)();
    return isNaN(result) ? 0 : Math.max(0, result);
  } catch {
    return 0;
  }
};