import React from 'react';
import { useSignal } from '@preact/signals-react';
import { Send, RotateCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { TextInput } from './components/TextInput';
import { EmailInput } from './components/EmailInput';
import { TextAreaInput } from './components/TextAreaInput';
import { SvelteWrapper } from './components/SvelteWrapper';
import { 
  formData, 
  formErrors, 
  isSubmitted, 
  isSubmitting, 
  isFormValid, 
  submitForm, 
  resetForm 
} from './signals/formSignals';

// Import Svelte component
import SelectInput from './components/SelectInput.svelte';

function App() {
  const currentFormData = useSignal(formData.value);
  const currentIsSubmitted = useSignal(isSubmitted.value);
  const currentIsSubmitting = useSignal(isSubmitting.value);
  const currentIsFormValid = useSignal(isFormValid.value);

  React.useEffect(() => {
    const unsubscribeData = formData.subscribe((data) => {
      currentFormData.value = data;
    });
    
    const unsubscribeSubmitted = isSubmitted.subscribe((submitted) => {
      currentIsSubmitted.value = submitted;
    });
    
    const unsubscribeSubmitting = isSubmitting.subscribe((submitting) => {
      currentIsSubmitting.value = submitting;
    });
    
    const unsubscribeValid = isFormValid.subscribe((valid) => {
      currentIsFormValid.value = valid;
    });

    return () => {
      unsubscribeData();
      unsubscribeSubmitted();
      unsubscribeSubmitting();
      unsubscribeValid();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Micro Frontend Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A beautiful form built with independent micro frontends using React, Svelte, and Signals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                field="name"
                label="Full Name"
                placeholder="Enter your full name"
              />
              
              <EmailInput
                field="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              
              <SvelteWrapper component={SelectInput} />
              
              <TextAreaInput
                field="message"
                label="Message"
                placeholder="Tell us about your experience with micro frontends..."
              />
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!currentIsFormValid.value || currentIsSubmitting.value}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    currentIsFormValid.value && !currentIsSubmitting.value
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentIsSubmitting.value ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Form
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                Form Results
              </h2>
              
              {currentIsSubmitted.value ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Form Submitted Successfully!</h3>
                    <p className="text-green-700">Thank you for testing our micro frontend form.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900">{currentFormData.value.name}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{currentFormData.value.email}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <p className="text-gray-900 capitalize">{currentFormData.value.country}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <p className="text-gray-900">{currentFormData.value.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Complete and submit the form to see results here</p>
                </div>
              )}
            </div>
            
            {/* Architecture Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Micro Frontend Architecture</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Text Input:</strong> React Component</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Email Input:</strong> React Component</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span><strong>Select Input:</strong> Svelte Component</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>TextArea Input:</strong> React Component</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Each component manages its own state and validation using Signals for communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;