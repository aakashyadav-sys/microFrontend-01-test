import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { formData, formErrors, updateFormData, updateFormError } from '../signals/formSignals';
import { useSignal } from '@preact/signals-react';

interface TextAreaInputProps {
  field: 'message';
  label: string;
  placeholder: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ field, label, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const currentValue = useSignal(formData.value[field]);
  const currentError = useSignal(formErrors.value[field]);

  useEffect(() => {
    currentValue.value = formData.value[field];
  }, [formData.value[field]]);

  useEffect(() => {
    currentError.value = formErrors.value[field];
  }, [formErrors.value[field]]);

  const validateTextArea = (value: string) => {
    if (!value.trim()) {
      updateFormError(field, 'Message is required');
      return;
    }
    if (value.length < 10) {
      updateFormError(field, 'Message must be at least 10 characters');
      return;
    }
    if (value.length > 500) {
      updateFormError(field, 'Message must be less than 500 characters');
      return;
    }
    updateFormError(field, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    updateFormData(field, value);
    validateTextArea(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    validateTextArea(currentValue.value);
  };

  return (
    <div className="micro-frontend-container">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageSquare className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">TextArea Input Micro Frontend</h3>
            <p className="text-sm text-gray-500">React Component</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="relative">
            <textarea
              value={currentValue.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-none ${
                currentError.value
                  ? 'border-red-300 focus:border-red-500'
                  : isFocused
                  ? 'border-purple-500 focus:border-purple-600'
                  : 'border-gray-300 focus:border-purple-500'
              }`}
            />
            {currentError.value && (
              <div className="absolute right-3 top-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            {currentError.value && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {currentError.value}
              </p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {currentValue.value.length}/500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};