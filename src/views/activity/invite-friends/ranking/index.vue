<template>
  <div class="invite-ranking">
    <div
      class="ranking"
      v-for="(item, i) in list.slice(0, 3)"
      :key="i"
      :class="{
        'ranking-one': i == 0,
        'ranking-two': i == 1,
        'ranking-three': i == 2,
      }"
    >
      <div class="avatar">
        <van-image
          width="100%"
          height="100%"
          round
          :src="getAvatar(item.avatar)"
        />
      </div>
      <div>{{ item.nickname | hide }}</div>
      <div class="flex items just">
        <span>{{ item.coin }}</span>
        <span class="coin small"></span>
      </div>
    </div>
    <div class="invite-warp">
      <v-ranking
        class="line-b"
        v-for="(item, i) in list.slice(3)"
        :key="i"
        :source="item"
        :index="i + 4"
      />
    </div>
    <div class="my-ranking">
      <span>当前你在：{{ my.index > 999 ? "999+" : my.index }}</span>
      <span class="flex items"
        ><span>{{ my.coin || 0 }} </span> <i class="coin small"></i
      ></span>
    </div>
  </div>
</template>
<script>
import vRanking from "../components/ranking";
import { RankList } from "@/api/activity/invitefriends";
import { mapGetters } from "vuex";
export default {
  components: {
    vRanking,
  },
  data() {
    return {
      list: [],
      my: {},
    };
  },
  activated() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getAvatar"]),
  },
  methods: {
    async getData() {
      this.$Toast.loading({ duration: 0, mask: true });
      const { success, data, msg } = await RankList();
      this.$Toast.clear();
      if (success) {
        this.list = data.rank_list;
        this.my = { index: data.rank_list_my_index, coin: data.my_total_coin };
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../coin.less";
.invite-ranking {
  position: relative;
  background-image: url(../imgs/ranking.jpg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100%;
  font-size: 28px;
  color: #333;
  background-color: #2c26b9;
  padding-top: 1px;
  .ranking {
    line-height: 45px;
    font-size: 32px;
    color: white;
    text-align: center;
    .avatar {
      margin-bottom: 24px;
    }
    .coin {
      margin-left: 8px;
    }
  }
  .my-ranking {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    line-height: 108px;
    padding: 0 42px;
    background: #ffffff;
    box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.1);
    .coin {
      margin-left: 8px;
    }
  }
  .line-b::after {
    border-bottom-color: #eee;
  }
  .invite-warp {
    background-color: #ffffff;
    margin-top: 931px;
    padding: 0 40px;
    .safe-bottom(100px);
  }
  .ranking-one {
    position: absolute;
    left: 50%;
    top: 185px;
    transform: translateX(-50%);
    .avatar {
      position: relative;
      padding-top: 72px;
      width: 192px;
      height: 258px;
      .aff(url(../imgs/avatar1.png));
    }
  }
  .aff(@url) {
    &::after {
      content: "";
      background-image: @url;
      background-size: 100% 100%;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
  }
  .ranking-two,
  .ranking-three {
    position: absolute;
    left: 80px;
    top: 369px;
    .avatar {
      position: relative;
      width: 136px;
      height: 183px;
      padding-top: 52px;
      .aff(url(../imgs/avatar2.png));
    }
  }
  .ranking-three {
    left: initial;
    right: 80px;
    .avatar {
      .aff(url(../imgs/avatar3.png));
    }
  }
}
</style>
