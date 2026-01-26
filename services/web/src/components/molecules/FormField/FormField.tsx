import React from 'react';
import { Input, InputProps, Typography } from '../../atoms';

export interface FormFieldProps extends Omit<InputProps, 'error'> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  errorMessage,
  helperText,
  required = false,
  id,
  ...inputProps
}) => {
  const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!errorMessage;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="block mb-1.5">
          <Typography variant="small" weight="medium" color="default">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </Typography>
        </label>
      )}
      
      <Input
        id={fieldId}
        error={hasError}
        required={required}
        {...inputProps}
      />
      
      {errorMessage && (
        <div className="mt-1">
          <Typography variant="small" color="error">
            {errorMessage}
          </Typography>
        </div>
      )}
      
      {!errorMessage && helperText && (
        <div className="mt-1">
          <Typography variant="small" color="muted">
            {helperText}
          </Typography>
        </div>
      )}
    </div>
  );
};