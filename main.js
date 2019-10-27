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
      <div>Shipping: {{shipping}}</div>
      <p v-if="inStock">InStock</p>
      <p v-else :class="{'line-through': !inStock}">OutStock</p>
      <ul v-if="details.length">
        <li v-for="detail in details">{{ detail }}</li>
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
      <div>Reviews</div>
      <p v-if="!reviews.length">There are no reviews yet!</p>
      <ul v-else>
        <li v-for="review in reviews">
          <p>name: {{ review.name }}</p>
          <p>review: {{ review.review }}</p>
          <p>rating: {{ review.rating }}</p>
        </li>
      </ul>
      <product-review @review-submited="addReview"></product-review>
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
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
  }
});

Vue.component("product-review", {
  template: `
    <div>
      <div v-if="errors.length">
        Please, correct these errors!
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>
      <form @submit.prevent="onSubmit" @change="onChange">
        <div>
          <input type="text" v-model="name" />
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
    onChange() {
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
        this.$emit("review-submited", productReview);
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
  }
});
