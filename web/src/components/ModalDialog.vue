<template>
  <dialog :id="id" class="modal" ref="dialogRef">
    <div class="modal-box max-w-3xl">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action">
        <slot name="footer"></slot>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  id: { type: String, required: true },
  title: { type: String, default: '' }
})

const dialogRef = ref(null)

function show() {
  dialogRef.value?.showModal()
}

function hide() {
  dialogRef.value?.close()
}

defineExpose({ show, hide })
</script>
