<template>
  <div class="page-home">
    <v-text-field
      v-model="inputStr"
      outlined
      dense
      clearable
      prepend-inner-icon="mdi-magnify"
      placeholder="Search your transaction, an address or a block"
    />
    <template v-if="!loading">
      <detail-block :data="dataInfo" />
      <block-transaction :data="dataInfo" />
    </template>
  </div>
</template>

<script>
import { onBeforeMount, ref, unref } from '@vue/composition-api';

import * as blockchainApi from '@/api/blockchain';
import DetailBlock from '@/components/DetailBlock';
import BlockTransaction from '@/components/BlockTransaction';

export default {
  name: 'Home',
  components: {
    DetailBlock,
    BlockTransaction,
  },
  setup() {
    const loading = ref(true);
    const page = ref({
      index: 1,
      size: 5,
      total: 0,
    });
    const inputStr = ref('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa');
    const dataInfo = ref({});

    onBeforeMount(async () => {
      loading.value = true;
      const data = await blockchainApi.getBlock(unref(inputStr));
      dataInfo.value = data;
      page.value.total = Math.ceil(data.n_tx / unref(page).size);
      page.value.index = 1;

      loading.value = false;
    });

    return {
      loading,
      page,
      inputStr,
      dataInfo,
    };
  },
};
</script>
