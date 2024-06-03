<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 class="text-4xl font-bold mb-6">Colour Generator</h1>
    <form @submit.prevent="generateColours" class="mb-6 flex space-x-4">
      <input
          type="number"
          v-model="numColours"
          min="1"
          placeholder="Enter number of colours"
          class="p-2 border border-gray-300 rounded"
      />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Generate Colours</button>
    </form>
    <div v-if="colours.length" class="w-full max-w-3xl">
      <h2 class="text-2xl font-semibold mb-4">Generated Colours</h2>
      <div class="flex flex-wrap">
        <div
            v-for="colour in colours"
            :key="colour"
            :style="{ backgroundColor: colour }"
            class="min-w-20 min-h-20 flex items-center justify-center text-white font-bold m-2 rounded cursor-pointer relative"
            @click="copyToClipboard(colour)"
        >
          {{ colour }}
          <span v-if="tooltipVisible && tooltipText === colour" class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1">
            Copied!
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const numColours = ref(0);
const colours = ref([]);
const tooltipVisible = ref(false);
const tooltipText = ref('');

const generateColours = () => {
  colours.value = generateRainbowColours(numColours.value);
};

const generateRainbowColours = (num) => {
  const generatedColours = [];
  for (let i = 0; i < num; i++) {
    const hue = i / num;
    generatedColours.push(hslToHex(hue, 1, 0.5));
  }
  return generatedColours;
};

const hslToHex = (h, s, l) => {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showTooltip(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const showTooltip = (text) => {
  tooltipText.value = text;
  tooltipVisible.value = true;
  setTimeout(() => {
    tooltipVisible.value = false;
  }, 1000);
};
</script>
