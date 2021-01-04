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
          <tr v-for="(value, name) in detailInfo" :key="name">
            <td>{{ name }}</td>
            <td>{{ value }}</td>
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
  setup(props) {
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
      const info = {
        Hash: props.data.hash,
        'Prev Block': props.data.prev_block,
        Confirmations: formatNumber(confirmations),
        Timestamp: formatDate(props.data.time * 1000),
        Height: props.data.height,
        Miner: props.data.tx[0].out[0].addr,
        'Number of Transactions': props.data.n_tx,
        Difficulty: formatNumber(formatDifficulty(props.data.bits)),
        'Merkle root': props.data.mrkl_root,
        Version: formatHex(props.data.ver),
        Bits: `${formatNumber(props.data.bits)}`,
        Weight: `${formatNumber(props.data.weight)} WU`,
        Size: `${formatNumber(props.data.size)} bytes`,
        Nonce: formatNumber(props.data.nonce),
        'Transaction Volume': `${formatBTC(transactionVolume)} BTC`,
        'Block Reward': `${formatBTC(blockReward)} BTC`,
        'Fee Reward': `${formatBTC(feeReward)} BTC`,
      };
      return info;
    });

    return {
      detailInfo,
    };
  },
};
</script>

<style></style>
