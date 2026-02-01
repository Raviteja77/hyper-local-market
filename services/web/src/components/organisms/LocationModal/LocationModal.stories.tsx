import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { LocationModal } from './LocationModal';
import { Button } from '../../atoms';

const meta: Meta<typeof LocationModal> = {
  title: 'Organisms/LocationModal',
  component: LocationModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LocationModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSelectLocation: (address) => console.log('Selected address:', address),
  },
};

export const WithCurrentLocation: Story = {
  args: {
    isOpen: true,
    currentLocation: 'Koramangala, Bengaluru',
    onClose: () => console.log('Close clicked'),
    onSelectLocation: (address) => console.log('Selected address:', address),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Close clicked'),
    onSelectLocation: (address) => console.log('Selected address:', address),
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Koramangala, Bengaluru');

    const handleSelectLocation = (address: string) => {
      console.log('Selected address:', address);
      setCurrentLocation(address);
      setIsOpen(false);
    };

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Current Location:</p>
          <p className="text-lg font-semibold text-gray-900">{currentLocation}</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => setIsOpen(true)}
        >
          Change Location
        </Button>

        <LocationModal
          isOpen={isOpen}
          currentLocation={currentLocation}
          onClose={() => setIsOpen(false)}
          onSelectLocation={handleSelectLocation}
        />
      </div>
    );
  },
};

export const WithSearchInteraction: Story = {
  render: function SearchInteractionStory() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const handleSelectLocation = (address: string) => {
      setSelectedLocation(address);
      setIsOpen(false);
      // Reopen after 1 second to show the interaction
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    };

    return (
      <div>
        {selectedLocation && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-sm text-green-800">
              Location selected: <strong>{selectedLocation}</strong>
            </p>
          </div>
        )}

        <LocationModal
          isOpen={isOpen}
          currentLocation={selectedLocation || undefined}
          onClose={() => setIsOpen(false)}
          onSelectLocation={handleSelectLocation}
        />
      </div>
    );
  },
};

export const FullscreenDemo: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function FullscreenDemoStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Koramangala, Bengaluru');

    const handleSelectLocation = (address: string) => {
      setCurrentLocation(address);
      setIsOpen(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <nav className="bg-white shadow-sm border-b border-gray-200 p-4 mb-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900">HyperLocal Market</h1>
            
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <span className="text-sm text-gray-600">Deliver to</span>
              <span className="text-sm font-medium text-gray-900">{currentLocation}</span>
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                <h3 className="font-semibold text-gray-900">Product {i}</h3>
                <p className="text-sm text-gray-600">Sample product description</p>
              </div>
            ))}
          </div>
        </div>

        <LocationModal
          isOpen={isOpen}
          currentLocation={currentLocation}
          onClose={() => setIsOpen(false)}
          onSelectLocation={handleSelectLocation}
        />
      </div>
    );
  },
};
