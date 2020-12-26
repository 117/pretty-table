"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lines = exports.fast = exports.old = void 0;
function old(data, head = { disabled: false, uppercase: false }) {
    let table = '', pad = {};
    data.forEach((item) => Object.entries(item).forEach(([key, value]) => {
        if ((pad[key] ?? 0) <= key.length) {
            pad[key] = key.length + 1;
        }
        if ((pad[key] ?? 0) <= new String(value).length) {
            pad[key] = new String(value).length + 1;
        }
    }));
    !head.disabled &&
        Array.from(Object.keys(pad)).forEach((key, index) => {
            table = table.concat((head.uppercase ? key.toUpperCase() : key).padEnd(pad[key]));
            index == Object.keys(pad).length - 1 && (table = table.trimRight());
        });
    data.forEach((entry) => (table = table.concat(`\n`)) &&
        Object.entries(entry).forEach(([key, value], index) => {
            table = table.concat(new String(value).padEnd(pad[key]));
            index == Object.entries(entry).length - 1 && (table = table.trimRight());
        }));
    return table.trimStart();
}
exports.old = old;
function default_1(data, { head = true, upper = false } = {}) {
    // Holds rows and keeps track of the current row being added to
    let rows = [], row = 0, props = {}, cs = [], 
    // Adds the current value to the 2d array holding all the values
    add = (i, j) => {
        // uhhh this mess adds the next value to the arrays, and updates cs
        let ind = props[j], l = (rows[row][ind] = i[j]).length;
        // This updates the current max length for the row if it's less than the value's length
        if (cs[ind] < l)
            cs[ind] = l;
    };
    // If we are including header, (there are special checks)
    if (head) {
        // A special first row for headers
        rows[0] = [], row++;
        // Remaps the data to a 2d array, while filling in max lengths for each row in the `cs` variable.
        for (let i of data) {
            // Makes a new row
            rows[row] = [];
            // Adds the contents of the row to this row
            for (let j in i) {
                // If the first row(the row for the header) doesn't include the index, we add it in
                if (!rows[0].includes(j))
                    cs[(props[j] = rows[0].push(j) - 1)] = j.length;
                // Basically add the value to the 2d array
                add(i, j);
            }
            row++;
        }
        // basically the same thing as above but without header check
    }
    else {
        let h = 0;
        for (let i of data) {
            rows[row] = [];
            for (let j in i) {
                if (!props[j])
                    props[j] = h, h++;
                add(i, j);
            }
            row++;
        }
    }
    // Convert the 2d array into properly spaced columns
    const pog = exports.lines(rows, cs);
    // Uppercases the header if specified
    if (upper && head)
        pog[0].toUpperCase();
    // Returns the data in text and trimmed
    return pog.join("\n");
}
exports.default = default_1;
/**
 * Does what the main function does but a tiny bit faster, with a catch; your data has to all be in the same format(properties should be added in the same order) for this to work properly. Since this might be a major limitation, it's included separately.
 * @param data The data to be "tablified".
 * @param head Whether to include the header(titles of every category). Defaults to true.
 * @param upper Whether to uppercase the top line(best with header). Defaults to false.
 */
function fast(data, { head = true, upper = false } = {}) {
    // Holds rows and keeps track of the current row being added to
    let rows = [], row = 0, cs = [], add = (i, j) => {
        // uhhh this mess adds the next value to the arrays, and updates cs
        let ind = rows[row].push(i[j] + "") - 1, l = rows[row][ind].length, a = rows[row - 1][ind];
        if (!(a && a.length > l))
            cs[ind] = l;
    };
    // If we are including header, (there are special checks)
    if (head) {
        // A special first row for headers
        rows[0] = [], row++;
        // Remaps the data to a 2d array, while filling in max lengths for each row in the `cs` variable.
        for (let i of data) {
            // Makes a new row
            rows[row] = [];
            // Adds the contents of the row to this row
            for (let j in i) {
                // If the first row(the row for the header) doesn't include the index, we add it in
                if (!rows[0].includes(j))
                    cs[rows[0].push(j) - 1] = j.length;
                // Basically add the value to the 2d array
                add(i, j);
            }
            row++;
        }
        // basically the same thing as above but without header check
    }
    else
        for (let i of data) {
            rows[row] = [];
            for (let j in i)
                add(i, j);
            row++;
        }
    // Convert the 2d array into properly spaced columns
    const pog = exports.lines(rows, cs);
    // Uppercases the header if specified
    if (upper && head)
        pog[0].toUpperCase();
    // Returns the data in text and trimmed
    return pog.join("\n");
}
exports.fast = fast;
/**
 * Converts a 2d array of random values into a properly spaced array of columns you can .join later. There are no checks for errors, if one occurs, it's your fault for not having the data in the proper format.
 * @param rows The data, in a 2d array
 * @param cs The max lengths for each row, with spaces added for each value to reach it. It's optional, but using this function's the same as using the laggier version of `rows.map(r => r.join(" "))` if you use it without this array.
 */
const lines = (rows, cs = []) => {
    // Since ts is freaking stupid, we make another variable to hold lines, with the words joined together
    const pog = [];
    // Adds the necessary spaces
    for (let r = 0, l = rows[0].length; r < rows.length; r++) {
        // Makes the initial string
        pog[r] = "";
        // Loops through each value of each row
        for (let i = 0, v = rows[r][0]; i < l - 1; v = rows[r][i++])
            // Adds multiple spaces if the value's length is less than the max for the row
            if (v.length < cs[i])
                pog[r] += v + " ".repeat(cs[i] - v.length + 1);
            // Just add one space otherwise
            else
                pog[r] += v + " ";
        // Add the last value in manually, since we don't want spaces on it
        pog[r] += rows[r][l - 1];
    }
    // Returns the array of strings
    return pog;
};
exports.lines = lines;
