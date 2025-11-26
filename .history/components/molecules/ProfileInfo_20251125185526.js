import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import SmallText from '@/components/atoms/SmallText'

export default function ProfileInfo({
  label,
  value,
  isEditing = false,
  editValue,
  onEditChange,
  type = 'text',
  disabled = false,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <Label className="uppercase tracking-wider">{label}</Label>
      {isEditing ? (
        <Input
          type={type}
          value={editValue || ''}
          onChange={(e) => onEditChange?.(e.target.value)}
          disabled={disabled}
          className="w-full"
        />
      ) : (
        <p className="text-[#121731] text-sm sm:text-base m-0 pl-2 break-words w-full">
          {value}
        </p>
      )}
    </div>
  )
}