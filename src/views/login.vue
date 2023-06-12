<template>
  <van-overlay
    :zIndex="999"
    :show="showLogin"
    @click="$store.commit('SET_LOGIN', !1)"
    :custom-style="{
      backgroundColor: 'rgba(0,0,0,0.5)',
    }"
  >
    <div class="login" @click.stop>
      <div class="content">
        <span class="close" @click="$store.commit('SET_LOGIN', !1)">
          <svg-icon name="close" dir="right" />
        </span>

        <div class="title">注册/登录辰星俱乐部APP</div>
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
        <div class="footer">
          <input id="argree" v-model="protocol" type="checkbox" />
          <div>
            已阅读并同意<a
              target="_blank"
              href="http://agreement.hzmobi.com/sup/service.html"
              >《服务协议》</a
            >和<a
              target="_blank"
              href="http://agreement.hzmobi.com/sup/privacy.html"
              >《隐私政策》</a
            >
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import "icons/close.svg";
import { setAuthorization } from "@/utils/auth/";
import Cookies from "js-cookie";
import { login, sendCaptcha } from "@/api/";
import { Overlay } from "vant";
import { mapState } from "vuex";
const _key = "isGetCode";
const _timerNum = 60;
export default {
  components: { [Overlay.name]: Overlay },
  name: "login",
  data() {
    return {
      formData: {
        login_type: "CODE",
        phone_number: undefined,
        code: undefined,
      },
      protocol: false,
      btnTxt: "获取验证码",
    };
  },
  computed: {
    ...mapState(["showLogin"]),
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
      } else if (!this.protocol) {
        return this.$Toast("请先同意协议");
      }
      this.$Toast.loading({ duration: 0 });
      const { success, msg, data } = await login(this.formData);
      this.$Toast.clear();
      if (success) {
        setAuthorization({ token: data.jwt_token });
        window.location.reload();
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less">
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  .content {
    position: relative;
    background-color: #fff;
    width: 580px;
    padding: 0 32px;
    border-radius: 12px;
    background: var(--bg-img, linear-gradient(87deg, #fff6f6, #fbfefa));
  }
  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 40px;
    color: #ccc;
  }
  .title {
    padding-top: 50px;
    padding-bottom: 50px;
    color: #333;
    font-size: 36px;
    font-weight: bold;
  }
  .footer {
    margin-top: 50px;
    padding-bottom: 32px;
    display: flex;
    text-align: left;
    align-items: center;
    input {
      width: 36px;
      height: 36px;
      margin-right: 5px;
    }
    div {
      font-size: 24px;
    }
  }
  .input {
    width: 100%;
    height: 80px;
    position: relative;
    margin-bottom: 32px;
    border-radius: 40px;
    // overflow: hidden;
    background-color: transparent;
    &::after {
      border-radius: 80px;
    }
    input[type="text"] {
      padding: 0 40px;
      outline: none;
      border: none;
      display: block;
      width: 100%;
      height: 80px;
      color: @body;
      border-radius: 40px;
      background-color: transparent;
    }
    .after {
      color: @main;
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%);
    }
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  a {
    color: #963011;
  }
}
</style>
