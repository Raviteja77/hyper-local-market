import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PromoBannerCarousel } from './PromoBannerCarousel';

const mockBanners = [
  {
    id: '1',
    title: 'Get 30% off on Dairy Products',
    subtitle: 'Limited Time Offer',
    ctaText: 'Shop Now',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#FFFFFF',
  },
  {
    id: '2',
    title: 'Free Delivery on Orders ₹199+',
    subtitle: 'Fast Delivery',
    ctaText: 'Order Now',
    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#FFFFFF',
  },
  {
    id: '3',
    title: 'Fresh Vegetables at Lowest Prices',
    subtitle: 'Farm Fresh',
    ctaText: 'Browse',
    backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#FFFFFF',
  },
];

describe('PromoBannerCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the first banner by default', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    expect(screen.getByText('Get 30% off on Dairy Products')).toBeInTheDocument();
    expect(screen.getByText('Limited Time Offer')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('renders navigation arrows when there are multiple banners', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    expect(screen.getByLabelText('Previous banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Next banner')).toBeInTheDocument();
  });

  it('does not render navigation arrows when there is only one banner', () => {
    render(<PromoBannerCarousel banners={[mockBanners[0]]} />);
    
    expect(screen.queryByLabelText('Previous banner')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next banner')).not.toBeInTheDocument();
  });

  it('renders dot indicators for multiple banners', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    const dots = screen.getAllByLabelText(/Go to banner/);
    expect(dots).toHaveLength(3);
  });

  it('does not render dot indicators for a single banner', () => {
    render(<PromoBannerCarousel banners={[mockBanners[0]]} />);
    
    expect(screen.queryByLabelText(/Go to banner/)).not.toBeInTheDocument();
  });

  it('advances to next banner when next button is clicked', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    const nextButton = screen.getByLabelText('Next banner');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Free Delivery on Orders ₹199+')).toBeInTheDocument();
  });

  it('goes to previous banner when previous button is clicked', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    const prevButton = screen.getByLabelText('Previous banner');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('Fresh Vegetables at Lowest Prices')).toBeInTheDocument();
  });

  it('jumps to specific banner when dot is clicked', () => {
    render(<PromoBannerCarousel banners={mockBanners} />);
    
    const thirdDot = screen.getByLabelText('Go to banner 3');
    fireEvent.click(thirdDot);
    
    expect(screen.getByText('Fresh Vegetables at Lowest Prices')).toBeInTheDocument();
  });

  it('auto-advances to next banner after interval', async () => {
    render(<PromoBannerCarousel banners={mockBanners} autoPlayInterval={1000} />);
    
    expect(screen.getByText('Get 30% off on Dairy Products')).toBeInTheDocument();
    
    // Advance time by 1 second and flush promises
    await vi.advanceTimersByTimeAsync(1000);
    
    expect(screen.getByText('Free Delivery on Orders ₹199+')).toBeInTheDocument();
  });

  it('wraps around to first banner after the last one', async () => {
    render(<PromoBannerCarousel banners={mockBanners} autoPlayInterval={1000} />);
    
    // Click next twice to get to the last banner
    const nextButton = screen.getByLabelText('Next banner');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Fresh Vegetables at Lowest Prices')).toBeInTheDocument();
    
    // Click next once more to wrap around
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Get 30% off on Dairy Products')).toBeInTheDocument();
  });

  it('returns null when no banners are provided', () => {
    const { container } = render(<PromoBannerCarousel banners={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders banner with image when provided', () => {
    const bannerWithImage = [
      {
        ...mockBanners[0],
        image: 'https://example.com/image.jpg',
      },
    ];
    
    render(<PromoBannerCarousel banners={bannerWithImage} />);
    
    const img = screen.getByAltText('Get 30% off on Dairy Products');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('pauses auto-play on mouse enter', () => {
    render(<PromoBannerCarousel banners={mockBanners} autoPlayInterval={1000} />);
    
    const container = screen.getByText('Get 30% off on Dairy Products').closest('div')?.parentElement;
    
    if (container) {
      fireEvent.mouseEnter(container);
      
      // Advance time - should not change banner
      vi.advanceTimersByTime(2000);
      
      expect(screen.getByText('Get 30% off on Dairy Products')).toBeInTheDocument();
    }
  });
});
