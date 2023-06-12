<template>
  <div class="luck-warp">
    <div :class="['text', `icon-${luck}1`]"></div>
    <div :class="['luck', `icon-${luck}`]"></div>
    <div :class="['text', `icon-${luck}2`]"></div>
  </div>
</template>
<script>
/* eslint-disable */
/*运势出现概率：大吉10%、吉25%、中吉25%、小吉25%、末吉15%；
      大吉：大吉临门/百事顺遂BEST
      吉：逢吉丁辰/气满志得NORMAL
      中吉：神来气旺/喜上眉梢MIDDLE
      小吉：心旷神怡/春风满面LITTLE
      末吉：风平浪静/否极泰来​TAIL*/
export default {
  props: { luck: { type: [String, Number], default: "" } },
};
</script>
<style lang="less" scoped>
.luck-warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 104px;
}
.luck {
  width: 188px;
  height: 188px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  @icons: BEST, LITTLE, NORMAL, TAIL, MIDDLE;
  each(@icons,{
    &.icon-@{value}{
        .img('signin/@{value}');
        }
    });
  transform: translateY(-47px);
}
.text {
  width: 216px;
  height: 68px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  @icons: BEST1, BEST2, LITTLE1, LITTLE2, NORMAL1, MIDDLE1, MIDDLE2, NORMAL2,
    TAIL1, TAIL2;
  each(@icons,{
    &.icon-@{value}{
        .img('signin/@{value}');
    }
    });
}
</style>
