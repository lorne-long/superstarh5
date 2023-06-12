<template>
  <div class="star-boy">
    <div class="bing-title">
      <div v-if="main.id != 0">
        欢迎回来，已绑定游戏<span>【{{ main.banding_game_name }}】</span>
      </div>
      <div v-else>请先【<span>登录</span>】,并绑定游戏</div>
    </div>
    <recharge :main="main" />
    <team @change="getMain" :params="teamParams" />
    <blindBox @change="getMain" :params="boxParams" />
    <products :products="props" :gameId="main.banding_game_id" :id="main.id" />
    <div class="container rule">
      <div class="title">活动规则</div>
      1、用户每日可获得1次免费充能次数。<br />
      2、同行的伙伴若当天完成了1次飞船充能，在获得充能机会的同时，队伍内的伙伴均能再获得1次充能次数（每人每天最多额外获得5次充能次数）。<br />
      3、每个用户每天最多进行{{ main.charge_num_max }}次飞船充能。<br />
      4、同行的伙伴最多为5人（包括自己）。<br />
      5、玩家每次进行充能必定获得飞船币，且有概率获得盲盒开启机会并充能进度从头开始。<br />
      6、充能1次，则飞船会前进5-10KM随机，当达到目标100km时，必会获得一次抽取盲盒的机会，数据清0从头开始。<br />
      7、每个盲盒仅可开启一次，盲盒内可开出飞船币，全部开启后会重新刷新盲盒，队伍共用一批盲盒。<br />
      8、活动最终解释权归辰星俱乐部APP所有。<br />
      9、奖励由深圳恒兆网络科技有限公司提供，与苹果官方无关
    </div>
    <div class="footer">本活动最终解释权归辰星俱乐部所有</div>
    <bindGame ref="bindGame" @change="getMain"></bindGame>
    <vLog ref="vLog" :type="3" />
  </div>
</template>
<script>
import { tripMain } from "@/api/activity/";
import bindGame from "./src/bindGame";
import team from "./src/team";
import blindBox from "./src/blindBox";
import products from "./src/props";
import recharge from "./src/recharge";
import vLog from "@/components/barrage/log";
import appAction, { actionMap } from "@/utils/app-action";
import { mapGetters } from "vuex";
export default {
  components: { bindGame, team, products, blindBox, recharge, vLog },
  created() {
    this.getMain();
  },
  activated() {
    this.getMain();
  },
  data() {
    return { visible: true, main: {}, props: [], loading: false };
  },
  provide() {
    return {
      refresh: this.getMain,
    };
  },
  computed: {
    ...mapGetters(["avatar"]),
    teamParams() {
      const { team, id, self_invite_code } = this.main || { team: {} };
      return {
        id,
        self_invite_code,
        team_invite_code: team ? team.team_invite_code : "",
        members: team ? team.members : [],
      };
    },
    boxParams() {
      const { id, lottery_num, box = [] } = this.main || {};
      return {
        id,
        box,
        lottery_num,
      };
    },
  },
  methods: {
    async getMain() {
      if (this.loading) return;
      this.loading = true;
      const { success, data, code } = await tripMain({
        game_id: this.$route.params.id,
      });
      this.loading = false;
      if (code == 1) {
        this.$refs.bindGame.visible = true;
      } else if (success) {
        this.main = data.main || {};
        appAction(actionMap.setShare, {
          url: window.location.href + "/" + data.main.banding_game_id,
          ...this.$route.meta.share,
        });
        this.props = data.props_product_items || [];
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
