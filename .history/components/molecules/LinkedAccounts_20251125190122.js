import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import SmallText from '@/components/atoms/SmallText'

export default function LinkedAccounts({
  accounts = [],
  isEditing = false,
  onAccountsChange,
  className = ''
}) {
  const [showAddField, setShowAddField] = useState(false)
  const [selectedAccountType, setSelectedAccountType] = useState('facebook')
  const [newAccountUrl, setNewAccountUrl] = useState('')
  const [urlError, setUrlError] = useState('')

  // URL validation patterns
  const urlPatterns = {
    facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+/i,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i
  }

  // Account name mapping
  const accountNames = {
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    instagram: 'Instagram'
  }

  // Get placeholder text based on selected account type
  const getAccountPlaceholder = () => {
    const placeholders = {
      facebook: 'Enter Facebook profile URL',
      linkedin: 'Enter LinkedIn profile URL',
      instagram: 'Enter Instagram profile URL'
    }
    return placeholders[selectedAccountType]
  }

  // Validate URL
  const validateUrl = (url, type) => {
    if (!url.trim()) {
      return 'URL is required'
    }
    
    // Add https:// if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    
    // Basic URL validation
    try {
      new URL(url)
    } catch {
      return 'Please enter a valid URL'
    }
    
    // Platform-specific validation
    if (!urlPatterns[type].test(url)) {
      return `Please enter a valid ${accountNames[type]} URL`
    }
    
    return null
  }

  // Save linked account
  const saveLinkedAccount = () => {
    const error = validateUrl(newAccountUrl, selectedAccountType)
    setUrlError(error)
    
    if (!error) {
      let finalUrl = newAccountUrl
      // Ensure URL has protocol
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl
      }
      
      const newAccount = {
        id: Date.now(),
        name: accountNames[selectedAccountType],
        url: finalUrl,
        platform: selectedAccountType
      }
      
      onAccountsChange?.([...accounts, newAccount])
      setNewAccountUrl('')
      setShowAddField(false)
      setUrlError('')
    }
  }

  // Cancel adding account
  const cancelAddAccount = () => {
    setNewAccountUrl('')
    setShowAddField(false)
    setUrlError('')
  }

  // Remove account
  const removeAccount = (accountId) => {
    onAccountsChange?.(accounts.filter(account => account.id !== accountId))
  }

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className="flex justify-between items-center mb-1 w-full">
        <label className="font-semibold text-[#121731] text-sm uppercase tracking-wider">
          LINKED ACCOUNTS:
        </label>
        {isEditing && (
          <Button
            variant="secondary"
            size="small"
            onClick={() => setShowAddField(!showAddField)}
            className="flex items-center gap-1"
          >
            <Icon name="add" />
            Add Account
          </Button>
        )}
      </div>
      
      {/* Add Account Field */}
      {showAddField && isEditing && (
        <div className="add-account-field my-2 w-full space-y-2">
          <Select
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
            className="w-full"
          >
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </Select>
          
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              value={newAccountUrl}
              onChange={(e) => setNewAccountUrl(e.target.value)}
              placeholder={getAccountPlaceholder()}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="icon"
              onClick={saveLinkedAccount}
            >
              <Icon name="check" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={cancelAddAccount}
            >
              <Icon name="close" />
            </Button>
          </div>
          
          {urlError && (
            <SmallText color="danger" className="mt-1">
              {urlError}
            </SmallText>
          )}
        </div>
      )}
      
      {/* Accounts List */}
      <div className="linked-accounts flex flex-col gap-2 w-full">
        {accounts.map((account) => (
          <div key={account.id} className="account-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg w-full">
            <Icon name="link" className="text-[#121731] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#121731] text-sm">
                  {account.name}
                </span>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => removeAccount(account.id)}
                    className="p-1 hover:bg-red-100 hover:text-red-600"
                  >
                    <Icon name="close" size="sm" />
                  </Button>
                )}
              </div>
              <SmallText className="truncate">
                {account.url}
              </SmallText>
            </div>
          </div>
        ))}
        
        {accounts.length === 0 && !showAddField && (
          <div className="no-accounts text-[#728a9c] italic text-center py-4 text-sm bg-gray-50 rounded-lg">
            No linked accounts
          </div>
        )}
      </div>
    </div>
  )
}