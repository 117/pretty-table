export default function (data: Array<Object>, head?: {
    disabled?: boolean;
    uppercase?: boolean;
}): string;
/**
 * Converts data to table format a lot faster, but your data has to all be in the same format(props should be added in the same order) for this to work properly. Since this is it's main limitation, it's included separately.
 * @param data The data to be tablified
 * @param head Whether to include the header(titles of every category)
 * @param upper Whether to uppercase the top line(best with header)
 */
export declare function fast(data: {
    [key: string]: any;
}[], head: boolean, upper: boolean): string;
