'use client'

import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Icon from '@/components/atoms/Icon'

export default function SearchBar({ 
  placeholder = "Search for skills, categories, or locations...",
  onSearch,
  className = ''
}) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center bg-white rounded-lg p-3 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <Icon name="search" className="text-[#728a9c] mr-3" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="border-0 shadow-none focus:ring-0"
        />
      </div>
    </form>
  )
}