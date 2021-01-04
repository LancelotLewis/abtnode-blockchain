import dayjs from 'dayjs';

export const formatNumber = (number = '0') => Number(number).toLocaleString();

export const formatHex = (number = '0') => `0x${Number(number).toString(16)}`;

export const formatDate = (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm');

export const formatBTC = (value) => (value / 100000000).toFixed(8);

export const formatDifficulty = (bits = '0') => {
  const hex = Number(bits)
    .toString(16)
    .padStart(8, '0');
  const initHash = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
  const hash = parseInt(hex.slice(2), 16) * 2 ** (8 * (parseInt(hex.slice(0, 2), 16) - 3));
  return initHash / hash;
};

export const formatBlockReward = (height = 0) => {
  const halvings = Math.floor(height / 210000);
  if (halvings >= 64) return 0;
  return 50 * 2 ** -halvings * 100000000;
};

export const formatDecimal = (number, precision = 2) => Number(number).toFixed(precision);
