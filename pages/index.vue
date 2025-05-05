<script setup lang="ts"></script>

<template>
  <div class="md:flex gap-5 w-full">
    <div class="fixed md:sticky top-0 right-0 left-0 md:top-5 self-start flex-1 z-10">
      <FilterSidebar />
    </div>
    <div class="w-full md:max-w-[502px]">
      <TicketTabs />
      <TicketListSection />
    </div>
  </div>
</template>