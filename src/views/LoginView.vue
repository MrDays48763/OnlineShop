<template>
  <section class="vh-100" style="background-color: #508bfc">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <form @submit.prevent="loginCheck">
                <h3 class="mb-5">Sign in</h3>
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    id="typeName"
                    class="form-control"
                    placeholder="Name"
                    v-model="Username"
                  />
                  <label class="form-label" for="typeName">Name</label>
                </div>
                <div class="form-floating mb-4">
                  <input
                    type="password"
                    id="typePassword"
                    class="form-control"
                    placeholder="User ID"
                    v-model="UserID"
                  />
                  <label class="form-label" for="typePassword">User ID</label>
                </div>

                <!-- Checkbox -->
                <!-- <div class="form-check d-flex justify-content-start mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                />
                <label class="form-check-label" for="form1Example3">
                  Remember password
                </label>
              </div> -->
                <div class="d-grid gap-2">
                  <button class="btn btn-primary btn-lg" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      UserID: "",
      Username: "",
      check: {},
    };
  },
  methods: {
    loginCheck() {
      const promi = axios.get("http://localhost/identity.php", {
        params: { id: this.UserID, username: this.Username },
      });
      promi
        .then((response) => {
          this.check = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
      if (this.check !== {} && this.check !== null) {
        this.eventBus.emit("userdata", this.Username);
        this.$router.push("/home");
      }
    },
  },
};
</script>
