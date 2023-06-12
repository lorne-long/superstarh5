<template>
  <div class="mall-index">
    <v-tab
      class="flex just-space tab-coutom"
      :source="tabList"
      v-model="activeName"
      @change="handChange"
    />
    <waterfall
      v-show="activeName == 0"
      :col="2"
      class="mall-list"
      :data="tabList[0].dataSource"
      @loadmore="getProduct"
      ref="virtual"
    >
      <itemComponent
        v-for="item in tabList[0].dataSource"
        :key="item.id"
        :source="item"
        :gameId="-99"
        :fixed="false"
      />
    </waterfall>
    <waterfall
      v-show="activeName == 1"
      :col="2"
      class="mall-list"
      :data="tabList[1].dataSource"
      @loadmore="getProduct"
      ref="coupon"
    >
      <itemComponent
        v-for="item in tabList[1].dataSource"
        :key="item.id"
        :source="item"
        :gameId="-999"
        :fixed="true"
      />
    </waterfall>
    <!-- <van-loading
      size="18px"
      type="spinner"
      v-show="tabList[1].loading || tabList[0].loading"
      style="
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 10px;
        widht: 100%;
      "
    /> -->
    <v-empty
      v-show="
        (activeName == 0 &&
          tabList[0].dataSource.length == 0 &&
          !tabList[0].loading) ||
        (activeName == 1 &&
          tabList[1].dataSource.length == 0 &&
          !tabList[1].loading)
      "
      style="
        width: 100%;
        text-align: center;
        position: absolute;
        top: 20%;
        widht: 100%;
      "
    />
  </div>
</template>
<script>
import vTab from "@/components/basic/tab";
import virtualList from "@/components/virtual-list";
import itemComponent from "./item";
import { ProductList, couponList } from "@/api/mall";
export default {
  name: "mallIndex",
  components: {
    vTab,
    virtualList,
    itemComponent,
  },
  data() {
    return {
      activeName: 0,
      index: 0,

      tabList: [
        {
          id: 0,
          loading: false,
          name: "超值商品",
          dataSource: [],
          page: 1,
          pageSize: 20,
          finished: false,
        },
        {
          id: 1,
          name: "抵扣券",
          loading: false,
          dataSource: [],
          page: 1,
          pageSize: 20,
          finished: false,
        },
      ],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    handChange(a, idx) {
      this.index = idx;
      if (this.tabList[idx].page == 1) {
        if (idx == 0) {
          this.$refs.virtual.$emit("loadmore"); //页数为1表面未加载过 其实也可以加字段.
        } else {
          this.$refs.coupon.$emit("loadmore"); //页数为1表面未加载过 其实也可以加字段.
        }
      }
    },
    async getProduct(refresh = false) {
      console.log(1);
      const _item = this.tabList[this.index];
      const { page, dataSource, finished } = _item;
      _item.loading = true;
      if (finished === true && refresh === false) return;
      const { success, data } = await (this.index == 0
        ? ProductList
        : couponList)({
        page: refresh ? 1 : page,
      });
      _item.loading = false;
      if (success) {
        // const _list = data.product_items || [];
        // if (refresh) {
        //   dataSource.length = 0;
        //   this.page = 1;
        // }
        // this.page++;
        // dataSource.push(..._list);
        // this.finished = _list.length < 20;
        const _list = data.product_items || data.product_with_coupon || [];
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
<style></style>
<style lang="less">
.mall-index {
  // background-color: @bg-second;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: @bg-second;
  .tab-coutom {
    background-color: #fff;
  }
}
.mall-list {
  padding: 32px 32px 0;
  .safe-bottom(32px);
  height: 100vh;
  background-color: @bg-second;
  .vue-waterfall-column:last-child {
    float: right;
    width: auto !important;
  }
}
</style>
