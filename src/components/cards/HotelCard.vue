<script setup lang="ts">
import currencyFormatter from '../../utils/currencyFormatter';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weekPrices: {
    type: Object,
    required: true,
  },
  weekendPrices: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="hotel-card">
    <img :src="image" :alt="name" class="hotel-image">
    <div class="hotel-name">{{ name }}</div>
    <div class="hotel-rating">
      <span v-for="star in rating" class="star">&#9733;</span>
    </div>
    <div class="hotel-prices">
      <p class="customer">Rewards</p>
      <div>Rewards Weekday: {{ currencyFormatter(weekPrices.rewards) }}</div>
      <div>Rewards Weekend: {{ currencyFormatter(weekendPrices.rewards) }}</div>
      <p class="customer">Regular</p>
      <div>Regular Weekday: {{ currencyFormatter(weekPrices.regular) }}</div>
      <div>Regular Weekend: {{ currencyFormatter(weekendPrices.regular) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hotel-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  .hotel-image {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }

  .hotel-name {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .hotel-rating {
    margin-bottom: 8px;

    .star {
      color: gold;
    }
  }

  .hotel-prices {
    margin: 8px 0;
    font-size: 0.875rem;
    .customer {
      font-weight: bold;
    }
  }
}
</style>