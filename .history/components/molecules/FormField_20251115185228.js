import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import Select from '@/components/atoms/Select'
import SmallText from '@/components/atoms/SmallText'

export default function FormField({
  label,
  type = 'text',
  required = false,
  error,
  helperText,
  ...props
}) {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return <TextArea required={required} {...props} />
      case 'select':
        return <Select required={required} {...props} />
      default:
        return <Input type={type} required={required} {...props} />
    }
  }

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
  )
}