<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary bg-primary"
    data-bs-theme="dark"
  >
    <div class="container">
      <router-link class="navbar-brand" to="/home">Online Shop</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/back">Back Stage</router-link>
          </li>
        </ul>
        <span class="navbar-text">{{ Username }}</span>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      Username: "",
    };
  },
  mounted() {
    this.eventBus.on("userdata", (data) => {
      this.Username = data;
    });
  },
  beforeUnmount() {
    this.eventBus.off("userdata");
  },
};
</script>
