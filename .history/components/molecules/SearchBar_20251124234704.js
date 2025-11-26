'use client'

import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

export default function SearchBar({ 
  placeholder = "Search for skills, categories, or locations...",
  onSearch,
  showSearchButton = false,
  className = ''
}) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
<div className="max-w-[1200px] mx-auto p-4 sm:p-5">
  <form onSubmit={handleSubmit} className={className}>
    <div className="flex items-center bg-white rounded-2xl p-3 shadow-lg transition-all duration-300 hover:shadow-xl w-full">
      <Icon name="search" className="text-[#728a9c] mr-3 text-lg" />

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-0 p-0 shadow-none focus:ring-0 text-[#121731] placeholder-gray-400 text-base bg-transparent"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="close" size="sm" />
        </button>
      )}

      {showSearchButton && (
        <Button 
          type="submit" 
          variant="primary" 
          size="small" 
          className="ml-2"
        >
          Search
        </Button>
      )}
    </div>
  </form>
</div>

</form>

  )
}