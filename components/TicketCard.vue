<script setup lang="ts">
  import type { Ticket } from '@/types/Interfaces'
  const props = defineProps<{ ticket: Ticket }>()

  const { formatTimeRange, formatDuration, formatStops, formatPrice } = useHelpers()

  const [segmentTo, segmentBack] = props.ticket.segments
  const [stopsToLabel, stopsToCities] = formatStops(segmentTo.stops)
  const [stopsBackLabel, stopsBackCities] = formatStops(segmentBack.stops)

  const carrierLogoUrl = `https://pics.avs.io/99/36/${props.ticket.carrier}.png`
</script>

<template>
  <div class="w-full p-5 pt-6 bg-white rounded-[5px] shadow-lg">
    <div class="flex justify-between mb-5 items-center">
      <span class="text-primary text-2xl leading-6 font-semibold">
        {{ formatPrice(ticket.price) }}
      </span>
      <img :src="carrierLogoUrl" :alt="ticket.carrier" />
    </div>

    <div class="grid grid-cols-3 justify-between gap-5 mb-2.5">
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          {{ segmentTo.origin }} – {{ segmentTo.destination }}
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ formatTimeRange(segmentTo.date, segmentTo.duration) }}
        </span>
      </div>
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          Тривалість
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ formatDuration(segmentTo.duration) }}
        </span>
      </div>
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          {{ stopsToLabel }}
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ stopsToCities }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-3 justify-between gap-5">
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          {{ segmentBack.origin }} – {{ segmentBack.destination }}
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ formatTimeRange(segmentBack.date, segmentBack.duration) }}
        </span>
      </div>
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          Тривалість
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ formatDuration(segmentBack.duration) }}
        </span>
      </div>
      <div>
        <p class="text-xs text-secondary-additional uppercase leading-[18px] tracking-wider font-semibold">
          {{ stopsBackLabel }}
        </p>
        <span class="text-sm leading-[21px] font-semibold">
          {{ stopsBackCities }}
        </span>
      </div>
    </div>
  </div>
</template>
