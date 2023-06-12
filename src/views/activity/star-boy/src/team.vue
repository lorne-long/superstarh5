<template>
  <div class="container team">
    <template v-if="hasTeam">
      <div class="ttp"></div>
      <div class="list-warp">
        <div
          class="people"
          v-for="(item, i) in params.members"
          :key="item.user_id"
        >
          <div class="bage">{{ item.is_captain == 1 ? "队长" : i + 1 }}</div>
          <div
            class="avatar"
            :class="{
              lead: item.is_captain == 1,
              'my-self': item.user_id == user_id,
            }"
          >
            <van-image fit="scale-down" round :src="getAvatar(item.avatar)" />
          </div>
          <div class="account">{{ item.phone | hide }}</div>
          <div class="status done">{{ chargeStatus[item.charge_status] }}</div>
          <template v-if="isCaptain">
            <div class="status-btn quit" @click="handQuit(item, i)">
              {{ item.user_id == user_id ? "退出" : "踢出" }}
            </div>
          </template>
          <template v-else-if="item.user_id == user_id">
            <div class="status-btn quit" @click="handQuit(item, i)">退出</div>
          </template>
        </div>
        <div
          class="people flex items"
          v-for="item in 5 - params.members.length"
          :key="item"
        >
          <div class="status-btn invite" @click="visible = true">邀请</div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- <img class="question" src="../img/问号.png" alt="" /> -->
      <button
        class="btn"
        v-login
        @click="tripCreateTeam"
        v-gather="'create_team'"
      >
        创建队伍
      </button>
      <button
        class="btn"
        v-login
        @click="visible = true"
        v-gather="'join_team'"
      >
        加入队伍
      </button>
    </template>
    <div class="my-code">
      <div>
        邀请码：{{
          hasTeam ? params.team_invite_code : params.self_invite_code
        }}
      </div>
      <div
        class="copy"
        v-clipboard
        :data-clipboard-text="
          hasTeam ? params.team_invite_code : params.self_invite_code
        "
      >
        复制
      </div>
    </div>
    <Popup v-model="visible" round>
      <div class="popup-warp">
        <div class="close" @click="visible = false">
          <svg-icon name="close"></svg-icon>
        </div>
        <div class="title">{{ hasTeam ? "邀请" : "" }}加入队伍</div>
        <input
          type="text"
          v-model="code"
          maxlength="20"
          placeholder="输入对方邀请码"
        />
        <v-button :disabled="!code" @click="handJoinTeam">确定</v-button>
      </div>
    </Popup>
    <Popup v-model="outShow" round>
      <div class="popup-warp">
        <div class="close" @click="outShow = false">
          <svg-icon name="close"></svg-icon>
        </div>
        <div class="title">
          {{
            isCaptain && quitUser.user_id != user_id ? "踢出玩家" : "退出队伍"
          }}
        </div>
        <div class="confirm-txt">
          {{
            isCaptain && quitUser.user_id != user_id
              ? "确认踢出该同行小伙伴吗？"
              : "您确认退出队伍吗？"
          }}
        </div>
        <div
          class="flex items"
          v-show="isCaptain && quitUser.user_id != user_id"
        >
          <van-image
            class="avatar"
            fit="scale-down"
            round
            :src="getAvatar(quitUser.avatar)"
          />
          <span>{{ quitUser.phone | hide }}</span>
        </div>
        <v-button @click="quitTeam()">确定</v-button>
      </div>
    </Popup>
  </div>
