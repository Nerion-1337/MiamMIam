// TYPAGE
import {  api_number, api } from "#0_types/typages";
//
//
//
//
//
export const Sort_crescent = <T extends {[key: string]: number | string}>(
    data: T[]
    ) => {
        data.sort((a, b) => {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            const keyA = keysA.length > 0 ? keysA[0] : '';
            const keyB = keysB.length > 0 ? keysB[0] : ''; 
            const nameA = keyA.toLowerCase();
            const nameB = keyB.toLowerCase();
    
            // Fonction de comparaison personnalisée pour tenir compte des chiffres et des nombres
            const compareKeys = (keyA: string, keyB: string) => {
                const numA = parseInt(keyA.replace(/\D/g, ''), 10); // Extraire les chiffres de la clé A
                const numB = parseInt(keyB.replace(/\D/g, ''), 10); // Extraire les chiffres de la clé B
                if (numA < numB) {
                    return -1;
                }
                if (numA > numB) {
                    return 1;
                }
                return 0;
            };
    
            // Comparer les clés en tenant compte des chiffres et des nombres
            const keyComparison = compareKeys(nameA, nameB);
            if (keyComparison !== 0) {
                return keyComparison; // Si les chiffres diffèrent, retourner le résultat de la comparaison
            }
    
            // Si les chiffres sont les mêmes, comparer les clés sans tenir compte des chiffres
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    
        return data;
}