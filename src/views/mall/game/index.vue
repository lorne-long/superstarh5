<template>
  <div class="mall">
    <v-tab
      class="mall-tab"
      :source="tabList"
      v-model="activeName"
      @change="handChange"
    />
    <waterfall
      v-for="tab in tabList"
      v-show="tab.id == activeName"
      :col="2"
      :key="tab.id"
      class="mall-list"
      :data="tab.dataSource"
      @loadmore="PropList"
      ref="virtual"
    >
      <itemComponent
        v-for="item in tab.dataSource"
        :key="item.id"
        :source="item"
        :gameId="item.id"
        :fixed="false"
        :itemClick="exchange"
      />
    </waterfall>

    <v-empty
      v-show="
        tabList[index] &&
        tabList[index].dataSource.length == 0 &&
        tabList[index].loading == false
      "
      style="
        width: 100%;
        text-align: center;
        position: absolute;
        top: 20%;
        widht: 100%;
      "
    />
    <!-- <virtual-list
      v-for="item in tabList"
      ref="virtual"
      image="mall"
      description="咦，当前未有商品，请耐心等待"
      :key="item.id"
      data-key="id"
      class="mall-list"
      wrapClass="mall-index-warp"
      :wrapStyle="{ columnCount: 2 }"
      v-show="item.id == activeName"
      :data-sources="item.dataSource"
      :load-data="PropList"
      :data-component="itemComponent"
      :finished="item.finished"
      :immediate="false"
      :extra-props="{
        itemClick: exchange,
        gameId: item.id,
        fixed: false,
      }"
    >
    </virtual-list> -->
    <v-exchangeProps
      :gameId="activeName"
      title="兑换道具"
      v-model="visible"
      @ok="onReceive"
    >
    </v-exchangeProps>
    <v-exchangeProps
      round
      v-model="showSuccess"
      :title="
        result.list ? '道具列表' : result.success ? '兑换成功' : '兑换失败'
      "
      :footer="null"
      closeable
    >
      <div v-show="result.success">
        <div>兑换后奖品将通过游戏邮件直接发送至您的角色内，请注意查收;</div>
        <div
          class="pop-warp"
          :class="'center' + (curExchange.props || []).length"
          ref="warp"
        >
          <div class="pop-product" v-for="props in curExchange.props || []">
            <van-image class="img" fit="contain" :src="props.image" />
            <div>{{ props.name }}*{{ props.num }}</div>
          </div>
        </div>
      </div>
      <div v-show="!result.success" style="text-align: center">
        {{ result.msg }}
      </div>
    </v-exchangeProps>
  </div>
</template>
<script>
import virtualList from "@/components/virtual-list";
import vTab from "@/components/basic/tab";
import vExchangeProps from "@/components/game/exchangeProps.vue";
import itemComponent from "@/components/mall/item";
import { PropList, ExchangeProps } from "@/api/mall";
import { games } from "@/api/game";
export default {
  name: "mallGame",
  components: {
    vExchangeProps,
    virtualList,
    itemComponent,
    vTab,
  },
  data() {
    return {
      itemComponent,
      activeName: -99,
      index: 0,
      tabList: [],
      visible: false,
      curExchange: { props: [] },
      result: {},
      showSuccess: false,
    };
  },
  mounted() {
    this.getTabs();
  },
  methods: {
    async onReceive(formModal) {
      this.visible = false;
      const $toast = this.$Toast.loading({
        duration: 0,
      });
      const result = await ExchangeProps({
        props_bags_id: this.curExchange.id,
        ...formModal,
      });
      $toast.clear();
      this.result = result;
      this.showSuccess = true;
      this.$nextTick(() => {
        this.$refs.warp && this.$refs.warp.scrollTo(0, 0);
      });
    },
    exchange(v, e) {
      this.curExchange = v; //当前兑换的道具
      this.$refs.warp && this.$refs.warp.scrollTo(0, 0);
      if (e.target.innerText == "兑换") {
        this.visible = true; //弹出对话框
      } else {
        this.result = { success: true, list: true };
        this.showSuccess = true;
        this.$nextTick(() => {
          this.$refs.warp && this.$refs.warp.scrollTo(0, 0);
        });
      }
    },
    handChange(a, idx) {
      this.index = idx;
      if (this.tabList[idx].page == 1)
        this.$refs.virtual[idx].$emit("loadmore"); //页数为1表面未加载过 其实也可以加字段.
    },
    async getTabs() {
      const { success, data } = await games();
      if (success) {
        var list = data.games || [];
        this.tabList = list.map((item) => {
          return {
            id: item.id,
            name: item.name,
            dataSource: [],
            page: 1,
            pageSize: 20,
            finished: false,
            loading: false,
          };
        });
        if (list.length > 0) {
          this.activeName = list[0].id;
          this.$nextTick(() => {
            this.$refs.virtual[0].$emit("loadmore");
          });
        }
      }
    },
    async PropList(refresh = false) {
      const _item = this.tabList[this.index];
      const { page, id, dataSource, finished } = _item;
      if (finished === true && refresh === false) return;
      _item.loading = true;
      const { success, data } = await PropList({
        game_id: id,
        page: refresh ? 1 : page,
      });
      _item.loading = false;
      if (success) {
        const _list = data.props_product_items || [];
        if (refresh) {
          dataSource.length = 0;
          _item.page = 1;
        }
        _item.page++;
        dataSource.push(..._list);
        _item.finished = _list.length < 20;
      }
    },
  },
};
</script>
<style lang="less">
.mall-list {
  background-color: @bg-second;
  .vue-waterfall-column:last-child {
    // width: 331px !important;
    float: right;
    width: auto !important;
  }
}
</style>
<style lang="less" scoped>
.mall {
  background-color: @bg-second;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  &-tab {
    background: @bg-match;
    .scheme(color,@cl-three,@cl-second);
  }
  &-list {
    flex: 1;
    padding: 32px 32px 0;
    .safe-bottom(32px);
    background-color: @bg-second;
    &::after {
      content: "";
      width: 100%;
    }
  }
  .pop-warp {
    display: flex;
    overflow: auto;
    margin-top: 1em;
    &.center1 {
      justify-content: center;
    }
  }
  .pop-product {
    text-align: center;
    line-height: 1.2;
    margin: 0 0.5em;
    flex-shrink: 0;
    width: 140px;
    flex-shrink: 0;
    .img {
      width: 140px;
      height: 140px;
      object-fit: contain;
    }
  }
  .popup-title {
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    color: #2fcbdf;
    letter-spacing: 0;
    padding-top: 80px;
  }
}
</style>
