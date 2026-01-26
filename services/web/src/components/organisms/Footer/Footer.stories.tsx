// services/web/src/components/organisms/Footer/Footer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};

export const WithSocialLinks: Story = {
  args: {
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
  },
};

export const CustomSections: Story = {
  args: {
    sections: [
      {
        title: 'Shop',
        links: [
          { label: 'Vegetables', href: '/vegetables' },
          { label: 'Fruits', href: '/fruits' },
          { label: 'Dairy', href: '/dairy' },
          { label: 'Bakery', href: '/bakery' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Track Order', href: '/track' },
          { label: 'Refund Policy', href: '/refund' },
          { label: 'Support', href: '/support' },
        ],
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    sections: [],
    socialLinks: undefined,
  },
};