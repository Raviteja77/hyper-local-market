'use client';

import React, { useState } from 'react';
import { MapPin, X, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/atoms';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (address: string) => void;
  currentLocation?: string;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock saved addresses
  const savedAddresses = [
    { id: '1', label: 'Home', address: 'Koramangala 4th Block, Bengaluru' },
    { id: '2', label: 'Work', address: 'Whitefield, Bengaluru' },
  ];

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    onSelectLocation('Current Location (GPS)');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        role="presentation"
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" 
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        tabIndex={-1}
      />
      
      {/* Modal */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            z-50 bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] 
            overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b 
              border-gray-100">
          <h2 id="location-modal-title" className="text-lg font-bold text-gray-900">
            Select Delivery Location
          </h2>
          <button 
            onClick={onClose} 
            aria-label="Close location selector"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Current Location Button */}
        <div className="p-4 border-b border-gray-100">
          <button 
            className="flex items-center gap-3 w-full p-3 rounded-lg 
                  bg-primary-light hover:bg-primary-light/80 transition-colors" 
            onClick={handleUseCurrentLocation}
          >
            <div className="p-2 bg-primary rounded-full">
              <Navigation size={16} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-primary">
                Use Current Location
              </p>
              <p className="text-xs text-gray-600">
                Enable GPS for accurate delivery
              </p>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 
                rounded-lg">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm 
                    text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="p-4 overflow-y-auto max-h-[400px]">
          <h3 className="text-xs font-semibold text-gray-500 uppercase 
                tracking-wide mb-3">
            Saved Addresses
          </h3>
          <div className="space-y-2">
            {savedAddresses.map(addr => (
              <button
                key={addr.id}
                onClick={() => {
                  onSelectLocation(addr.address);
                  onClose();
                }}
                className="flex items-start gap-3 w-full p-3 rounded-lg 
                      hover:bg-gray-50 transition-colors text-left"
              >
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary 
                          uppercase tracking-wide">
                      {addr.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {addr.address}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
