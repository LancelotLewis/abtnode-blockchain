<template>
  <div class="page-home">
    <v-text-field
      v-model="inputStr"
      outlined
      dense
      clearable
      prepend-inner-icon="mdi-magnify"
      placeholder="Search a block"
      :loading="loading"
      @keyup.enter="searchFn"
      @click:prepend-inner="searchFn"
    />

    <template v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        type="table-tbody"
        width="100%"
        :types="{
          paragraph: 'text@10',
          'table-tbody': 'table-row-divider@10',
          'table-row': 'table-cell',
          'table-cell': 'text',
        }"
      />
    </template>
    <template v-else>
      <detail-block :data="dataInfo" @search="toSearchFn" />
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

    onBeforeMount(searchFn);

    async function searchFn() {
      if (!unref(inputStr)) return;
      loading.value = true;
      const data = await blockchainApi.getBlock(unref(inputStr));
      dataInfo.value = data;
      page.value.total = Math.ceil(data.n_tx / unref(page).size);
      page.value.index = 1;

      loading.value = false;
    }
    function toSearchFn(str) {
      inputStr.value = str;
      searchFn();
    }

    return {
      loading,
      page,
      inputStr,
      dataInfo,
      searchFn,
      toSearchFn,
    };
  },
};
</script>

<style lang="scss">
$skeleton-loader-table-cell-width: 100%;
.page-home {
  width: 80%;
  max-width: 1200px;
  margin: auto;
}
</style>
