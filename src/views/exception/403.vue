<template>
  <exception-page home-route="/Home" style="min-height: 100vh" type="403" />
</template>

<script>
import ExceptionPage from "@/components/exception/ExceptionPage";
export default {
  name: "Exp403",
  components: { ExceptionPage },
};
</script>
