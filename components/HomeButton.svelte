<script>
  export let gradient = 'var(--primary-gradient)';
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  class="text-white font-bold p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl flex items-center justify-center"
  style="position: fixed !important; bottom: 1rem !important; right: 1rem !important; z-index: 9999 !important; background: {gradient}; border: 2px solid rgba(255, 255, 255, 0.3); min-width: 3rem; min-height: 3rem; top: auto !important; left: auto !important;"
  title="🏠 Kembali ke Menu Utama"
>
  <div class="text-xl sm:text-2xl">🏠</div>
</button>