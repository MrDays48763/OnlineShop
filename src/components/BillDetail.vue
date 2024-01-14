<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">帳單</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <!-- <th scope="col">編號</th> -->
                <th scope="col">名稱</th>
                <th scope="col">數量</th>
                <th scope="col">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in billData" :key="product.id">
                <!-- <th scope="row">{{ product.id }}</th> -->
                <td scope="row">{{ product.name }}</td>
                <td>{{ product.amount }}</td>
                <td>{{ product.totalPrice }}</td>
              </tr>
              <tr>
                <th scope="row">共</th>
                <td :class="totalDisplay">{{ Total }}元</td>
                <td>{{ newPrice }}</td>
              </tr>
            </tbody>
          </table>
          <div class="form-check form-check-reverse">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="checked"
              :disabled="coupon"
              @click="chagneDisplay"
            />
            <label class="form-check-label" for="flexCheckDefault">
              使用折價券
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="sendBill"
          >
            確認購買
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    billData: Object,
  },
  data() {
    return {
      checked: false,
      coupon: false,
      totalDisplay: "",
      orderID: 0,
    };
  },
  methods: {
    sendBill() {
      if (this.billData) {
        this.billData.forEach((item) => {
          var params = new URLSearchParams();
          params.append("id", this.orderID);
          params.append("product_id", item.id);
          params.append("user_id", 3);
          params.append("amount", item.amount);
          // params.append("")
          axios
            .post(
              "http://localhost/orderInsert.php",
              params
              // {
              //   id: 5,
              //   product_id: item.id,
              //   user_id: 2,
              //   amount: item.amount,
              // }
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
        });
      }
    },
    getOrderID() {
      const promi = axios.get("http://localhost/orderIdGet.php");
      promi
        .then((response) => {
          this.orderID = Number(response.data.id) + 1;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    chagneDisplay() {
      if (this.checked) {
        this.totalDisplay = "";
      } else {
        this.totalDisplay = "text-decoration-line-through";
      }
    },
  },
  computed: {
    Total() {
      var total = 0;
      if (this.billData) {
        this.billData.forEach((item) => {
          total += item.price;
        });
      }
      return total;
    },
    newPrice() {
      if (this.checked) {
        return this.Total * 0.8 + "元";
      } else return "";
    },
  },
  created() {
    this.getOrderID();
  },
};
</script>
