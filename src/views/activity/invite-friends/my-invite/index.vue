<template>
  <div class="my-invite">
    <div class="invite-warp">
      <v-tab
        :source="tabList"
        :activeStyle="{ color: '#333' }"
        v-model="activeName"
        @change="handChange"
      />
      <div class="line-b two"></div>
      <div
        class="list"
        v-for="(item, key) in list"
        :key="key"
        v-infinite-scroll="getData"
        v-show="activeName == key"
      >
        <v-ranking
          class="list-item"
          v-for="(friend, i) in item.list"
          :key="i"
          :index="i + 1"
          :source="friend"
        />
        <v-empty
          description="啊哦，暂无好友"
          v-show="!item.loading && item.list.length === 0"
        />
      </div>
    </div>
  </div>
</template>
<script>
import vTab from "@/components/basic/tab";
import { FriendList, Exclusive } from "@/api/activity/invitefriends";
import infiniteScroll from "vue-infinite-scroll";
import vRanking from "../components/ranking";
export default {
  components: {
    vTab,
    vRanking,
  },
  directives: {
    infiniteScroll: infiniteScroll,
  },
  data() {
    return {
      activeName: 1,
      tabList: [
        {
          id: 1,
          name: "邀请好友",
        },
        {
          id: 2,
          name: "专属好友",
        },
      ],
      list: {
        1: {
          page: 0,
          page_size: 20,
          list: [],
          fun: FriendList,
          finished: false,
          loading: false,
        },
        2: {
          page: 0,
          page_size: 20,
          list: [],
          fun: Exclusive,
          finished: false,
          loading: false,
        },
      },
    };
  },
  created() {
    this.activeName = this.$route.params.id || 1;
    this.getData();
  },
  activated() {
    this.getData();
  },
  methods: {
    handChange() {
      this.list[this.activeName].page === 0 && this.getData();
    },
    async getData(refresh = false) {
      const item = this.list[this.activeName];
      const { page, page_size, fun, finished } = item;
      if (finished || item.loading) return;
      item.loading = true;
      item.page = refresh ? 1 : item.page + 1;
      const { success, data } = await fun({ page, page_size });
      item.loading = false;
      if (success) {
        refresh && (item.list.lenght = 0);
        item.list.push(...data.list);
        item.finished = item.list.length >= data.total;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-invite {
  display: flex;
  flex-direction: column;
  padding: 208px 40px 0;
  height: 100vh;
  flex-shrink: 0;
  font-size: 28px;
  color: #333;
  background-color: #2c26b9;
  background-image: url(../imgs/mybg.jpg);
  background-repeat: no-repeat;
  .safe-bottom(32px);
  .invite-warp {
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-image: url(../imgs/tmd2.png);
    background-repeat: no-repeat;
    background-position: right 0;
    background-size: contain;
  }
  .list {
    padding: 0 32px;
    overflow: auto;
    flex: 1;
    .list-item {
      background: #f8f8f8;
      padding: 0 32px;
      margin-bottom: 16px;
    }
  }
}
</style>
