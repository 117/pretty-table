export default function (
  data: Array<Object>,
  head: {
    disabled?: boolean
    uppercase?: boolean
  } = { disabled: false, uppercase: false },
): string {
  let table = '',
    pad: { [key: string]: any } = {}

  data.forEach((item) =>
    Object.entries(item).forEach(([key, value]) => {
      if ((pad[key] ?? 0) <= key.length) {
        pad[key] = key.length + 1
      }

      if ((pad[key] ?? 0) <= new String(value).length) {
        pad[key] = new String(value).length + 1
      }
    }),
  )

  !head.disabled &&
    Array.from(Object.keys(pad)).forEach((key, index) => {
      table = table.concat(
        (head.uppercase ? key.toUpperCase() : key).padEnd(pad[key]),
      )
      index == Object.keys(pad).length - 1 && (table = table.trimRight())
    })

  data.forEach(
    (entry) =>
      (table = table.concat(`\n`)) &&
      Object.entries(entry).forEach(([key, value], index) => {
        table = table.concat(new String(value).padEnd(pad[key]))
        index == Object.entries(entry).length - 1 && (table = table.trimRight())
      }),
  )

  return table.trimStart()
}

/**
 * Converts data to table format a lot faster, but your data has to all be in the same format(props should be added in the same order) for this to work properly. Since this is it's main limitation, it's included separately.
 * @param data The data to be tablified
 * @param head Whether to include the header(titles of every category)
 * @param upper Whether to uppercase the top line(best with header)
 */
export function fast(data: { [key: string]: any }[], head: boolean, upper: boolean) {
  let rows: string[][] = [], row = 0;
  if (!head) rows[0] = [], row++;
  for (let i of data) {
    for (let j in i) {
      if (!head && !rows[0].includes(j)) rows[0].push(j);
      let ind = (rows[row] ? rows[row] : (rows[row] = [])).push(i[j]) - 1, l = rows[row - 1][ind], t = rows[row][ind];
      if (l && l.length > t.length)
        rows[row][ind] += " ".repeat(l.length - t.length);
    }
    row++;
  }
  const pog: string[] = rows.map(r => r.join(" "))
  if(upper && head) pog[0].toUpperCase();
  return pog.join("\n").trim();
}
