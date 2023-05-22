<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import useHotelStore from './store/HotelStore';
import formatDate from './utils/dateFormatter';
import HotelCard from './components/cards/HotelCard.vue';
import TheSwitch from './components/inputs/TheSwitch.vue';
import TheCalendar from './components/inputs/TheCalendar.vue';
import SelectedHotelCard from './components/cards/SelectedHotelCard.vue';

const hotelStore = useHotelStore();

const isRewards = ref(false);
const isWeekDay = ref(false);
const fromDate = ref<string | null>(null);
const toDate = ref<string | null>(null);
const selectedHotel = ref({
  name: '',
  image: '',
  rating: 0,
  price: 0
})

const fromDateFormatted = computed(() => {
  return fromDate.value !== null ? formatDate(fromDate.value) : 'Escoge una fecha';  
});
const toDateFormatted = computed(() => {
  return toDate.value !== null ? formatDate(toDate.value) : 'Escoge una fecha';
});
const datesSelected = computed(() => {
  return fromDate.value && toDate.value
})

function toggle(value: boolean): void {
  isRewards.value = value
}

function isWeekday(value: boolean): void {
  isWeekDay.value = value
}

function close() {
  fromDate.value = null;
  toDate.value = null;
  selectedHotel.value.name = '';
  selectedHotel.value.image = '';
  selectedHotel.value.rating = 0;
  selectedHotel.value.price = 0;
}

function getLowestPriceHotel(isWeekday: boolean, isRewards: boolean) {
  let lowestPrice = Infinity;
  let lowestPriceHotel = null;

  for (const hotel of hotelStore.hotels) {
    const prices = isWeekday ? hotel.weekPrices : hotel.weekendPrices;
    const price = isRewards ? prices.rewards : prices.regular;

    if (price < lowestPrice) {
      lowestPrice = price;
      lowestPriceHotel = hotel;
    }
  }

  if (lowestPriceHotel) {
    selectedHotel.value.image = lowestPriceHotel.image;
    selectedHotel.value.name = lowestPriceHotel.name;
    selectedHotel.value.price = lowestPrice;
    selectedHotel.value.rating = lowestPriceHotel.rating;
  }
}

watch(
  () => datesSelected.value,
  (newValue) => {
    if (newValue) {
      getLowestPriceHotel(isWeekDay.value, isRewards.value)
    }
  },
  { flush: 'post' }
);
</script>

<template>
  <div class="main-container">
    <h1 class="title">Welcome to the Super Hotels of the Death</h1>
    <p class="rewards-question">
      Are you reward?
    </p>
    <div class="rewards-container">
      <TheSwitch @toggle="toggle"/>
      <p
        v-if="isRewards"
        class="rewards-user">
        Congratulations! You are Reward :)
      </p>
    </div>
    <div class="calendar-container">
      <div class="calendar">
        <TheCalendar
          v-model:from="fromDate"
          v-model:to="toDate"
          v-model:isWeekday="isWeekday" />
      </div>
      <div class="selected-dates">
        <p>Desde: {{ fromDateFormatted }}</p>
        <p>Hasta: {{ toDateFormatted }}</p>
      </div>
    </div>
    <div
      v-if="datesSelected"
      class="suggested-hotel-container">
      <SelectedHotelCard
        :name="selectedHotel.name"
        :rating="selectedHotel.rating"
        :price="selectedHotel.price"
        :image="selectedHotel.image"
        @close="close" />
    </div>
    <div class="hotel-list">
      <div
        v-for="(hotel, index) in hotelStore.hotels"
        :key="index"
        class="hotel-item">
        <HotelCard
          :image="hotel.image"
          :name="hotel.name"
          :rating="hotel.rating"
          :weekPrices="hotel.weekPrices"
          :weekendPrices="hotel.weekendPrices"
          :isRewards="isRewards" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  .hotel-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
  }
  
  .hotel-item {
    border: 1px solid #ebebeb;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .rewards-question {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
  }
  .rewards-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0;
    .rewards-user {
      font-size: 1.125rem;
      margin: 0;
    }
  }

  .suggested-hotel-container {
    margin: 24px 0;
  }

  .calendar-container {
    .calendar {
      margin-bottom: 16px;
    }

    .selected-dates {
      display: flex;
      justify-content: center;
    }

    .selected-dates p {
      margin-right: 16px;
    }
  }
  
  @media (max-width: 767px) {
    .hotel-list {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
}
</style>
