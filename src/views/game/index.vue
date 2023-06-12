<template>
  <Skeleton title :row="15" :loading="loading" style="padding-top: 1em">
    <div class="game" v-if="!empty" :class="{ safe: platform.myApp }">
      <Swipe class="game-banner">
        <SwipeItem
          v-for="item in bannerImages"
          fit="fill"
          :key="item"
          class="img"
        >
          <VanImage class="img" :src="item" />
        </SwipeItem>
      </Swipe>
      <div class="game-top">
        <div class="game-info">
          <img :src="gameInfo.logo" class="logo" alt="" />
          <div class="">
            <div class="name">
              {{ gameInfo.name }}
            </div>
            <div class="grey" v-show="!isReview">
              <template v-if="isOnline">
                <span class="second">{{ getNum(gameInfo.download_num) }}</span
                >下载
              </template>
              <template v-else>
                <span class="second">{{
                  getNum(gameInfo.appointment_num)
                }}</span
                >预约</template
              >
            </div>
            <div class="style-info">{{ gameInfo.description }}</div>
          </div>
        </div>
        <div class="appointment" v-if="!isOnline">
          {{ gameInfo.online_desc }}
          <!-- 预约说明 -->
        </div>
        <!-- <div class="unplay" v-if="!gameInfo.had_played">您还未进行过游戏</div> -->
      </div>
      <div class="tab line-b">
        <div
          class="tab-item"
          @click="active = i"
          v-for="(item, i) in tabs"
          :class="{ active: active == i }"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <div class="tab-content">
        <div v-show="active == 0" class="game-html">
          <div
            class="game-swiper"
            :class="fiveType"
            v-if="fiveImages.length > 0"
          >
            <img :src="item" v-for="item in fiveImages" alt="" :key="item" />
          </div>
          <div class="game-dec rich-html" v-html="gameInfo.detail"></div>
        </div>
        <div v-if="tabs.length == 2" v-show="active == 1">
          <gift :game-id="gameInfo.id"></gift>
        </div>
      </div>
      <div class="fixed-warp line-t" v-if="platform.myApp && !isReview">
        <template v-if="platform.ios">
          <div class="btn-start" v-gather="'ios_open_game'" @click="startApp">
            打开
          </div>
        </template>
        <template v-else-if="isOnline">
          <div
            class="btn-start"
            @click="startApp"
            v-gather="installedList ? 'open_game' : 'game_download'"
          >
            {{ installedList ? "启动游戏" : "立即下载" }}
          </div>
        </template>
        <template v-else>
          <div
            class="btn-start try"
            @click="startApp"
            v-gather="'game_download'"
            v-if="gameStatus.appointment_status == statusEmum.can_pre_play"
          >
            {{ installedList ? "启动试玩" : "抢先试玩" }}
          </div>
          <div
            class="btn-start"
            @click="appointment"
            v-gather="'subscribe'"
            v-if="gameStatus.appointment_status == statusEmum.can_appointment"
          >
            预约
          </div>
          <div
            class="btn-start disabled"
            v-if="
              gameStatus.appointment_status == statusEmum.already_appointment
            "
          >
            已预约
          </div>
        </template>
      </div>
      <c-success ref="appointment" :icon="gameInfo.logo" />
    </div>
    <v-empty v-else style="min-height: 90vh" description="啊哦，没找到游戏！" />
  </Skeleton>
