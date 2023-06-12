<template>
  <div class="super-welfare">
    <div class="bing-title" v-if="info.id != 0">
      欢迎回来，已绑定游戏<span>【{{ info.banding_game_name }}】</span>
    </div>
    <div class="bing-title" v-else>请先【<span>登录</span>】,并绑定游戏</div>
    <div class="welfare-container">
      <div class="title">新人第一弹，登录福利</div>
      <div class="content">
        <div class="contion">
          在活动期间内登录此活动页面即可领取此福利，每位新用户限领1次
        </div>
        <div class="container first-welfare">
          <van-image
            class="item"
            v-for="(item, i) in firstBags.items"
            :key="i"
            :src="item.image"
          />
        </div>
        <div class="">以上奖品包含：{{ firstBags.names }}</div>
        <!-- @click="handOpen(firstBags.id)" -->
        <button
          class="btn first-btn w400"
          :disabled="firstBags.receive_status != 'Unreceived'"
          v-login
          @click="handOpen(firstBags.id)"
          v-gather="{
            event_name: 'props_bags_receive',
            game_id: info.banding_game_id,
            props_bags_id: firstBags.id,
          }"
        >
          {{ status[firstBags.receive_status] }}
        </button>
      </div>
    </div>
    <div class="welfare-container">
      <div class="title">新人第二弹，签到有礼</div>
      <div class="content">
        <div class="contion">
          在活动期间内保持登录并打开此活动，即可领取对应礼包
        </div>
        <div class="container two-welfare">
          <div class="total-login" v-for="(item, i) in secondBags" :key="i">
            <div class="login-day">累计打开{{ item.login_num }}天</div>
            <div class="props">
              <van-image
                class="item two"
                v-for="(y, z) in item.items"
                :key="z"
                :src="y.image"
              />
            </div>
            <div class="footer">
              <div class="ellipsis">{{ item.names }}</div>
              <button
                class="btn small"
                @click="handOpen(item.id)"
                v-gather="{
                  event_name: 'props_bags_receive',
                  game_id: info.banding_game_id,
                  props_bags_id: item.id,
                }"
                v-login
                :disabled="item.receive_status != 'Unreceived'"
              >
                {{ status[item.receive_status] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="welfare-container">
      <div class="title">新人第三弹，专享福利</div>
      <div class="content">
        <!-- <div class="contion">
          在活动期间内保持登录并打开此活动，即可领取对应礼包
        </div> -->
        <div
          class="container three-welfare"
          v-for="(item, x) in threeBags"
          :key="x"
        >
          <div class="prop-list">
            <div class="prop-item" v-for="(prop, i) in item.items" :key="i">
              <div class="props">
                <van-image class="item three" :src="prop.image" />
              </div>
              {{ prop.name }}*{{ prop.num }}
            </div>
          </div>
          <!-- <div class="contion"></div> -->
          <div class="goto">
            <div>任务{{ x + 1 }}：{{ item.name }}</div>
            <router-link
              v-if="item.receive_status == 'NotAllowed'"
              class="btn-go"
              :to="{ name: 'activity_starBoy' }"
              >前往</router-link
            >
          </div>
          <button
            class="btn w400"
            :disabled="item.receive_status != 'Unreceived'"
            @click="handOpen(item.id)"
            v-login
            v-gather="{
              event_name: 'props_bags_receive',
              game_id: info.banding_game_id,
              props_bags_id: item.id,
            }"
          >
            {{ status[item.receive_status] }}
          </button>
        </div>
      </div>
    </div>

    <div class="welfare-container">
      <div class="title">有福同享</div>
      <div class="content four">
        <div class="contion flex items just-between">
          <div>您的邀请码：{{ info.self_invite_code }}</div>
          <div
            class="btn small copy"
            v-clipboard
            :data-clipboard-text="info.self_invite_code"
          >
            复制
          </div>
        </div>
        <div
          class="container mg-tb"
          v-if="isLogin && !info.has_invite_code"
          style="position: relative"
        >
          <input
            class="input"
            v-model="inviteCode"
            placeholder="请输入好友邀请码"
            type="text"
            maxlength="20"
          />
          <button
            class="submit"
            @click="InviteFun"
            v-gather="'confirm_invitation'"
            v-login
          >
            确认
          </button>
        </div>
        <div class="tips" v-show="isLogin">
          好友填写邀请码后，即可解锁对应奖励
        </div>
        <div class="container mg-tb pd-lr">
          <div
            class="progress-title"
            :text="`好友邀请进度（${info.invite_friend_num || 0}/${
              info.invite_friend_num_max || 0
            }）`"
          ></div>
          <div class="scroll-warp">
            <div class="prop-list">
              <div class="prop-item" v-for="(item, x) in friendBags" :key="x">
                <div class="props">
                  <van-image class="item three" :src="item.image_url" />
                </div>
                <div class="ellipsis">{{ item.name }}</div>
              </div>
            </div>
            <div class="prop-list pd invite-list">
              <div class="invite-item" v-for="(item, i) in friendBags" :key="i">
                <div class="line"></div>
                <div class="num-txt">邀请{{ item.invite_friend_num }}人</div>
                <button
                  class="btn small"
                  @click="handOpen(item.id)"
                  v-gather="{
                    event_name: 'props_bags_receive',
                    game_id: info.banding_game_id,
                    props_bags_id: item.id,
                  }"
                  v-login
                  :disabled="item.receive_status != 'Unreceived'"
                >
                  <!-- 领取 -->
                  {{ status[item.receive_status] }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="container mg-tb super-prop">
          <div class="progress-title" text="超级福利"></div>
          <van-image class="super-item" />
          <div>苹果（Apple）2021年新款iPadPro 11英寸平板 <br />邀请10人</div>
          <div class="btn small" disabled>领取</div>
        </div> -->
      </div>
    </div>
    <div class="rule">
      <div class="title">活动规则</div>
      一、新人福利：活动期间玩家在APP内打开本活动界面即可领取。<br />
      二、签到有礼：活动期间，玩家累计登录足够多的天数，即可领取对应档位的奖励。<br />
      三、专享福利：玩家完成对应任务，可获取对应福利礼包。
      <br />
      四、有福同享：<br />
      1、玩家输入任意一人的好友邀请码即可成功完成邀请任务，每个人只能被邀请一次。<br />
      2、邀请人每邀请成功至一定人数时，可获得对应的邀请任务奖励，邀请10人时封顶获得最终奖励。<br />
      五、 奖励由深圳恒兆网络科技有限公司提供，与苹果官方无关
    </div>
    <div class="footer">本活动最终解释权归辰星俱乐部所有</div>
    <bindGame ref="bindGame" @change="getMain"></bindGame>
    <exchangeProps
      @ok="handOk"
      v-model="exchang"
      :gameId="info.banding_game_id"
      title="选择角色"
    />
  </div>
</template>
<script>
import { swMain, swReceive, swInvite } from "@/api/activity/";
import bindGame from "./src/bindGame";
import exchangeProps from "@/components/game/exchangeProps";
import appAction, { actionMap } from "@/utils/app-action";
import { mapGetters } from "vuex";
export default {
  components: { bindGame, exchangeProps },
  created() {
    this.getMain();
  },
  activated() {
    this.getMain();
  },
  data() {
    return {
      info: {},
      bagsId: null,
      inviteCode: null,
      exchang: false,
      code: 1,
      loading: false,
      status: {
        Unreceived: "领取",
        Received: "已领取",
        NotAllowed: "未满足条件",
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    firstBags() {
      const { login_bags = {} } = this.info;
      return this.getProps(login_bags);
    },
    secondBags() {
      const { login_bags_second = [] } = this.info;
      return login_bags_second.map((item) => {
        return this.getProps(item);
      });
    },
    threeBags() {
      const { task_bags = [] } = this.info;
      return task_bags.map((item) => {
        return this.getProps(item);
      });
    },
    friendBags() {
      const { friend_bags = [] } = this.info;
      return friend_bags.map((item) => {
        return this.getProps(item);
      });
    },
  },
  methods: {
    getProps(obj = {}) {
      const {
        game_props_bags_items = { items: [] },
        invite_friend_num = 0,
        login_num = 0,
      } = obj || {};
      return {
        ...game_props_bags_items,
        login_num,
        invite_friend_num,
        names: (game_props_bags_items.items || [])
          .map((item) => item.name + "*" + item.num)
          .join(","),
      };
    },
    async getMain() {
      if (this.loading) return;
      this.loading = true;
      const { id = "" } = this.$route.params;
      const [invite_code, game_id] = id.split("_");
      const { success, data, code } = await swMain({
        game_id,
      });
      this.loading = false;
      this.code = code;
      if (code === 1) {
        this.$refs.bindGame.visible = true;
        //绑定游戏
      } else if (success) {
        appAction(actionMap.setShare, {
          url:
            window.location.href +
            "/" +
            `${data.self_invite_code}_${data.banding_game_id}`,
          ...this.$route.meta.share,
        });
        this.info = data;
        if (!this.isLogin) {
          this.info.self_invite_code = invite_code;
        }
      }
    },
    handOpen(bagsId) {
      this.exchang = true;
      this.bagsId = bagsId;
    },
    async handOk(params = {}) {
      const toast = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await swReceive({
        id: this.info.id,
        props_bags_id: this.bagsId,
        ...params,
      });
      toast.clear();
      if (success) {
        this.exchang = false;
        this.$Toast.success("领取成功");
        this.getMain();
      } else {
        this.$Toast.fail(msg);
      }
    },
    async InviteFun() {
      const toast = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await swInvite({
        invite_code: this.inviteCode,
      });
      toast.clear();
      if (success) {
        this.info.has_invite_code = this.inviteCode;
        this.$Toast.success("助力成功");
        this.inviteCode = undefined;
        this.getMain();
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
