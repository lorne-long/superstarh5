<template>
  <div class="cargo">
    <!-- <van-sticky> <van-nav-bar title="商品详情" /></van-sticky> -->
    <Swipe class="cargo-swipe">
      <SwipeItem v-for="(item, i) in images" fit="fill" :key="i">
        <VanImage class="img" fit="scale-down" :src="item" />
      </SwipeItem>
    </Swipe>
    <div class="cargo-info">
      <div class="contaion cargo-first">
        <div class="flex items just-between">
          <div class="cargo-name">{{ infoMation.product_name }}</div>
          <div class="nowrap">库存：{{ inventory }}</div>
        </div>
        <div class="flex items just-between">
          <div class="label">商品销量：</div>
          <div>{{ infoMation.sales }}</div>
        </div>
        <div class="flex items just-between">
          <div class="label">兑换所需积分：</div>
          <div><v-price class="cargo-price" :integral="integral" /></div>
        </div>

        <div class="flex items just-between">
          <div class="label">使用条件：</div>
          <div>{{ infoMation.restriction_description }}</div>
        </div>
      </div>
      <section class="contaion">
        <div class="title">选择规格</div>
        <div
          class="sku-control"
          v-for="(item, i) in infoMation.spec_items || []"
          :key="i"
          @click="showSku"
        >
          <div class="sku-control-name label">选择{{ item.spec_name }}：</div>
          <div class="sku-control-val">
            {{ values[i] || "默认/" + item.spec_name }}
          </div>
          <svg-icon dir="right" name="down" class="label" />
        </div>
      </section>
      <div class="contaion">
        <div class="title">宝贝详情</div>
        <div class="cargo-html rich-html" v-html="infoMation.detail"></div>
      </div>
    </div>
    <div class="cargo-buy">
      <v-button @click="handBuy()" :disabled="inventory <= 0">{{
        inventory > 0 ? "兑换" : "库存不足"
      }}</v-button>
    </div>
    <v-sku ref="sku" :info="infoMation" @confirm="onConfirm" />
  </div>
</template>
<script>
import { Swipe, SwipeItem, Image as VanImage } from "vant";
import "icons/down.svg";
import vPrice from "@/components/mall/price";
import vSku from "@/components/mall/sku";
import { ProductDetail } from "@/api/mall";
import vTest from "./stockpile";
// import { NavBar, Sticky } from "vant";
export default {
  name: "mallDetail",
  components: {
    VanImage,
    Swipe,
    SwipeItem,
    vPrice,
    vSku,
    vTest,
  },
  data() {
    return {
      sku: undefined,
      infoMation: {
        product_name: "",
        detail: "",
        restriction_description: "",
        spec_items: [],
        integral: 0,
        sales: 0,
        inventory: 0,
      },
      images: [],
      values: [],
    };
  },
  created() {
    this.handLoad();
  },
  computed: {
    integral() {
      const count = !this.sku ? this.infoMation.integral : this.sku.integral;
      return String(count || 0);
    },
    inventory() {
      const count = !this.sku ? this.infoMation.inventory : this.sku.inventory;
      return String(count || 0);
    },
  },
  methods: {
    async handLoad() {
      this.$Toast.loading({ duration: 0 });
      const { success, data, msg } = await ProductDetail({
        id: this.$route.params.id,
      });
      this.$Toast.clear();
      if (success) {
        this.infoMation = data;
        this.images = data.images || [];
      } else {
        this.$Toast.fail(msg);
      }
    },
    onConfirm({ sku, values }) {
      this.sku = sku;
      this.values = values;
      this.$nextTick(() => {
        this.$router.push({
          name: "mallOrderConfirm",
          params: { id: this.infoMation.id, sku: this.sku.sku_id },
        });
      });
    },
    showSku() {
      this.$refs.sku.toggle(true);
    },
    handBuy() {
      this.showSku();
    },
  },
};
</script>
<style lang="less" scoped>
.cargo {
  background-color: @bg-second;
  min-height: 100vh;
  .safe-bottom(128px);
  .img {
    width: 100%;
    height: 100%;
  }
  .pdlr {
    padding: 0 32px;
    background-color: @bg-match;
  }
  &-swipe {
    background-color: #fff;
    height: 430px;
  }
  &-parice {
    margin: 16px 0 24px 0;
  }
  &-price {
    margin: 16px 0 24px 0;
  }
  &-first {
    padding-top: 32px;
    .flex:first-child {
      margin-bottom: 32px;
    }
  }
  &-name {
    .multi-ellipsis(2);
    font-size: 28px;
    font-weight: bold;
    line-height: 1.6;
    padding-right: 3em;
    color: rgba(27, 30, 36, 1);
  }
  .label {
    color: rgba(27, 30, 36, 0.5);
  }
  .nowrap {
    white-space: nowrap;
    flex-shrink: 0;
  }
  &-condition {
    font-size: 28px;
    color: #999999;
    line-height: 32px;
    margin-top: 24px;
    padding-bottom: 32px;
  }
  &-info {
    padding: 32px;
  }
  .contaion {
    border-radius: 8px;
    background-color: @bg-match;
    padding: 32px;
    margin-bottom: 32px;
    .title {
      font-weight: bold;
      font-size: 32px;
      padding-bottom: 32px;
      position: relative;
      &:before {
        position: absolute;
        left: -32px;
        top: 2px;
        content: "";
        width: 6px;
        height: 24px;
        background: linear-gradient(
          to bottom,
          rgba(84, 152, 255, 1),
          rgba(0, 217, 208, 1)
        );
      }
      &:after {
        position: absolute;
        bottom: 0;
        content: "";
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.03);
        height: 1px;
      }
    }
  }
  .cargo-html {
    margin-top: 32px;
  }
  .sku-control {
    font-size: 28px;
    line-height: 34px;
    display: flex;
    margin-top: 35px;
    align-items: center;
    &-val {
      flex: 1;
    }
  }
  &-buy {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    background-color: @bg-match;
    .safe-bottom(24px);
  }
}
</style>
