import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PromoBannerCarousel } from './PromoBannerCarousel';

const meta: Meta<typeof PromoBannerCarousel> = {
  title: 'Organisms/PromoBannerCarousel',
  component: PromoBannerCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PromoBannerCarousel>;

const sampleBanners = [
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

const singleBanner = [
  {
    id: '1',
    title: 'Special Weekend Deal!',
    subtitle: 'Save big on groceries',
    ctaText: 'Shop Now',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#FFFFFF',
  },
];

export const Default: Story = {
  args: {
    banners: sampleBanners,
    autoPlayInterval: 4000,
  },
};

export const SingleBanner: Story = {
  args: {
    banners: singleBanner,
  },
};

export const FastAutoPlay: Story = {
  args: {
    banners: sampleBanners,
    autoPlayInterval: 2000,
  },
};

export const SlowAutoPlay: Story = {
  args: {
    banners: sampleBanners,
    autoPlayInterval: 6000,
  },
};

export const WithImages: Story = {
  args: {
    banners: [
      {
        id: '1',
        title: 'Get 30% off on Dairy Products',
        subtitle: 'Limited Time Offer',
        ctaText: 'Shop Now',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#FFFFFF',
        image: 'https://picsum.photos/seed/banner1/200/200',
      },
      {
        id: '2',
        title: 'Free Delivery on Orders ₹199+',
        subtitle: 'Fast Delivery',
        ctaText: 'Order Now',
        backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        textColor: '#FFFFFF',
        image: 'https://picsum.photos/seed/banner2/200/200',
      },
    ],
    autoPlayInterval: 4000,
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [currentBanners] = React.useState(sampleBanners);
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6 px-4">Promo Banner Carousel</h1>
          <PromoBannerCarousel banners={currentBanners} autoPlayInterval={4000} />
          <div className="px-4 mt-8">
            <p className="text-gray-600">
              • Hover over the banner to pause auto-play
              <br />
              • Click the arrows to navigate manually
              <br />
              • Click the dots to jump to a specific banner
            </p>
          </div>
        </div>
      </div>
    );
  },
};
