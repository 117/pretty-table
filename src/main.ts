function pretty(
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

export default pretty
module.exports = pretty
