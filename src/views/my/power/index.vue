<template>
  <div class="my-power">
    <vip type="1">
      <template slot="rule">
        <span @click="showRule = true">权益说明</span>
      </template>
    </vip>
    <div class="my-power-step">
      <div class="step-warp">
        <div class="line-incline"></div>
        <div class="step-item" v-for="(item, index) in rules" :key="index">
          <div
            class="cylinder"
            :class="[
              `vip${item.level}`,
              { active: item.level <= userInfo.platform_vip_level || 0 },
            ]"
          >
            <div class="cylinder-num">{{ item.min }}</div>
            <div
              class="position"
              v-if="index == userInfo.platform_vip_level"
              @click="showPopover = true"
            >
              <Popover
                v-model="showPopover"
                :placement="
                  [1, 0].indexOf(index) > -1
                    ? 'right'
                    : [4, 5].indexOf(index) > -1
                    ? 'left'
                    : 'bottom'
                "
                v-if="index == (userInfo.platform_vip_level || 0)"
              >
                <div class="tips">
                  {{ tips }}
                </div>
                <template #reference>
                  <img class="avatar" :src="avatar" />
                </template>
              </Popover>
            </div>
          </div>
          <div class="vip-text">
            <div>V{{ item.level }}</div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-power-list">
      <div class="title">
        <div @click="$refs.swipe1.prev()">
          <svg-icon className="icon rer" name="right-d" />
        </div>
        <div class="name">
          <van-swipe
            :loop="false"
            ref="swipe"
            @change="(e) => $refs.swipe1.swipeTo(e)"
            :initial-swipe="myVip"
            :show-indicators="false"
          >
            <van-swipe-item v-for="(item, idx) in rules" :key="idx">
              V{{ item.level + item.name }}
            </van-swipe-item>
          </van-swipe>
        </div>
        <div @click="$refs.swipe1.next()">
          <svg-icon className="icon" name="right-d" />
        </div>
      </div>
      <van-swipe
        ref="swipe1"
        :loop="false"
        @change="(e) => $refs.swipe.swipeTo(e)"
        :initial-swipe="myVip"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, idx) in vipConfig" :key="idx">
          <div class="warp">
            <div
              class="item"
              v-for="(item, idx) in item.power"
              :key="idx"
              @click="(showPower = item), (showPopup = true)"
            >
              <div :class="`icon icon-${imgMap[item]}`">
                <!-- <svg-icon className="icon" name="right-d" /> -->
              </div>
              <div>{{ item }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-popup v-model="showRule" round closeable>
      <div class="popup-warp">
        <div class="title">权益说明</div>
        <div class="popup-content">
          <br />
          <ul style="list-style-type: decimal; padding-left: 1em">
            <li>
              成长值获取：在游戏中每实际充值1元可获得10成长值。（例：充值100元档，使用了10元代金券，实际支付90元，则获得900点积分）。
            </li>
            <li>成长值有效期为365天，可通过累积升级至更高的VIP等级。</li>
            <li>
              用户因过期或降级扣除的成长值会等额转化为待激活成长值，当获得新的成长值时能够重新激活。不同的VIP等级可获取的待激活成长值比例不同。（例：小星待激活成长值有3000，小婷充值100元后可获得1000成长值+1000待激活成长值，剩余2000待激活成长值）
            </li>
            <li>
              户用达到VIP5后将永久保护当前账号的300W成长值，且永久享受V5特权及权益。
            </li>
          </ul>
          <br />
        </div>
        <div>
          <v-button @click="showRule = false">我知道了</v-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showPopup" position="bottom" class="popup">
      <div class="title">专属道具内容-{{ showPower }}</div>
      <div class="content">{{ powerInfo.value }}</div>
      <div class="vip" v-show="powerInfo.vips != ''">{{ powerInfo.vips }}</div>
    </van-popup>
  </div>
</template>
<script>
import "icons/right-d.svg";
import vip from "@/components/my/vip.vue";
import { Swipe, SwipeItem, Popup, Popover } from "vant";
import vipConfig, { powerMap } from "@/config/vip";
import { VipRule } from "@/api/power";
import { mapGetters } from "vuex";
export default {
  components: {
    vip,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
    Popover,
  },
  data() {
    return {
      showPopover: false,
      showRule: false,
      vipConfig,
      powerMap,
      myVip: 0,
      imgMap: {
        "1V1客服": "t1",
        充值返利: "t2",
        会员商城: "t3",
        抢先试玩: "t4",
        日礼包: "t5",
        申诉优先: "t6",
        生日祝福: "t7",
        特权礼包: "t8",
        修复优先: "t9",
        月礼包: "t10",
        周礼包: "t11",
        专属道具: "t12",
        专属见面礼: "t13",
        新游礼包: "t14",
        生日礼包: "t15",
      },
      rules: [],
      showPower: "",
      showPopup: false,
    };
  },
  watch: {
    userInfo(v) {
      this.$nextTick(() => {
        this.$refs.swipe1.swipeTo(v.platform_vip_level);
        // this.myVip = v.platform_vip_level;
      });
    },
  },
  created() {
    if (this.userInfo) this.myVipv = this.userInfo.platform_vip_level || 0;
    this.getRule();
  },
  computed: {
    ...mapGetters(["userInfo", "avatar"]),
    tips() {
      const {
        platform_vip_level,
        next_level_grow,
        total_grow,
        vip_name,
        next_level_name,
      } = this.userInfo;
      if (platform_vip_level == 5) {
        return "你已经是最高等级了,享受永久会员权益,请继续保持";
      } else {
        return `您是尊贵的"${vip_name}"，当前${total_grow}点成长值，再提升${
          next_level_grow - total_grow
        }点成长值可升级成"${next_level_name}"，即刻享受永久会员权益！`;
      }
    },
    powerInfo() {
      return this.powerMap[this.showPower] || {};
    },
  },
  // int32 id = 1;           // 主键ID
  // string model_code = 2;  // 成长值模型代码
  // string name = 3;        // 等级名称
  // int32 level = 4;        // 等级
  // int32 min = 5;          // 达到等级的最低成长值
  // int32 rebate_rate = 6;  // 成长值返利比例，单位(%)
  methods: {
    async getRule() {
      const loading = this.$Toast.loading({ duration: 0 });
      const { success, data = {} } = await VipRule();
      loading.clear();
      if (success) {
        this.rules = data.rules;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.powers() {
  t1: "1V1客服";
  t2: "充值返利";
  t3: "会员商城";
  t4: "抢先试玩";
  t5: "日礼包";
  t6: "申诉优先";
  t7: "生日祝福";
  t8: "特权礼包";
  t9: "修复优先";
  t10: "月礼包";
  t11: "周礼包";
  t12: "专属道具";
  t13: "专属见面礼";
  t14: "专属礼包";
  t15: "生日专属";
}
each(.powers(),{
  .icon-@{key}{
    width: 80px;
    height: 80px;
    .img('rights/@{value}')
  }
});

@viph: 26px, 64px, 103px, 141px, 180px, 218px;
.my-power {
  background-color: @bg-second;
  min-height: 100vh;
  padding: 32px;
  &-step {
    position: relative;
    background-color: @bg-match;
    margin-top: 32px;
    height: 448px;
    border-radius: 8px;
    .step-warp {
      position: absolute;
      display: flex;
      bottom: 32px;
      left: 0;
      width: 100%;
    }
    .step-item {
      width: 16.66%;
      text-align: center;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: center;
      color: #d3b784;
    }
    .vip-text {
      font-size: 24px;
      line-height: 28px;
      transform: scale(0.8);
    }
    .cylinder {
      position: relative;
      width: 24px;
      .scheme(background-color,rgba(0, 0, 0, 0.1),rgba(255, 255, 255, 0.1));
      &.active {
        .scheme(background-image,linear-gradient(0deg, #F2E9CA 0%, #C49E61 100%), linear-gradient(0deg, #D4C094 0%, #9b8d67 100%));
      }
      border-radius: 12px;
      white-space: nowrap;
      each(@viph,{
            &.vip@{index}{
                height:@value;
            }
        });
      &-num {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) scale(0.8);
        transform-origin: 50% 0;
      }
    }
    .line-incline {
      position: absolute;
      bottom: 80%;
      left: 4.165%;
      border-top: 1px dashed #d3b784;
      width: 91.67%;
      transform: rotate(-19deg);
      transform-origin: 50% 100%;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 98%;
        border: 20px solid transparent;
        border-left-color: #e6be87;
        transform-origin: 0 0;
        transform: scaleY(0.25) translateY(-50%);
      }
    }
    .position {
      position: absolute;
      bottom: calc(100% + 55px);
      left: 50%;
      width: 40px;
      height: 66px;
      transform: translateX(-50%);
      &::after {
        content: "";
        left: 0;
        top: 0;
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 100%;
        .img("position-v0");
      }
      .avatar {
        width: 40px;
        height: 40px;
        display: block;
        object-fit: fill;
        border-radius: 50%;
      }
    }
  }
  &-list {
    position: relative;
    margin-top: 32px;
    padding: 32px 0;
    background-color: @bg-match;
    border-radius: 8px;
    .title {
      display: flex;
      width: 100%;
      margin: 12px 0;
      font-size: 32px;
      justify-content: center;

      font-weight: bold;
      align-items: center;
      .name {
        width: 50vw;
        text-align: center;
      }
      .icon {
        color: #cab78b;
        &.rer {
          transform: rotate(180deg);
        }
      }
    }
    .warp {
      display: flex;
      flex-wrap: wrap;
      .icon {
        height: 72px;
        width: 100%;
        margin-bottom: 20px;
      }
      .item {
        flex-direction: column;
        text-align: center;
        width: 20%;
        margin-top: 36px;
        display: flex;
        justify-content: center;
        font-size: 24px;
      }
    }
  }
}
.tips {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 429px;
  // white-space: pre-wrap;
  padding: 15px;
  // background-color: #fff;
  // box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  // transform: translateX(-50%);
  border-radius: 8px;
  font-size: 20px;
  line-height: 28px;
}
.popup {
  padding: 0 32px 32px;
  .title {
    font-size: 28px;
    letter-spacing: 0;
    margin: 22px 0 28px;
  }
  .content {
    font-size: 28px;
    color: #666666;
    letter-spacing: 0;
    line-height: 42px;
  }
  .vip {
    display: inline-block;
    background: #e4c79b;
    border-radius: 4px;
    color: #333;
    font-size: 24px;
    margin-top: 16px;
    line-height: 36px;
    padding: 0 10px;
  }
}
</style>
