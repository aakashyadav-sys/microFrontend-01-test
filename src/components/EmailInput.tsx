import React, { useEffect, useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { formData, formErrors, updateFormData, updateFormError } from '../signals/formSignals';
import { useSignal } from '@preact/signals-react';

interface EmailInputProps {
  field: 'email';
  label: string;
  placeholder: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ field, label, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const currentValue = useSignal(formData.value[field]);
  const currentError = useSignal(formErrors.value[field]);

  useEffect(() => {
    currentValue.value = formData.value[field];
  }, [formData.value[field]]);

  useEffect(() => {
    currentError.value = formErrors.value[field];
  }, [formErrors.value[field]]);

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      updateFormError(field, 'Email is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      updateFormError(field, 'Please enter a valid email address');
      return;
    }
    updateFormError(field, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData(field, value);
    validateEmail(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    validateEmail(currentValue.value);
  };

  return (
    <div className="micro-frontend-container">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Mail className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Email Input Micro Frontend</h3>
            <p className="text-sm text-gray-500">React Component</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="relative">
            <input
              type="email"
              value={currentValue.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                currentError.value
                  ? 'border-red-300 focus:border-red-500'
                  : isFocused
                  ? 'border-green-500 focus:border-green-600'
                  : 'border-gray-300 focus:border-green-500'
              }`}
            />
            {currentError.value && (
              <div className="absolute right-3 top-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {currentError.value && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {currentError.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};