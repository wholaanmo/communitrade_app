import { FormField as FormFieldInterface } from '@/types';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import SmallText from '@/components/atoms/SmallText';

/**
 * FormField component implementing FormField interface
 */
export default function FormField({
  label,
  type = 'text',
  required = false,
  error,
  helperText,
  options = [],
  value,
  onChange,
  placeholder = '',
  className = '',
  ...props
}) {
  const renderInput = () => {
    const commonProps = {
      required,
      value,
      onChange,
      placeholder,
      error,
      className,
      ...props
    };

    switch (type) {
      case 'textarea':
        return <TextArea {...commonProps} />;
      case 'select':
        return (
          <Select {...commonProps}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      default:
        return <Input type={type} {...commonProps} />;
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <Label htmlFor={props.id} required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <SmallText color="danger" className="mt-1">
          {error}
        </SmallText>
      )}
      {helperText && !error && (
        <SmallText color="gray" className="mt-1">
          {helperText}
        </SmallText>
      )}
    </div>
  );
}