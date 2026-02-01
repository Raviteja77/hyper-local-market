import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LocationModal } from './LocationModal';

describe('LocationModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSelectLocation = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSelectLocation.mockClear();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <LocationModal
        isOpen={false}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    expect(screen.getByText('Select Delivery Location')).toBeInTheDocument();
    expect(screen.getByText('Use Current Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for area, street name...')).toBeInTheDocument();
  });

  it('renders saved addresses', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    expect(screen.getByText('Saved Addresses')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Koramangala 4th Block, Bengaluru')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Whitefield, Bengaluru')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const closeButton = screen.getByLabelText('Close location selector');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const { container } = render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const overlay = container.querySelector('[role="presentation"]');
    if (overlay) {
      fireEvent.click(overlay);
    }
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectLocation and onClose when current location button is clicked', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const currentLocationButton = screen.getByText('Use Current Location').closest('button');
    if (currentLocationButton) {
      fireEvent.click(currentLocationButton);
    }
    
    expect(mockOnSelectLocation).toHaveBeenCalledWith('Current Location (GPS)');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectLocation and onClose when a saved address is clicked', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const homeAddressButton = screen.getByText('Koramangala 4th Block, Bengaluru').closest('button');
    if (homeAddressButton) {
      fireEvent.click(homeAddressButton);
    }
    
    expect(mockOnSelectLocation).toHaveBeenCalledWith('Koramangala 4th Block, Bengaluru');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('updates search input value on change', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search for area, street name...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Indiranagar' } });
    
    expect(searchInput.value).toBe('Indiranagar');
  });

  it('has proper accessibility attributes', () => {
    render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'location-modal-title');
    
    const title = screen.getByText('Select Delivery Location');
    expect(title).toHaveAttribute('id', 'location-modal-title');
  });

  it('closes modal when Escape key is pressed on overlay', () => {
    const { container } = render(
      <LocationModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectLocation={mockOnSelectLocation}
      />
    );
    
    const overlay = container.querySelector('[role="presentation"]');
    if (overlay) {
      fireEvent.keyDown(overlay, { key: 'Escape' });
    }
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