</template>
<script>
import {
  tripCreateTeam,
  tripJoinTeam,
  tripInviteJoinTeam,
  tripOutTeam,
} from "@/api/activity/";
import { Popup } from "vant";
import { mapState, mapGetters } from "vuex";
export default {
  components: { Popup },
  props: {
    params: { type: Object, default: () => ({}) },
  },
  inject: ["refresh"],
  data() {
    return {
      visible: false,
      outShow: false,
      active: undefined,
      code: undefined,
      chargeStatus: {
        0: "未完成充能",
        1: "已完成充能",
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["getAvatar"]),
    user_id() {
      return this.userInfo ? this.userInfo.user_id : undefined;
    },
    isCaptain() {
      //当前登录人是否队长
      const cap = this.params.members.find(
        (item) => item.user_id == this.user_id
      );
      return cap && cap.is_captain == 1;
    },
    hasTeam() {
      return this.params.members && this.params.members.length > 0;
    },
    quitUser() {
      return this.active != undefined ? this.params.members[this.active] : {};
    },
  },
  methods: {
    async handJoinTeam() {
      const tosat = this.$Toast.loading({ duation: 0, mask: true });
      const fun = this.hasTeam ? tripInviteJoinTeam : tripJoinTeam;
      const { success, msg } = await fun({
        id: this.params.id,
        invite_code: this.code,
      });
      tosat.clear();
      if (success) {
        this.visible = false;
        this.code = undefined;
        this.$Toast.success(this.hasTeam ? "邀请加入成功" : "成功加入队伍");
        this.refresh();
      } else {
        this.$Toast.fail(msg);
      }
    },
    async tripCreateTeam() {
      const tosat = this.$Toast.loading({ duation: 0, mask: true });
      const { success, msg } = await tripCreateTeam(this.params.id);
      tosat.clear();
      if (success) {
        this.$Toast.success("队伍创建成功");
        this.$emit("change");
      } else {
        this.refresh();
        this.$Toast.fail(msg);
      }
    },
    handQuit(__item, i) {
      this.active = i;
      this.outShow = true;
    },
    async quitTeam() {
      const i = this.active;
      const item = this.params.members[i];
      const tosat = this.$Toast.loading({ duation: 0 });
      const { success, msg } = await tripOutTeam({
        id: this.params.id,
        user_id: item.user_id,
      });
      tosat.clear();
      if (success) {
        this.$Toast.success(
          this.isCaptain && this.quitUser.user_id != this.user_id
            ? "成功踢出小伙伴!"
            : "你已成功退出队伍!"
        );
        this.active = undefined;
        this.outShow = false;
        this.params.members.splice(i, 1);
        this.$emit("change");
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../index.less";
.team {
  &::after {
    background-image: url(../img/txt1.png);
  }
  .list-warp {
    padding: 0 16px 0 32px;
    display: flex;
    overflow: auto;
  }
  .status {
    color: #52bdff;
    font-size: 24px;
    &.done {
      color: #f070ff;
    }
  }
  .account {
    text-align: center;
    font-weight: 500;
    margin: 4px 0;
  }
  .people {
    position: relative;
    text-align: center;
    margin-right: 16px;
    padding: 0 16px;
    width: 190px;
    height: 318px;
    flex-shrink: 0;
    line-height: 30px;
    background: #3500aa;
    border-radius: 8px;
    color: #e6d9fd;
    overflow: hidden;
    .bage {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 32px;
      padding: 0 30px 0 15px;
      height: 32px;
      font-size: 24px;
      border-radius: 0 0 32px 0;
      color: #fff;
      background-image: linear-gradient(270deg, #ff36ff 11%, #ff8f68 100%);
      font-weight: 700;
    }
    .avatar {
      position: relative;
      display: inline-block;
      width: 114px;
      height: 114px;
      margin-top: 36px;
      margin-bottom: 10px;
      padding: 11px;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../img/队员头像.png) no-repeat;
        background-size: 100% 100%;
      }
      &.my-self::after {
        background-image: url(../img/我头像.png);
      }
      &.lead::after {
        background-image: url(../img/队长头像.png);
      }
    }
  }
  .status-btn {
    height: 64px;
    line-height: 64px;
    margin-top: 10px;
    background-image: linear-gradient(90deg, #7b2af3 0%, #3842d3 100%);
    border-radius: 32px;
    color: #fff;
    width: 100%;
    &.quit {
      background-image: linear-gradient(90deg, #ff36ff 0%, #ff8f68 100%);
    }
    &.invite {
      background-image: linear-gradient(90deg, #7b2af3 0%, #3842d3 100%);
    }
  }
  .my-code {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e6d9fd;
    line-height: 104px;
    font-weight: 500;
    .copy {
      width: 96px;
      height: 40px;
      line-height: 42px;
      background-image: linear-gradient(90deg, #7b2af3 0%, #3842d3 100%);
      border-radius: 20px;
      text-align: center;
      color: #fff;
    }
  }
  .btn {
    line-height: 64px;
    border-radius: 32px;
    text-align: center;
    margin: 32px auto;
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(90deg, #7b2af3, #3842d3);
    width: 400px;
    &:last-child {
      margin-bottom: 80px;
    }
  }
  .question {
    position: absolute;
    right: 16px;
    top: 32px;
    width: 40px;
  }
  .popup-warp {
    padding-top: 80px;
    user-select: text !important;
    input {
      height: 80px;
      background-color: #f5f5f5;
      margin: 40px 0;
      border-radius: 8px;
      padding: 0 32px;
      text-align: center;
      text-transform: uppercase;
      color: #333;
      &::placeholder {
        color: #999;
      }
    }
    .avatar {
      height: 88px;
      width: 88px;
      margin-right: 16px;
    }
    .confirm-txt,
    .flex {
      margin: 32px 0;
    }
  }
}
</style>
