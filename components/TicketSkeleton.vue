<template>
  <div class="w-full p-5 pt-6 bg-white rounded-[5px] shadow-lg animate-pulse space-y-5 min-h-[194px]">
    <div class="flex justify-between items-center">
      <div class="h-5 w-24 bg-gray-300 shimmer rounded"></div>
      <div class="h-6 w-16 bg-gray-300 shimmer rounded"></div>
    </div>

    <div class="flex justify-between gap-2">
      <div class="space-y-2 w-full">
        <div class="h-3 w-20 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-24 bg-gray-300 shimmer rounded"></div>
      </div>
      <div class="space-y-2 w-full">
        <div class="h-3 w-16 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-20 bg-gray-300 shimmer rounded"></div>
      </div>
      <div class="space-y-2 w-full">
        <div class="h-3 w-24 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-28 bg-gray-300 shimmer rounded"></div>
      </div>
    </div>

    <div class="flex justify-between gap-2">
      <div class="space-y-2 w-full">
        <div class="h-3 w-20 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-24 bg-gray-300 shimmer rounded"></div>
      </div>
      <div class="space-y-2 w-full">
        <div class="h-3 w-16 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-20 bg-gray-300 shimmer rounded"></div>
      </div>
      <div class="space-y-2 w-full">
        <div class="h-3 w-24 bg-gray-300 shimmer rounded"></div>
        <div class="h-4 w-28 bg-gray-300 shimmer rounded"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  height: 100%;
  width: 150%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    left: 100%;
  }
}
</style>
