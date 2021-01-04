import request from '@/utils/request';

export async function getBlock(block_hash) {
  return await request.get(`rawblock/${block_hash}`);
}

// export async function getTx(tx_hash) {
//   return await request.get(`rawtx/${tx_hash}`);
// }

// export async function getAddr(bitcoin_address) {
//   return await request.get(`rawaddr/${bitcoin_address}`);
// }

export async function getLatestblock() {
  return await request.get(`latestblock`);
}
