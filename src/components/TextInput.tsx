import React, { useEffect, useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { formData, formErrors, updateFormData, updateFormError } from '../signals/formSignals';
import { useSignal } from '@preact/signals-react';

interface TextInputProps {
  field: 'name';
  label: string;
  placeholder: string;
}

export const TextInput: React.FC<TextInputProps> = ({ field, label, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const currentValue = useSignal(formData.value[field]);
  const currentError = useSignal(formErrors.value[field]);

  useEffect(() => {
    currentValue.value = formData.value[field];
  }, [formData.value[field]]);

  useEffect(() => {
    currentError.value = formErrors.value[field];
  }, [formErrors.value[field]]);

  const validateInput = (value: string) => {
    if (!value.trim()) {
      updateFormError(field, 'This field is required');
      return;
    }
    if (value.length < 2) {
      updateFormError(field, 'Must be at least 2 characters');
      return;
    }
    updateFormError(field, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData(field, value);
    validateInput(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    validateInput(currentValue.value);
  };

  return (
    <div className="micro-frontend-container">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Text Input Micro Frontend</h3>
            <p className="text-sm text-gray-500">React Component</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentValue.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                currentError.value
                  ? 'border-red-300 focus:border-red-500'
                  : isFocused
                  ? 'border-blue-500 focus:border-blue-600'
                  : 'border-gray-300 focus:border-blue-500'
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