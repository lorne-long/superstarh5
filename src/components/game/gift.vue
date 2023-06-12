<template>
  <div class="welfare-list">
    <div class="gift" v-for="(item, i) in bags" :key="i">
      <div class="gift-title">{{ item.name }}</div>
      <div class="gift-condition">{{ item.restriction_description }}</div>
      <div
        class="gift-content"
        :style="{
          backgroundImage: `url(${item.image_url})`,
        }"
      >
        <div class="content">
          <div class="gift-props">
            <div
              class="prop-item"
              v-for="(prop, i) in item.items"
              :key="i"
              @click="(details = prop) && (showDetails = true)"
            >
              <van-image class="img" :src="prop.image" :lazy-load="true" />
              <div class="prop-name">{{ prop.name }}*{{ prop.num }}</div>
            </div>
          </div>
          <v-button
            class="btn"
            :class="{ disabled: !isGet(item) }"
            @click="bindReceive(item, i)"
            v-gather="{
              event_name: 'props_bags_receive',
              page_name: page_name,
              props_bags_id: item.id,
              game_id: gameId,
            }"
          >
            {{ statusMap[item.receive_status] }}
          </v-button>
          <!-- <div class="meet" v> 您未满足条件啦</div>
          <div class="meet">您已满足该条件，可以领取礼包啦</div> -->
        </div>
      </div>
    </div>
    <div style="text-align: center; padding: 1em 0" v-show="loading">
      <van-loading type="spinner" class="loading" size="14" />
    </div>
    <v-empty
      image="bag"
      v-show="!loading && bags.length == 0"
      description="呀，当前暂无礼包"
    />
    <Popup v-model="visible" class="visible" closeable round>
      <div class="popup-warp receive">
        <div class="receive-header">选择角色</div>
        <v-role ref="role" :gameId="gameId"></v-role>
        <div class="tips">
          礼包内奖品将通过游戏邮件方式发送给您，您可在我的-礼包记录中查询详情
        </div>
        <v-button class="receive-btn" @click="handOk()">确认</v-button>
      </div>
    </Popup>
    <Popup v-model="showDetails" class="visible" round>
      <div
        class="popup-warp flex column just items"
        style="text-align: center; height: 200px"
      >
        <van-image class="img" width="70" :src="details.image" />
        <br />
        <div class="prop-name">{{ details.name }}*{{ details.num }}</div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Popup } from "vant";
// 领取状态 Unreceived-未领取 Received-已领取 NotAllowed-不可领取
import { WelfareDetail, WelfareReceive } from "@/api/welfare";
import vRole from "./role.vue";
export default {
  components: { Popup, vRole },
  props: {
    gameId: { type: [String, Number] },
  },
  data() {
    return {
      statusMap: {
        Unreceived: "领取",
        Received: "已领取",
        NotAllowed: "暂不满足条件",
      },
      bags: [],
      game: {},
      visible: false,
      details: {},
      showDetails: false,
      loading: false,
      idx: undefined,
    };
  },
  computed: {
    page_name() {
      return this.$route.name == "game" ? "game_welfare" : "welfare";
    },
  },
  watch: {
    gameId() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.gameId === undefined) return;
      this.loading = true;
      const { success, data, msg } = await WelfareDetail(this.gameId);
      this.loading = false;
      if (success) {
        this.bags = data.game_props_bags_items || [];
        this.game = data.game || {};
      } else {
        this.$Toast.fail(msg);
      }
    },
    isGet(v) {
      return v.receive_status === "Unreceived";
    },
    bindReceive(item, idx) {
      this.idx = idx;
      this.isGet(item) && (this.visible = true);
    },
    async handOk() {
      const { formModal } = this.$refs.role;
      console.log("formModal gift:", formModal);
      if (!formModal.role_id) {
        return this.$Toast("请选择角色");
      }
      const _this = this;
      const $toast = this.$Toast.loading({ duration: 0 });
      const { success, msg } = await WelfareReceive({
        props_bags_id: this.bags[this.idx].id,
        ...formModal,
      });
      $toast.clear();
      if (success) {
        _this.bags[this.idx].receive_status = "Received";
        _this.$Toast.success("领取成功");
        this.$nextTick(() => {
          _this.visible = false;
        });
        _this.$emit("change", true);
      } else {
        _this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.welfare-list {
  padding: 32px;
  flex: 1;
  overflow: auto;
}
.gift {
  margin-bottom: 32px;
  &-title {
    font-size: 36px;
    font-weight: bold;

    letter-spacing: 0;
    line-height: 44px;
  }
  &-condition {
    margin-top: 8px;
    color: @main;
    font-size: 24px;
  }
  &-content {
    margin-top: 32px;
    background-size: cover;
    padding: 32px;
    border-radius: 8px;
    position: relative;
    &::after {
      content: "";
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: @game-filter;
    }
    .content {
      position: relative;
      z-index: 2;
    }
  }
  &-props {
    display: flex;
    flex-wrap: nowrap;
    // height: 182px;
    overflow: auto;
    background-color: @game-prop;
    border-radius: 8px;
    padding: 32px 32px 32px 0;
    .prop-item {
      width: 6em;
      margin-left: 16px;
      text-align: center;
      font-size: 24px;
      line-height: 30px;
    }
    .img {
      display: inline-block;
      width: 72px;
      height: 72px;
      margin-bottom: 12px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .prop-name {
      // width: em;
      .ellipsis();
    }
  }
  .btn {
    margin-top: 25px;
  }
  .meet {
    margin-top: 16px;

    text-align: center;
  }
}
</style>
<style lang="less" scoped>
.receive {
  border-radius: 16px;
  padding: 32px;
  background-color: @bg-match;
  .safe-bottom(24px);
  .receive-header {
    margin-bottom: 32px;
  }
  .tips {
    font-size: 24px;
    color: @cl-second;
    letter-spacing: 0;
    line-height: 30px;
  }
  &-btn {
    margin-top: 24px;
  }
}
</style>
