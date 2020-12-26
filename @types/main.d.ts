/**
 * Compiles an array of objects or an array of arrays(even though the types say otherwise) into a cleanly spaced table.
 * @param data Data to convert into a table.
 * @param param1 Header options
 */
export default function (data: {
    [key: string]: any;
}[], { head, upper }?: {
    head?: boolean;
    upper?: boolean;
}): string;
/**
 * Converts a 2d array of random values into a properly spaced array of columns you can .join later. There are no checks for errors, if one occurs, it's your fault for not having the data in the proper format.
 * @param rows The data, in a 2d array
 * @param cs The max lengths for each row, with spaces added for each value to reach it. It's optional, but using this function's the same as using the laggier version of `rows.map(r => r.join(" "))` if you use it without this array.
 */
export declare const lines: (rows: string[][], cs?: number[]) => string[];
