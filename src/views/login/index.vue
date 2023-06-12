<template>
  <div class="login">
    <template v-if="!showLogin">
      <div class="center"><van-loading color="#1989fa" />login</div>
    </template>
    <template v-else>
      <div class="input hairline-surround">
        <input
          type="text"
          maxlength="11"
          v-model="formData.phone_number"
          placeholder="手机号"
        />
      </div>
      <div class="input hairline-surround">
        <input
          type="text"
          maxlength="8"
          v-model="formData.code"
          placeholder="验证码"
        />
        <span class="after" @click="sendCaptcha">{{ btnTxt }}</span>
      </div>
      <v-button block @click="handSubmit">登录</v-button>
    </template>
  </div>
</template>
<script>
import { setAuthorization } from "@/utils/auth/";
import Cookies from "js-cookie";
import { login, sendCaptcha } from "@/api/";
import AppAction, { actionMap } from "@/utils/app-action";
const _key = "isGetCode";
const _timerNum = 60;
// import { platform } from "../utils/index";
export default {
  data() {
    return {
      showLogin: false,
      formData: {
        login_type: "CODE",
        phone_number: undefined,
        code: undefined,
      },
      btnTxt: "获取验证码",
    };
  },
  activated() {
    if (this.$store.getters.isLogin) {
      return this.afterLogin();
    } else {
      this.login();
    }
  },
  methods: {
    timerFun() {
      var _this = this;
      var locTime = Cookies.get(_key) || 0;
      var timer = Math.ceil(_timerNum - (Date.now() - locTime) / 1000);
      if (!locTime || timer <= 0) {
        _this.btnTxt = "获取验证码";
        Cookies.remove(_key);
      } else {
        _this.btnTxt = `重新发送(${timer})`;
        setTimeout(() => _this.timerFun(), 1000);
      }
    },
    async sendCaptcha() {
      if (!/^1[03456789]\d{9}$/.test(this.formData.phone_number)) {
        return this.$Toast("手机号格式不正确");
      }
      this.$Toast.loading({ duration: 0 });
      const { success, msg } = await sendCaptcha({
        phone_number: this.formData.phone_number,
      });
      this.$Toast.clear();
      if (success) {
        Cookies.set(_key, Date.now()) && this.timerFun();
      } else {
        this.$Toast.fail(msg);
      }
    },
    async handSubmit() {
      if (!/^1[03456789]\d{9}$/.test(this.formData.phone_number)) {
        return this.$Toast("手机号格式不正确");
      } else if (!this.formData.code) {
        return this.$Toast("输入验证码");
      }
      this.$Toast.loading({ duration: 0 });
      const { success, msg, data } = await login(this.formData);
      this.$Toast.clear();
      if (success) {
        setAuthorization({ token: data.jwt_token });
        this.afterLogin();
      } else {
        this.$Toast.fail(msg);
      }
    },
    async login() {
      try {
        const { success, msg } = await this.$store.dispatch("login");
        if (success) {
          this.afterLogin();
        } else {
          this.$Toast.clear();
          this.appLogin(msg);
        }
      } catch (err) {
        this.appLogin(err.message);
      }
    },
    async appLogin(msg) {
      try {
        // 调用app login
        const { success } = await AppAction(actionMap.toLogin);
        if (success) {
          this.afterLogin();
        } else {
          //出错使用本地login
          this.showLogin = true;
          this.timerFun();
          // this.$Dialog({ message: msg });
        }
      } catch (e) {
        this.showLogin = true;
        this.timerFun();
      }
    },
    afterLogin() {
      this.$router.replace({
        path: decodeURIComponent(this.$route.query.form || "/404"),
      });
    },
  },
};
</script>
<style lang="less">
.login {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  .input {
    width: 100%;
    height: 80px;
    position: relative;
    margin-bottom: 32px;
    border-radius: 12px;
    // overflow: hidden;
    background-color: @bg-match;
    &::after {
      border-radius: 12px;
    }
    input {
      padding: 0 1em;
      outline: none;
      border: none;
      display: block;
      width: 100%;
      height: 80px;
      color: @body;
      border-radius: 12px;
      background-color: transparent;
    }
    .after {
      color: @main;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }
  }

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
