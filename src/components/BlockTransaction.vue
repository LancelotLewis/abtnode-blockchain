<template>
  <v-card flat style="margin-top:30px">
    <v-card-title>
      Block Transactions
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
        <span> All transactions recorded in Block at height {{ data.height }} </span>
      </v-tooltip>
    </v-card-title>
    <v-list-item v-for="item in txList" :key="item.hash">
      <transaction-item :data="item" />
    </v-list-item>
    <v-pagination v-model="page.index" :length="pageTotal" :total-visible="7" flat />
  </v-card>
</template>

<script>
import { computed, ref, unref } from '@vue/composition-api';
import TransactionItem from '@/components/TransactionItem';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    TransactionItem,
  },
  setup(props) {
    const page = ref({
      size: 5,
      index: 1,
    });
    const pageTotal = computed(() => {
      const total = Math.ceil(props.data.n_tx / unref(page).size) || 0;
      return total;
    });

    const txList = computed(() => {
      const allList = props.data.tx || [];
      const end = unref(page).index * unref(page).size;
      const start = end - unref(page).size;
      return allList.slice(start, end);
    });

    return {
      page,
      pageTotal,
      txList,
    };
  },
};
</script>

<style></style>
