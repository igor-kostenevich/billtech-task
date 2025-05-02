<script setup lang="ts"></script>

<template>
  <div class="flex gap-5 w-full">
    <div class="sticky top-5 self-start flex-1">
      <FilterSidebar />
    </div>
    <div class="w-full max-w-[502px]">
      <TicketTabs />
      <TicketListSection />
    </div>
  </div>
</template>