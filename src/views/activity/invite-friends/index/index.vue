<template>
  <div class="invite-friends">
    <div class="box my-income">
      <div class="title">我的收益</div>
      <div class="problem" @click="handRule"></div>
      <div class="my-coin">
        <i class="coin"></i>
        <div>+{{ info.today_coin || 0 }}</div>
      </div>
      <div class="text">今日收益</div>
      <div class="list-data">
        <div class="item-data">
          <div class="data-val">{{ info.can_use_coin || 0 }}</div>
          <div>可用星币</div>
        </div>
        <div class="item-data">
          <div class="data-val">{{ info.total_coin || 0 }}</div>
          <div>累计收益</div>
        </div>
        <div class="item-data">
          <div class="data-val">{{ info.this_month_coin || 0 }}</div>
          <div>本月收益</div>
        </div>
      </div>
    </div>
    <div class="my-code">
      <div>
        <div>你的邀请码</div>
        <div class="code">{{ info.self_invite_code || "-" }}</div>
      </div>
      <div
        class="copy"
        v-clipboard
        :data-clipboard-text="info.self_invite_code"
      >
        复制
      </div>
    </div>
    <invited
      ref="invited"
      @success="getMain"
      :help-code="info.has_help_friend_invite_code"
    />
    <div class="box my-invite">
      <div class="title">我的邀请</div>
      <div class="list-data">
        <router-link
          tag="button"
          v-login
          class="item-data"
          :to="{ name: 'activity_inviteFriends_my' }"
        >
          <div class="data-val ohter">{{ info.invite_friends_num || 0 }}</div>
          <div>成功邀请好友</div>
        </router-link>
        <router-link
          tag="button"
          v-login
          class="item-data"
          :to="{ name: 'activity_inviteFriends_my', params: { id: 2 } }"
        >
          <div class="data-val ohter">
            {{ info.invite_friends_exclusive_num || 0 }}
          </div>
          <div>专属好友</div>
        </router-link>
      </div>
      <router-link
        class="downld"
        v-gather="'exclusive_game_download'"
        :to="{ name: 'game', params: { id: info.game_id } }"
        >下载专属游戏</router-link
      >
    </div>
    <div class="box my-ranking">
      <router-link
        :to="{ name: 'activity_inviteFriends_ranking' }"
        class="title"
        >排行榜 <svg-icon name="down" dir="right"></svg-icon
      ></router-link>
      <div class="ranking-list">
        <div class="ranking" v-for="(item, i) in info.rank_list || []" :key="i">
          <div class="flex items">
            <div class="num">{{ i + 1 }}</div>
            <div class="avatar">
              <van-image :src="getAvatar(1)"></van-image>
            </div>
            <div>{{ item.nickname | hide }}</div>
          </div>
          <div class="flex items">
            <span>{{ item.coin }}</span>
            <i class="coin small"></i>
          </div>
        </div>
      </div>
      <div class="my">
        <span
          >当前你在：{{
            info.rank_list_my_index > 999
              ? "999+"
              : info.rank_list_my_index || 0
          }}</span
        >
        <span class="flex items"
          ><span>{{ info.total_coin || 0 }}</span> <i class="coin small"></i
        ></span>
      </div>
    </div>
    <exchange
      :kid="info.id"
      ref="exchange"
      :dataSource="info.props_product_items || []"
      :gameId="info.game_id"
    />
    <div class="box rule">
      <div class="title">活动规则</div>
      <p>
        1.用户邀请老用户或新用户进入平台时，会让用户填写邀请码。每位首次进入平台的用户仅能填写一名用户的邀请码。
      </p>
      <p>2.用户填写邀请码后视为【已邀请好友】。邀请人可直接获得20星币。</p>
      <p>3.已邀请好友下载并注册《火柴人觉醒》后，会被视为《专属好友》。</p>
      <p>4.专属好友在游戏内充值时，邀请人可获得金额的1:10的星币</p>
      <p>5.每15天可以进行换绑</p>
      <p>6.仅首次绑定可以获得星币奖励。</p>
      <p>
        假设1：用户当前有2名专属好友，一名用户今日充值300元，另一名用户今日充值1000元，则邀请人可获得（300+1000）*10=13000星币（大约价值130元）
      </p>
      <p>
        假设2:用户当前拥有5名专属好友，2名今日未充值，3名今日总共充值954元，则邀请人获得9540星币（大约价值95.4元）
      </p>
      <p>5.奖励由深圳恒兆网络科技有限公司提供，与苹果官方无关</p>
    </div>
    <div class="footer">本活动最终解释权归辰星俱乐部所有</div>
  </div>
</template>
<script>
import "icons/down.svg";
import exchange from "./src/exchange.vue";
import invited from "./src/invited.vue";
import { Main } from "@/api/activity/invitefriends";
import { mapGetters } from "vuex";
import appAction, { actionMap } from "@/utils/app-action";
export default {
  components: { exchange, invited },
  data() {
    return {
      info: {},
      loading: false,
    };
  },
  created() {
    this.getMain();
  },
  activated() {
    this.getMain();
  },
  computed: {
    ...mapGetters(["getAvatar", "isLogin"]),
  },
  methods: {
    handRule() {
      this.$root.$el.scrollTo({
        top: this.$root.$el.scrollHeight,
        behavior: "smooth",
      });
    },
    async getMain() {
      if (this.loading) return;
      this.loading = true;
      const { success, data } = await Main();
      this.loading = false;
      if (success) {
        this.info = data;
        if (!this.isLogin) {
          this.info.self_invite_code = this.$route.params.code;
        } else {
          appAction(actionMap.setShare, {
            url: window.location.href + "/" + data.self_invite_code,
            ...this.$route.meta.share,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../coin.less";
@import "./index.less";
</style>
