// services/web/src/components/atoms/Typography/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'default', 'muted', 'error', 'success'],
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text used for paragraphs and general content.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Small text for secondary information',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text for labels and metadata',
  },
};

export const Primary: Story = {
  args: {
    variant: 'h3',
    color: 'primary',
    children: 'Primary colored text',
  },
};

export const Error: Story = {
  args: {
    variant: 'body',
    color: 'error',
    children: 'Error message text',
  },
};

export const Muted: Story = {
  args: {
    variant: 'body',
    color: 'muted',
    children: 'Muted secondary text',
  },
};

export const Centered: Story = {
  args: {
    variant: 'h2',
    align: 'center',
    children: 'Centered text',
  },
};

export const Bold: Story = {
  args: {
    variant: 'body',
    weight: 'bold',
    children: 'Bold text',
  },
};