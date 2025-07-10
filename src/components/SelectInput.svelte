<script>
  import { onMount } from 'svelte';
  
  let currentValue = '';
  let currentError = '';
  let isFocused = false;
  
  const countries = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' }
  ];

  let formData, formErrors, updateFormData, updateFormError;

  onMount(async () => {
    // Import signals dynamically
    const signals = await import('../signals/formSignals');
    formData = signals.formData;
    formErrors = signals.formErrors;
    updateFormData = signals.updateFormData;
    updateFormError = signals.updateFormError;

    // Subscribe to signals
    const unsubscribeData = formData.subscribe((data) => {
      currentValue = data.country;
    });

    const unsubscribeErrors = formErrors.subscribe((errors) => {
      currentError = errors.country;
    });

    // Cleanup
    return () => {
      unsubscribeData();
      unsubscribeErrors();
    };
  });

  function validateSelect(value) {
    if (!value) {
      updateFormError('country', 'Please select a country');
      return;
    }
    updateFormError('country', '');
  }

  function handleChange(event) {
    const value = event.target.value;
    updateFormData('country', value);
    validateSelect(value);
  }

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
    validateSelect(currentValue);
  }
</script>

<div class="micro-frontend-container">
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-orange-100 rounded-lg">
        <svg class="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-semibold text-gray-800">Select Input Micro Frontend</h3>
        <p class="text-sm text-gray-500">Svelte Component</p>
      </div>
    </div>
    
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Country
      </label>
      <div class="relative">
        <select
          bind:value={currentValue}
          on:change={handleChange}
          on:focus={handleFocus}
          on:blur={handleBlur}
          class="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none appearance-none bg-white {currentError
            ? 'border-red-300 focus:border-red-500'
            : isFocused
            ? 'border-orange-500 focus:border-orange-600'
            : 'border-gray-300 focus:border-orange-500'}"
        >
          {#each countries as country}
            <option value={country.value}>{country.label}</option>
          {/each}
        </select>
        <div class="absolute right-3 top-3 pointer-events-none">
          {#if currentError}
            <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          {:else}
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          {/if}
        </div>
      </div>
      {#if currentError}
        <p class="text-sm text-red-600 flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {currentError}
        </p>
      {/if}
    </div>
  </div>
</div>

<style>
  .micro-frontend-container {
    @apply w-full;
  }
</style>