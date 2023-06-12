<template>
  <div class="power-info">
    <div class="header">
      <div class="header-form">
        <div class="line-b" @click="(ShowPicker = true), (type = 0)">
          <input
            type="input"
            :value="beginDate"
            placeholder="请选择开始时间"
            readonly
          />
        </div>
        <span>至</span>
        <div class="line-b" @click="(ShowPicker = true), (type = 1)">
          <input
            type="input"
            readonly
            :value="endDate"
            placeholder="请选择结束时间"
          />
        </div>
      </div>
      <div class="btn-search" @click="getData(true)">查询</div>
    </div>
    <v-log
      ref="vLog"
      type="grow"
      :class="{ log: list.length != 0 }"
      :dataSource="list"
    />
    <v-empty v-if="list.length === 0 && !loading" />
    <Popup position="bottom" v-model="ShowPicker">
      <DatetimePicker
        type="date"
        :value="currentDate"
        @confirm="onConfirm"
        @cancel="ShowPicker = false"
        :min-date="minDate"
      />
    </Popup>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { DatetimePicker, Popup } from "vant";
import vLog from "@/components/list/log.vue";
import { growDetail } from "@/api/power";
export default {
  components: { DatetimePicker, Popup, vLog },
  data: () => ({
    ShowPicker: false,
    type: undefined,
    beginDate: undefined,
    endDate: undefined,
    list: [],
    finished: false,
    loading: false,
  }),
  created() {
    this._page = 1;
  },
  computed: {
    minDate() {
      switch (this.type) {
        case 1:
          return dayjs(this.beginDate).toDate();
        default:
          return new Date(2020, 0, 1);
      }
    },
    currentDate() {
      switch (this.type) {
        case 0:
          return dayjs(this.beginDate).toDate();
        case 1:
          return dayjs(this.endDate).toDate();
        default:
          return new Date();
      }
    },
  },
  methods: {
    async getData(refresh = false) {
      if (!this.beginDate) return this.$Toast("请选择开始时间");
      if ((this.finished && refresh !== true) || this.loading) return;
      const $toast = this.$Toast.loading({
        duration: 0,
      });
      this.loading = true;
      const { success, data, msg } = await growDetail({
        page: refresh ? 1 : this._page,
        page_size: 10,
        start_time: this.beginDate,
        end_time: this.endDate,
      });
      this.loading = false;
      $toast.clear();
      if (success) {
        data.detail = data.detail || [];
        if (refresh) {
          this.$refs.vLog.clear();
          this._page = 1;
          this.list = []; //刷新重新放入
        }
        this._page++;
        this.list.push(...data.detail);
        this.finished = data.detail.length < data.page_size;
      } else {
        this.$Toast.fail(msg);
      }
      return success;
    },
    onConfirm(v) {
      switch (this.type) {
        case 0:
          this.beginDate = dayjs(v).format("YYYY-MM-DD");
          break;
        case 1:
          this.endDate = dayjs(v).format("YYYY-MM-DD");
          break;
      }
      this.ShowPicker = false;
    },
  },
};
</script>
<style lang="less" scoped>
.power-info {
  background-color: @bg-second;
  min-height: 100vh;
  padding: 32px;
}

.log {
  overflow: hidden;
  padding: 32px;
  margin-top: 32px;
  border-radius: 8px;
  background-color: @bg-match;
}
.header {
  background-color: @bg-main;
  border-radius: 8px;
  padding: 32px;
  &-form {
    line-height: 60px;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    user-select: text !important;
    div {
      flex: 1;
    }
    span {
      margin: 0 35px;
    }
    input {
      appearance: none;
      display: block !important;
      border: 0;
      text-align: center;
      background-color: transparent;
      width: 100%;
    }
  }
  .btn-search {
    background-image: @btn-main;
    text-align: center;
    line-height: 80px;
    margin-top: 32px;
    border-radius: 8px;
    font-size: 32px;
    color: #fff;
  }
}
</style>
