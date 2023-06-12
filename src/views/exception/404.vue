<template>
  <exception-page home-route="/Home" style="min-height: 100vh" type="404" />
</template>

<script>
import ExceptionPage from "@/components/exception/ExceptionPage";

export default {
  name: "Exp404",
  components: { ExceptionPage },
};
</script>
