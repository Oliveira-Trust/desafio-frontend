<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  totalRecords: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-between mt-6">
    <div class="text-gray-600">
      {{ totalRecords }} registro(s)
    </div>
    <div class="flex items-center space-x-2">
      <button 
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button
        v-for="page in [1, 2, 3]"
        :key="page"
        @click="handlePageChange(page)"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-lg',
          page === currentPage 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:text-gray-900'
        ]"
      >
        {{ page }}
      </button>
      
      <button 
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
