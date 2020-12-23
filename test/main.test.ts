import pretty from '../src/main'

describe('pretty-table', () => {
  it('should parse a table properly', () => {
    expect(
      pretty([
        {
          name: 'cosmo',
          animal: 'cat',
          age: 12,
        },
        {
          name: 'mabel',
          animal: 'dog',
          age: 18,
        },
      ]),
    ).toBe(`name  animal age\ncosmo cat    12\nmabel dog    18`)
  })
})
