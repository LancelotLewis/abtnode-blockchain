const formatter = require('../../src/utils/formatter');

describe('Filter function', () => {
  test('it should format a number to a string contain separator', () => {
    const list = [
      [0, '0'],
      [13, '13'],
      [12345678, '12,345,678'],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatNumber(input)).toEqual(output);
    });
  });

  test('it should format a number to a string with precision', () => {
    const list = [
      [0, 2, '0.00'],
      [1.4, 0, '1'],
    ];
    list.forEach((item) => {
      const [input, params, output] = item;
      expect(formatter.formatDecimal(input, params)).toEqual(output);
    });
  });

  test('it should format a decimal number to a hex number', () => {
    const list = [
      [0, '0x0'],
      [15, '0xf'],
      [255, '0xff'],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatHex(input)).toEqual(output);
    });
  });

  test('it should format a timestamp to a date string', () => {
    const list = [
      [0, '1970-01-01 08:00'],
      [+new Date('2021-01-01 00:00:00'), '2021-01-01 00:00'],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatDate(input)).toEqual(output);
    });
  });

  test('it should format a sat value to a BTC value', () => {
    const list = [
      [0, '0.00000000'],
      [16583560, '0.16583560'],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatBTC(input)).toEqual(output);
    });
  });

  test('it should format a bitcoin bits to a bitcoin difficulty', () => {
    const list = [
      [386863986, '18670168558399.59'],
      [386867735, '18599593048299.49'],
      [443192243, '157416.40'],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatDifficulty(input)).toEqual(output);
    });
  });

  test('it should format a block height to a block reward value(sat)', () => {
    const list = [
      [123456, 50 * 100000000],
      [662462, 6.25 * 100000000],
      [210000 * 64, 0],
    ];
    list.forEach((item) => {
      const [input, output] = item;
      expect(formatter.formatBlockReward(input)).toEqual(output);
    });
  });
});
