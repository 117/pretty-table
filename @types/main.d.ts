/**
 * Does what the main function does but a tiny bit faster, with a catch; your data has to all be in the same format(properties should be added in the same order) for this to work properly. Since this might be a major limitation, it's included separately.
 * @param data The data to be "tablified".
 * @param head Whether to include the header(titles of every category). Defaults to true.
 * @param upper Whether to uppercase the top line(best with header). Defaults to false.
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
