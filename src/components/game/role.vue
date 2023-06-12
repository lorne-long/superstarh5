<template>
  <div>
    <v-select
      placeholder="请选择大区"
      v-model="formModal.area_id"
      @change="onConfirmServe"
      :columns="server"
      :loading="loading"
    />
    <v-select
      :placeholder="role.length && !loading1 ? '请选择角色' : '暂无角色信息'"
      v-model="formModal.role_id"
      @change="onConfirmRole"
      :columns="role"
      :loading="loading1"
    />
  </div>
</template>
<script>
import vSelect from "@/components/basic/select";
import { GameArea, GameRole } from "@/api/game";
export default {
  components: { vSelect },
  props: ["gameId"],
  data() {
    return {
      role: [],
      server: [],
      loading: false,
      loading1: false,
      formModal: {
        area_id: undefined,
        area_name: undefined,
        role_id: undefined,
        role_name: undefined,
        zone_id: undefined,
      },
    };
  },
  watch: {
    gameId() {
      this.formModal.area_id =
        this.formModal.area_name =
        this.formModal.role_id =
        this.formModal.role_name =
        this.formModal.zone_id =
          undefined;
      this.getServe();
    },
  },
  created() {
    this.getServe();
  },
  methods: {
    async getServe() {
      this.loading = true;
      this.server = [];
      this.role = [];
      const { success, data } = await GameArea(this.gameId);
      this.loading = false;
      if (success) {
        const { area_items = [] } = data || {};
        this.server = area_items.map((item) => ({
          value: item.area_id,
          text: item.area_name,
          origin: item,
        }));
      }
    },
    async getRoles(v) {
      this.role = [];
      if (!v) return;
      this.loading1 = true;
      const { success, data } = await GameRole(this.gameId, v);
      this.loading1 = false;
      if (success) {
        let { roles_items = [] } = data || {};
        // var isDev = window.location.host.indexOf("localhost") > -1;
        // if (isDev) {
        //   roles_items = [  {
        //       role_id: "1",
        //       role_name: "角色名" ,
        //       account_id: "13242",
        //       zone_id: "1",
        //       zone_name: "大区",
        //     },
        //   ];
        // }
        this.role = roles_items.map((item) => ({
          value: item.role_id, //做处理
          text: item.zone_name + "-" + item.role_name,
          origin: item,
        }));
        if (roles_items.length === 1) {
          const { role_id, role_name, zone_id } = roles_items[0];
          this.formModal.role_id = role_id;
          this.formModal.role_name = role_name;
          this.formModal.zone_id = zone_id;
        }
      }
    },
    onConfirmServe({ text, value }) {
      this.formModal.area_name = text;
      this.getRoles(value);
      //取值
    },
    onConfirmRole({ text, origin = {} }) {
      this.formModal.role_name = text;
      this.formModal.zone_id = origin.zone_id;
    },
  },
};
</script>
