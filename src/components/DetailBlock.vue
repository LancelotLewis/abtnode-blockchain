<template>
  <v-card flat>
    <v-card-title>
      Block
      {{ detailInfo.height }}
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            v-text="'mdi-alert-circle'"
            small
            style="margin-left:7px;"
          />
        </template>
        <span> Block at height {{ detailInfo.height }} in the Bitcoin blockchain </span>
      </v-tooltip>
    </v-card-title>

    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr v-for="item in detailInfo" :key="item.name">
            <td :title="item.title">{{ item.name }}</td>
            <td>
              <template v-if="item.type === 'button'">
                <a @click="searchFn(item.value)">
                  {{ item.value }}
                </a>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { computed, onBeforeMount, ref, unref } from '@vue/composition-api';
import {
  formatBlockReward,
  formatBTC,
  formatDate,
  formatDifficulty,
  formatHex,
  formatNumber,
} from '@/utils/formatter';
import * as blockchainApi from '@/api/blockchain';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const latestblock = ref({});

    onBeforeMount(async () => {
      latestblock.value = await blockchainApi.getLatestblock();
    });
    const detailInfo = computed(() => {
      const blockReward = formatBlockReward(props.data.height);
      const feeReward = props.data.fee;
      const confirmations = unref(latestblock).height - props.data.height + 1 || 0;
      let transactionVolume = 0 - blockReward - feeReward;
      for (const item of props.data.tx) {
        // const totalInputs = item.inputs.reduce(
        //   (total, i) => (total + i.prev_out ? i.prev_out.value : 0),
        //   0,
        // );
        const totalOuts = item.out.reduce((total, i) => total + i.value, 0);
        transactionVolume += totalOuts;
      }
      const infoList = [];
      infoList.push({
        name: 'Hash',
        value: props.data.hash,
        title: 'Unique identifier used to identify a particular block',
      });
      infoList.push({
        name: 'Prev Block',
        value: props.data.prev_block,
        title: 'Unique identifier used to identify a particular block',
        type: 'button',
      });
      infoList.push({
        name: 'Confirmations',
        value: formatNumber(confirmations),
      });
      infoList.push({
        name: 'Timestamp',
        value: formatDate(props.data.time * 1000),
      });
      infoList.push({
        name: 'Height',
        value: props.data.height,
        title: 'Number of blocks connected on the blockchain',
      });
      infoList.push({
        name: 'Miner',
        value: props.data.tx[0].out[0].addr,
        title: 'Who confirmed the transactions in the block',
      });
      infoList.push({
        name: 'Number of Transactions',
        value: props.data.n_tx,
        title: 'Number of transactions included in this block',
      });
      infoList.push({
        name: 'Difficulty',
        value: formatNumber(formatDifficulty(props.data.bits)),
        title: 'Mathematical value of how hard it is to find a valid hash for this block',
      });
      infoList.push({
        name: 'Merkle root',
        value: props.data.mrkl_root,
        title: 'The root node of a merkle tree, a descendant of all the hashed pairs in the tree',
      });
      infoList.push({
        name: 'Version',
        value: formatHex(props.data.ver),
        title: 'Block version related to protocol proposals underway',
      });
      infoList.push({
        name: 'Bits',
        value: `${formatNumber(props.data.bits)}`,
        title: 'A sub-unit of BTC, equal to 0.000001 BTC',
      });
      infoList.push({
        name: 'Weight',
        value: `${formatNumber(props.data.weight)} WU`,
        title:
          'A measurement to compare the size of different transactions to each other in proportion to the block size limit',
      });
      infoList.push({
        name: 'Size',
        value: `${formatNumber(props.data.size)} bytes`,
        title: 'Total size of the block',
      });
      infoList.push({
        name: 'Nonce',
        value: formatNumber(props.data.nonce),
        title: 'Random value that can be adjusted to satisfy the proof of work',
      });
      infoList.push({
        name: 'Transaction Volume',
        value: `${formatBTC(transactionVolume)} BTC`,
        title: 'Estimated total amount transacted in this block',
      });
      infoList.push({
        name: 'Block Reward',
        value: `${formatBTC(blockReward)} BTC`,
        title: 'Static reward for the miner who calculated the hash for this block',
      });
      infoList.push({
        name: 'Fee Reward',
        value: `${formatBTC(feeReward)} BTC`,
        title:
          'Amount of transaction fees rewarded to the miner for calculating the hash for this block',
      });
      // const info = {
      //   Hash: props.data.hash,
      //   'Prev Block': props.data.prev_block,
      //   Confirmations: formatNumber(confirmations),
      //   Timestamp: formatDate(props.data.time * 1000),
      //   Height: props.data.height,
      //   Miner: props.data.tx[0].out[0].addr,
      //   'Number of Transactions': props.data.n_tx,
      //   Difficulty: formatNumber(formatDifficulty(props.data.bits)),
      //   'Merkle root': props.data.mrkl_root,
      //   Version: formatHex(props.data.ver),
      //   Bits: `${formatNumber(props.data.bits)}`,
      //   Weight: `${formatNumber(props.data.weight)} WU`,
      //   Size: `${formatNumber(props.data.size)} bytes`,
      //   Nonce: formatNumber(props.data.nonce),
      //   'Transaction Volume': `${formatBTC(transactionVolume)} BTC`,
      //   'Block Reward': `${formatBTC(blockReward)} BTC`,
      //   'Fee Reward': `${formatBTC(feeReward)} BTC`,
      // };
      return infoList;
    });

    function searchFn(str) {
      str && emit('search', str);
    }
    return {
      searchFn,
      detailInfo,
    };
  },
};
</script>

<style></style>
