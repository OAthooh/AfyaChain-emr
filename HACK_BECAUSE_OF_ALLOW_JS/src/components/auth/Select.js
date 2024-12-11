import React from 'react';
export function Select({ label, error, options, className = '', ...props }) {
    return (<div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `} {...props}>
        <option value="">Select a role</option>
        {options.map((option) => (<option key={option.value} value={option.value}>
            {option.label}
          </option>))}
      </select>
      {error && (<p className="text-sm text-red-600">{error}</p>)}
    </div>);
}
