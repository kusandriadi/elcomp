<script>
  import SpeakerIcon from './SpeakerIcon.svelte';
  
  export let text = '';
  export let onClick = () => {};
  export let className = 'absolute bottom-3 right-3 bg-green-500 text-white w-14 h-14 rounded-full hover:bg-green-600 transition shadow-md flex items-center justify-center transform hover:scale-110';
</script>

<button 
  on:click={() => onClick(text)} 
  class={className}
  title="Putar suara"
>
  <SpeakerIcon />
</button>