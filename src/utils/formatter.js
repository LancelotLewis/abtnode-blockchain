import dayjs from 'dayjs';

export const formatNumber = (number) => Number(number).toLocaleString();

export const formatDecimal = (number, precision) => Number(number).toFixed(precision);

export const formatHex = (number) => `0x${Number(number).toString(16)}`;

export const formatDate = (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm');

export const formatBTC = (value) => (value / 100000000).toFixed(8);

export const formatDifficulty = (bits) => {
  const hex = Number(bits)
    .toString(16)
    .padStart(8, '0');
  const initHash = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
  const hash = parseInt(hex.slice(2), 16) * 2 ** (8 * (parseInt(hex.slice(0, 2), 16) - 3));
  return (initHash / hash).toFixed(2);
};

export const formatBlockReward = (height) => {
  const halvings = Math.floor(height / 210000);
  if (halvings >= 64) return 0;
  return 50 * 2 ** -halvings * 100000000;
};
