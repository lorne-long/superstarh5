<template>
  <div class="container">
    <vip>
      <template slot="rule">
        <span @click="showRule = true">积分规则</span>
      </template>
    </vip>
    <van-pull-refresh
      v-model="refresh"
      @refresh="onRefresh(true)"
      class="w"
      :infinite-scroll-distance="50"
      v-infinite-scroll="getData"
    >
      <div class="integral-log">
        <v-log ref="vLog" :dataSource="list" />
        <div class="loading" v-show="loading">
          <van-loading type="spinner" size="20" />
        </div>
        <v-empty v-if="isEmpty && !loading && !refresh" />
      </div>
    </van-pull-refresh>
    <van-popup v-model="showRule" round closeable>
      <div class="popup-warp">
        <div class="title">积分规则</div>
        <div class="popup-content">
          <ul style="list-style-type: decimal; padding-left: 1em">
            <li>
              积分获取：
              <ul style="list-style-type: lower-alpha; padding-left: 1em">
                <li>
                  在《辰星俱乐部》上架的游戏中每实际充值1元可获得10积分。（例：充值100元档，使用了10元代金券，实际支付90元，则获得900点积分）
                </li>
                <li>
                  通过《辰星俱乐部》中的活动和任务获取积分。（签到、活动）
                </li>
              </ul>
            </li>

            <li>积分有效期：所获得的积分有效期均为6个月。</li>
            <li>《辰星俱乐部》保留对上述规则进行解释的权利。</li>
          </ul>
          <br />
        </div>
        <div>
          <v-button @click="showRule = false">我知道了</v-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import vip from "@/components/my/vip.vue";
import vLog from "@/components/list/log.vue";
import { PullRefresh, Popup } from "vant";
import { integralList } from "@/api/power";
import infiniteScroll from "vue-infinite-scroll";
//初始数据
export default {
  components: {
    vip,
    vLog,
    [Popup.name]: Popup,
    [PullRefresh.name]: PullRefresh,
  },
  directives: {
    infiniteScroll: infiniteScroll,
  },
  data() {
    return {
      refresh: false,
      showRule: false,
      loading: false,
      finished: false,
      list: [],
    };
  },
  created() {
    this._page = 1;
  },
  computed: {
    isEmpty() {
      return this.list.length === 0;
    },
  },
  methods: {
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.getData(true);
    },
    async getData(refresh = false) {
      if (this.finished && refresh !== true) return;
      if (this.refresh == false) this.loading = true;
      const { success, data } = await integralList({
        page: refresh ? 1 : this._page,
        page_size: 10,
      });
      this.loading = this.refresh = false;
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
      }
      return success;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 32px;
  background-color: @bg-second;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .w {
    flex: 1;
    margin-top: 32px;
    overflow: auto;
    border-radius: 8px;
  }
  .loading {
    margin: 0 auto;
    padding: 32px 0;
    text-align: center;
  }
  .integral-log {
    overflow: hidden;
    padding: 32px;
    border-radius: 8px;
    background-color: @bg-match;
  }
}
</style>
