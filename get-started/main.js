const eventBus = new Vue();

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false
    },
    details: {
      type: Array,
      required: true,
      default: []
    },
    cart: {
      type: Number,
      required: true,
      default: 0
    }
  },
  template: `
    <div>
      <h1>{{ title }}</h1>
      <img :src="image" alt="" />
      <div
        style="width: 20px; height: 20px;"
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        :style="{background: variant.variantColor}"
        @click="updateProduct(index)"
      ></div>
      <div>Shipping: {{ shipping }}</div>
      <p v-if="inStock">InStock</p>
      <p v-else :class="{'line-through': !inStock}">OutStock</p>
      <ul v-if="details.length">
        <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
      </ul>
      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{disabled: !inStock}"
      >
        Add to Cart
      </button>
      <button
        @click="removeFromCart"
        :disabled="cart <= 0"
        class="button"
        :class="cart > 0 ? 'card' : 'empty'"
      >
        Remove from Cart
      </button>
      <br/>
      <product-tab :reviews="reviews"></product-tab>
    </div>
  `,
  data() {
    return {
      brand: "Sy Dinh",
      product: "Socks",
      selectedVariant: 0,
      variants: [
        {
          variantId: 1,
          variantImage: "https://i.pravatar.cc/200?123",
          variantColor: "Green",
          variantQuantity: 0
        },
        {
          variantId: 2,
          variantImage: "https://i.pravatar.cc/200?234",
          variantColor: "Red",
          variantQuantity: 9
        }
      ],
      reviews: []
    };
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) return "Free";
      return 2.99;
    }
  },
  mounted() {
    eventBus.$on("review-submited", productReview => {
      this.reviews.push(productReview);
    });
  },
  created() {
    console.log("product created");
  },
  mounted() {
    console.log("product mounted");
  },
  updated() {
    console.log("product updated");
  },
  destroyed() {
    console.log("product destroyed");
  }
});

Vue.component("product-tab", {
  props: {
    reviews: {
      type: Array,
      required: true,
      default: []
    }
  },
  template: `
    <div class="tabs">
      <span
        class="tab"
        :class="{'active-tab': slectedTab === tab}"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="switchTab(tab)">
          {{ tab }}
        </span>

        <div v-show="slectedTab === 'Reviews'">
          <div>Reviews</div>
          <p v-if="!reviews.length">There are no reviews yet!</p>
          <ul v-else>
            <li v-for="review in reviews">
              <p>name: {{ review.name }}</p>
              <p>review: {{ review.review }}</p>
              <p>rating: {{ review.rating }}</p>
            </li>
          </ul>
        </div>

        <product-review v-show="slectedTab === 'Make a Review'">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, maiores?
        </product-review>
    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      slectedTab: "Reviews"
    };
  },
  methods: {
    switchTab(tab) {
      this.slectedTab = tab;
    }
  },
  created() {
    console.log("product-tab created");
  },
  mounted() {
    console.log("product-tab mounted");
  },
  updated() {
    console.log("product-tab updated");
  },
  destroyed() {
    console.log("product-tab destroyed");
  }
});

Vue.component("product-review", {
  template: `
    <div>
      <div v-if="errors.length">
        Please, correct these errors!
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <form @submit.prevent="onSubmit" @change="onChange">
        <div>
          <input type="text" v-model.lazy="name" />
        </div>
        <div>
          <textarea v-model="review" />
        </div>
        <div>
            <select v-model.numer="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button type="submit">Review Submit</button>
        <slot></slot>
      </form>
    </div>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onChange(event) {
      console.log("event: ", event);
      if (this.errors.length) {
        this.errors.length = 0;
      }
    },
    onSubmit() {
      if (this.name && this.review && this.rating) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        eventBus.$emit("review-submited", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
      }
    }
  },
  computed: {
    isInvalid() {
      return !this.name || !this.review || !this.rating;
    }
  },
  created() {
    console.log("product-review created");
  },
  mounted() {
    console.log("product-review mounted");
  },
  updated() {
    console.log("product-review updated");
  },
  destroyed() {
    console.log("product-review destroyed");
  }
});

const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    details: ["Color red", "80% Coton", "For girl"],
    cart: []
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      const index = this.cart.indexOf(id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    }
  },
  created() {
    console.log("app created");
  },
  mounted() {
    console.log("app mounted");
  },
  updated() {
    console.log("app updated");
  },
  destroyed() {
    console.log("app destroyed");
  }
});
