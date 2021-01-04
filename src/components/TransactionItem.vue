<template>
  <div class="transaction-item">
    <div class="transaction-item__header">
      <span class="transaction-item__gap">Hash</span>
      <span class="transaction-item__hash transaction-item__stretch">{{ data.hash }}</span>
      <span class="transaction-item__gap"></span>
      <span class="transaction-item__right transaction-item__stretch">
        {{ formatDate(data.time * 1000) }}
      </span>
    </div>

    <div class="transaction-item__body">
      <span class="transaction-item__gap"></span>
      <ul class="transaction-item__stretch transaction-item__spent-list">
        <li v-for="(item, index) in data.inputs" :key="index" class="transaction-item__spent-item">
          <template v-if="!item.prev_out">
            COINBASE (Newly Generated Coins)
          </template>
          <template v-else>
            <span class="transaction-item__spent-addr">{{ item.prev_out.addr }}</span>
            <span>
              {{ formatBTC(item.prev_out.value) }} BTC
              <v-icon
                v-text="'mdi-web'"
                small
                :color="item.prev_out.spent ? 'blue' : ''"
                :title="item.prev_out.spent ? 'Spent' : 'Unspent'"
              />
            </span>
          </template>
        </li>
      </ul>

      <v-icon v-text="'mdi-arrow-right-bold'" color="green" large class="transaction-item__gap" />

      <ul class="transaction-item__stretch transaction-item__spent-list">
        <li v-for="item in data.out" :key="item.n" class="transaction-item__spent-item">
          <template v-if="item.addr === 'null'">
            Unable to decode output address
          </template>
          <template v-else>
            <span class="transaction-item__spent-addr">{{ item.addr }}</span>
            <span>
              {{ formatBTC(item.value) }} BTC
              <v-icon
                v-text="'mdi-web'"
                small
                :color="item.spent ? 'red' : 'green'"
                :title="item.spent ? 'Spent' : 'Unspent'"
              />
            </span>
          </template>
        </li>
      </ul>
    </div>

    <div class="transaction-item__footer">
      <span class="transaction-item__gap">Fee</span>
      <span class="transaction-item__hash transaction-item__stretch">
        {{ formatBTC(data.fee) }} BTC
        <div>
          (
          {{ formatDecimal(data.fee / data.size, 3) }} sat/B -
          {{ formatDecimal(data.fee / data.weight, 3) }} sat/WU - {{ data.size }} bytes )
        </div>
      </span>
      <span class="transaction-item__gap"></span>
      <span class="transaction-item__right transaction-item__stretch">
        {{ formatBTC(totalSpent) }} BTC
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { formatDate, formatBTC, formatDecimal } from '@/utils/formatter';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const totalSpent = computed(() => {
      const outList = props.data.out || [];
      return outList.reduce((total, item) => total + item.value, 0);
    });

    return {
      formatDate,
      formatBTC,
      formatDecimal,
      totalSpent,
    };
  },
};
</script>

<style lang="scss">
.transaction-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #eee;
  }
}
.transaction-item__gap {
  display: inline-block;
  width: 100px;
}
.transaction-item__stretch {
  width: calc(50% - 100px);
  display: inline-block;
}
.transaction-item__header,
.transaction-item__body,
.transaction-item__footer {
  display: flex;
  align-items: flex-start;
}
.transaction-item__body {
  padding: 7px 0;
}
.transaction-item__hash {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.transaction-item__right {
  text-align: right;
}

.transaction-item__spent-list {
  display: inline-block;
  list-style: none;
  padding: 0 !important;
  margin: 0;
}
.transaction-item__spent-item {
  display: flex;
  justify-content: space-between;
}
.transaction-item__spent-addr {
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  white-space: nowrap;
}
</style>