</template>
<script>
import gift from "@/components/game/gift";
import cSuccess from "./success";
// import cStart from "./start";h5弹出启动
import { gameDetail, appointment, Download } from "@/api/game";
import { Swipe, SwipeItem, Skeleton, Toast, Image as VanImage } from "vant";
const statusEmum = {
  online: "online", //已上线；
  appointment: "appointment", //预约中
  //用户的预约状态：
  can_appointment: "can_appointment", // -可预约（未预约的时候）；
  already_appointment: "already_appointment", // -已预约（不可以抢先试玩）；
  can_pre_play: "can_pre_play", // -可以抢先试玩；
};
import { platform } from "../../utils/";
import AppAction, { actionMap } from "../../utils/app-action";
import { mapGetters } from "vuex";
export default {
  components: { gift, Swipe, SwipeItem, Skeleton, cSuccess, VanImage },
  data: () => ({
    active: 0,
    platform,
    loading: false,
    empty: false,
    gameInfo: {},
    statusEmum,
    gameWelfare: {},
    installedList: false,
    isReview: false,
  }),

  computed: {
    ...mapGetters(["isLogin"]),
    tabs() {
      return !this.isLogin ? ["详情"] : ["详情", "福利"];
    },
    bannerImages() {
      return this.gameInfo.banner_images
        ? this.gameInfo.banner_images.images
        : [];
    },
    fiveImages() {
      return this.gameInfo.app_store_images
        ? this.gameInfo.app_store_images.images
        : [];
    },
    fiveType() {
      return this.gameInfo.app_store_images
        ? this.gameInfo.app_store_images.type
        : "vertical";
    },
    gameStatus() {
      return this.gameInfo.game_status || {}; //游戏状态
    },
    isOnline() {
      return this.gameStatus.status === statusEmum.online; //是否上线
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.active = this.$route.params.gift ? 1 : 0;
      const _this = this;
      this.loading = true;
      const { success, data } = await gameDetail(this.$route.params.id);
      this.loading = false;
      if (success) {
        const { game_info, game_fuli } = data;
        _this.gameInfo = game_info;
        _this.gameWelfare = game_fuli;
        this.checkAppInstalled();
        AppAction(actionMap.setShare, {
          url: window.location.href,
          title: game_info.name,
          describe: game_info.introduction,
        });
      } else {
        this.empty = true;
      }
    },
    async checkAppInstalled() {
      if (platform.myApp && platform.android) {
        const { success, data } = await AppAction(actionMap.checkAppInstalled, {
          apk: this.gameInfo.game_status.android_package_list, //安卓包名 不知道为什么包里面
          url: this.gameInfo.game_status.android_url,
          id: this.gameInfo.id,
        });
        if (success) {
          this.installedList = data.apk === true;
          this.isReview = data.isReview == 1;
        }
      }
    },
    async startApp() {
      Toast.loading({
        duration: 0,
        forbidClick: false,
      });
      let isDownload = false;
      if (platform.ios) {
        //ios直接启动
        const { data } = AppAction(actionMap.startApp, {
          apk: this.gameInfo.ios_package,
          url: this.gameInfo.ios_url,
          id: this.gameInfo.id,
        });
        isDownload = data;
      } else {
        const { data } = await AppAction(actionMap.startApp, {
          apk: this.gameInfo.game_status.android_package_list, //安卓包名 不知道为什么包里面
          url: this.gameInfo.game_status[
            this.isOnline ? "android_url" : "pre_play_android_url"
          ],
          id: this.gameInfo.id,
          gameStatus: this.gameInfo.game_status,
        });
        isDownload = data;
      }
      Toast.clear();
      if (isDownload) {
        Download(this.gameInfo.id);
        this.gameInfo.download_num++;
      }
    },
    async appointment() {
      Toast.loading({
        duration: 0,
        message: "...",
        mask: true,
        forbidClick: false,
      });
      const { success, data } = await appointment(this.gameInfo.id);
      if (success) {
        AppAction(actionMap.appointmentGame, {
          gameId: this.gameInfo.id,
          isTryPay: !!this.gameStatus.pre_play_android_url,
        });
        this.getData();
        this.gameInfo.game_status.appointment_status = data.appointment_status;
        this.$refs.appointment && this.$refs.appointment.toggle();
      } else {
        this.$Toast({ type: "fail", message: "预约失败,请稍后重试!" });
      }
      Toast.clear();
    },
    getNum(num) {
      return num < 10000 ? num : Number.parseInt(num / 10000) + "W+";
    },
  },
};
</script>
<style lang="less" scoped>
.game {
  min-height: 100vh;
  .safe-bottom(0px);
  &.safe {
    .safe-bottom(110px);
  }
  background-image: @bg-img;
  .img {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: fill;
    width: 100%;
    height: 100%;
    display: block;
  }
  &-banner {
    height: 392px;
  }
  &-top {
    position: relative;
    z-index: 2;
    padding: 32px;
    margin: -74px 32px 0;
    background-color: @bg-match;
    border-radius: 8px;
    &::after {
      border-radius: 8px;
      border-color: @line1;
      overflow: hidden;
    }
    .game-info {
      display: flex;
      .logo {
        display: block;
        border: none;
        outline: none;
        height: 160px;
        width: 160px;
        margin-right: 32px;
        flex-shrink: 0;
        border-radius: 8px;
        overflow: hidden;
      }
      .name {
        font-size: 36px;
        letter-spacing: 0;
        line-height: 44px;

        margin: 12px 0;
        font-weight: bold;
      }
      .style-info {
        font-size: 28px;
        color: @cl-second;
        letter-spacing: 0;
        line-height: 30px;
        margin-top: 16px;
      }
    }
    .appointment {
      margin-top: 32px;
      font-size: 28px;

      line-height: 44px;
    }
    .unplay {
      background-color: @btn-second-bg;
      color: @main;
      border-radius: 8px;
      margin-top: 32px;
      text-align: center;
      line-height: 80px;
      font-size: 24px;
    }
  }
  .tab {
    display: flex;
    line-height: 32px;
    padding: 0 32px 42px;
    margin-top: 37px;
    font-size: 32px;
    letter-spacing: 0;
    &::after {
      border-color: @line1;
    }
    &-item {
      position: relative;
      margin-right: 56px;
      &.active {
        font-size: 36px;

        font-weight: bold;
        &::after {
          content: "";
          position: absolute;
          bottom: -16px;
          height: 6px;
          width: 32px;
          left: 50%;
          transform: translateX(-50%);
          background-image: @btn-main;
          border-radius: 3px;
        }
      }
    }
  }
  &-swiper {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    padding-top: 32px;
    img {
      margin-right: 16px;
      flex-shrink: 0;
      &:last-child {
        margin-right: 0;
      }
    }
    &.horizon {
      img {
        height: 540px;
        width: 264px;
      }
    }
    &.vertical {
      img {
        height: 316px;
        width: 560px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  &-dec {
    letter-spacing: 0;
    padding: 32px 0;
  }
  .game-html {
    padding: 0 32px 0;
  }
  .fixed-warp {
    position: fixed;
    z-index: 99;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    .safe-bottom(16px);
    background-color: @bg-match;
    &::after {
      border-color: @line1;
    }
  }
  .btn-start {
    line-height: 80px;
    margin-top: 16px;
    background-image: @btn-main;
    border-radius: 8px;
    font-size: 36px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    &.disabled {
      filter: grayscale(100%);
    }
    &.try {
      background: #eaf9fb;
      color: @main;
    }
  }
}
</style>
