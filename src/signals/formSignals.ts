import { signal, computed } from '@preact/signals-react';

export interface FormData {
  name: string;
  email: string;
  country: string;
  message: string;
}

export interface FormErrors {
  name: string;
  email: string;
  country: string;
  message: string;
}

// Form data signals
export const formData = signal<FormData>({
  name: '',
  email: '',
  country: '',
  message: ''
});

// Form errors signals
export const formErrors = signal<FormErrors>({
  name: '',
  email: '',
  country: '',
  message: ''
});

// Submission state
export const isSubmitted = signal(false);
export const isSubmitting = signal(false);

// Computed signal for form validity
export const isFormValid = computed(() => {
  const errors = formErrors.value;
  const data = formData.value;
  
  return !errors.name && !errors.email && !errors.country && !errors.message &&
         data.name && data.email && data.country && data.message;
});

// Actions
export const updateFormData = (field: keyof FormData, value: string) => {
  formData.value = { ...formData.value, [field]: value };
};

export const updateFormError = (field: keyof FormErrors, error: string) => {
  formErrors.value = { ...formErrors.value, [field]: error };
};

export const submitForm = async () => {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  isSubmitted.value = true;
  isSubmitting.value = false;
};

export const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    country: '',
    message: ''
  };
  formErrors.value = {
    name: '',
    email: '',
    country: '',
    message: ''
  };
  isSubmitted.value = false;
  isSubmitting.value = false;
};