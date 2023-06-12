<template>
  <Popup position="bottom" class="visible" round v-model="visable">
    <div class="close" @click="toggle()">
      <svg-icon name="close" />
    </div>
    <div class="sku-pupup">
      <div class="cargo-info">
        <VanImage class="logo" fit="scale-down" :src="info.main_image_url" />
        <div class="info">
          <div class="name">
            {{ info.product_name }}
          </div>
          <v-prive :integral="sellPrice" />
        </div>
      </div>
      <div class="sku-warp">
        <div class="sku-item" v-for="(item, x) in specs" :key="item.spec_id">
          <div class="sku-title">选择{{ item.spec_name }}</div>
          <div class="sku-list">
            <div
              class="sku-value"
              v-for="(elm, y) in item.spec_items || []"
              :key="elm.spec_item_id"
              @click="doSkuSet(elm, x, y)"
              :class="[elm.status]"
            >
              {{ elm.spec_item_value }}
            </div>
          </div>
        </div>
      </div>
      <v-button class="btn" :disabled="disabled" @click="handSubmit"
        >确认</v-button
      >
    </div>
  </Popup>
</template>
<script>
import { Popup, Image as VanImage } from "vant";
import "icons/close.svg";
import vPrive from "./price.vue";
import { compact, cloneDeep, pullAt } from "lodash-es";
// 显示状态 status 的常量
const STATUS_UNSELECTED = ""; // 未选中状态
const STATUS_SELECTED = "active"; // 选中状态
const STATUS_DISABLED = "disabled"; // 无效状态
export default {
  components: { Popup, vPrive, VanImage },
  props: {
    info: { type: Object, default: () => ({}) },
  },
  watch: {
    info(v) {
      // this.infoSku(v);
      this.getSkuInit(v);
    },
  },
  mounted() {
    this.getSkuInit(this.info || {});
  },
  data() {
    return {
      visable: false,
      selectedValIdArr: [], //id
      selectedValArr: [], //存值
      specs: [],
      skuAvailableSet: {},
      sellPrice: "0",
    };
  },
  computed: {
    disabled() {
      //全部sku选完  才能点击确定
      return compact(this.selectedValIdArr).length != this.specs.length;
    },
  },
  methods: {
    handSubmit() {
      const { selectedValIdArr, selectedValArr, skuAvailableSet } = this;
      this.$emit("confirm", {
        sku: skuAvailableSet[selectedValIdArr.sort().join(",")],
        values: selectedValArr,
      });
      this.$nextTick(() => {
        this.toggle();
      });
    },
    toggle(v) {
      this.visable = v !== undefined ? v : !this.visable;
    },

    // 转换商品规格的数据
    convertAttrs(record) {
      const { spec_items = [], sku_items = [] } = record;
      // spec_items         //spec_item_ids
      // itemSkus 中用到的所有属性的 id 数组
      let allAttributesIdArr = sku_items
        .map((item) => item.spec_item_ids)
        .flat(); //扁平化 数组 sku 不考虑重复 可以用 new set去重复其实

      // 遍历 attrs 添加默认显示状态(未选中状态)同时删除没用的属性或整条属性
      let _attrs = cloneDeep(spec_items);
      let deleteAttrIndex = [];
      for (let [attrIndex, elem] of spec_items.entries()) {
        let deleteIndex = [];
        const _attrsElem = _attrs[attrIndex].spec_items;
        const attrsElemLen = _attrsElem.length;
        for (let [index, attrElem] of elem.spec_items.entries()) {
          // 添加初始状态
          _attrsElem[index].status = STATUS_UNSELECTED;
          if (allAttributesIdArr.indexOf(attrElem.spec_item_id) === -1)
            deleteIndex.push(index);
        }
        // 如果删除数据的长度等于这条属性的长度 那么删除整条属性 反之则删除某些属性
        attrsElemLen === deleteIndex.length
          ? deleteAttrIndex.push(attrIndex)
          : pullAt(_attrsElem, deleteIndex);
      }
      pullAt(_attrs, deleteAttrIndex); //删除没有使用过 的规格
      return { spec_items: _attrs, sku_items };
    },
    // 获取组合的幂集 && 计算价格区间
    getSkuInit(record) {
      const { spec_items = [], sku_items = [] } = this.convertAttrs(record);
      let skuAvailableSet = {}; // 所有可能的属性组合
      let sellPriceArr = []; // 保存所有的价格
      let attrsLen = spec_items.length;
      // 获取组合的幂集
      for (let skusItem of sku_items) {
        sellPriceArr.push(skusItem.sellPrice);
        // 储存幂集
        let powerSet = [[]];
        for (let attributesIdArrItem of skusItem.spec_item_ids) {
          let len = powerSet.length;
          for (let i = 0; i < len; i++) {
            powerSet.push(powerSet[i].concat(attributesIdArrItem));
          }
        }
        for (let powerSetItem of powerSet) {
          const tmpSet = powerSetItem.sort().join(",");
          // skuAvailableSet存成 [可能组合的id字符串]: [商品属性], 后续取值的时候方便
          if (attrsLen === powerSetItem.length) {
            skuAvailableSet[tmpSet] = skusItem;
          } else if (tmpSet) {
            skuAvailableSet[tmpSet] = {};
          }
        }
      }
      // // 计算价格区间
      // const minsellPrice = min(sellPriceArr);
      // const maxsellPrice = max(sellPriceArr);
      // this.sellPriceRange =
      //   minsellPrice === maxsellPrice
      //     ? minsellPrice
      //     : `${minsellPrice}-${maxsellPrice}`;
      this.skuAvailableSet = skuAvailableSet;
      this.specs = spec_items;
      return {
        skuAvailableSet,
        // sellPrice: this.sellPriceRange,
        spec_items,
        sku_items,
      };
    },
    /*
    attrValue: 点击的属性
    attrIndex: 被点击的属性组的坐标(纵坐标)
    attrValuesIndex: 被点击的属性组下value的坐标(横坐标)
*/
    doSkuSet(attrValue, attrIndex) {
      let {
        specs: attrs,
        selectedValIdArr,
        skuAvailableSet,
        sellPrice,
        selectedValArr,
      } = this;
      // 设置当前属性的显示状态
      const status = attrValue.status;
      switch (status) {
        case STATUS_UNSELECTED:
          attrValue.status = STATUS_SELECTED;
          selectedValIdArr[attrIndex] = attrValue.spec_item_id + ""; //因为默认是0 会被compact去除掉
          selectedValArr[attrIndex] = attrValue.spec_item_value;
          break;
        case STATUS_SELECTED:
          attrValue.status = STATUS_UNSELECTED; //取消选中
          selectedValIdArr[attrIndex] = undefined; //设置选中值为空
          selectedValArr[attrIndex] = undefined;
          break;
        case STATUS_DISABLED:
          return;
        default:
          break;
      }
      // 设置标签的状态 & 商品的价格
      const selectedValIdTrueArr = compact(selectedValIdArr);
      if (selectedValIdTrueArr.length) {
        // 设置标签显示状态
        for (let [attrsIndex, attrsItem] of attrs.entries()) {
          for (let attrValueElem of attrsItem.spec_items) {
            const attrValueId = attrValueElem.spec_item_id;
            //  当前属性是否在已选中的 selectedValIdArr 中, 如果是的话不用重新设置状态
            if (attrValueId == selectedValIdArr[attrsIndex]) continue;

            //  构造当前属性与其他attr已选中的属性的组合
            let tmpSet = cloneDeep(selectedValIdArr);
            tmpSet[attrsIndex] = attrValueId;
            // 判断tmpSet的组合是否可选
            if (skuAvailableSet[compact(tmpSet).sort().join(",")]) {
              attrValueElem.status = STATUS_UNSELECTED;
            } else {
              attrValueElem.status = STATUS_DISABLED;
            }
          }
        }
        // 设置显示价格
        const selecteSellPrice =
          skuAvailableSet[selectedValIdTrueArr.sort().join(",")];
        sellPrice = selecteSellPrice ? selecteSellPrice.integral : "-"; // this.sellPriceRange;
      } else {
        // 全不选的时候将所有属性设置为初始值
        for (let attrsItem of attrs) {
          for (let attrValueElem of attrsItem.spec_items) {
            attrValueElem.status = STATUS_UNSELECTED;
          }
        }
        sellPrice = "-"; // this.sellPriceRange;
      }
      this.sellPrice = sellPrice;
      // this.setState({
      //   selectedValIdArr,
      //   sellPrice,
      //   record: { attrs, ...other },
      // });
      this.specs.splice(0, 0); //触发更新
    },
  },
};
</script>
<style lang="less" scoped>
.close {
  position: absolute;
  top: -64px;
  right: 32px;
  border-radius: 50%;
  border: 1px solid #fff;
  color: #fff;
  padding: 8px;
}
.sku-pupup {
  max-height: 80vh;
  padding: 32px 32px 0;
  border-radius: 16px 16px 0 0;
  background-color: @bg-match;
  display: flex;
  flex-direction: column;
  .safe-bottom(24px);
  .sku-warp {
    flex: 1;
    // overflow-x: hidden;
    // overflow-y: auto;
  }
  .cargo-info {
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .logo {
      width: 172px;
      height: 172px;
      flex-shrink: 0;
      margin-right: 24px;
    }
    .info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }
    .name {
      padding-top: 30px;
      .multi-ellipsis(2);
      font-size: 28px;
      line-height: 36px;
      font-weight: bold;
    }
  }
  .sku-title {
    font-weight: bold;
    font-size: 24px;
    line-height: 1;
    margin: 24px 0;
    color: rgba(27, 30, 36, 0.5);
  }
  .sku-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -32px;
  }
  .sku-value {
    font-size: 24px;
    min-width: 153px;
    text-align: center;
    line-height: 52px;
    margin-left: 24px;
    border-radius: 8px;
    .scheme(color, #333, #fff);
    .scheme(background-color, #f5f5f5, #333);
    border: 1px solid#fff;
    margin-bottom: 24px;
    &.active {
      color: #333;
      background: rgba(57, 205, 223, 0.1);
      border-color: rgba(84, 152, 255, 1);
    }
    &.disabled {
      color: @cl-four;
      // .scheme(background-color, #f5f5f5, #333);
    }
  }
}
</style>
