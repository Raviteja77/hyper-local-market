import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'Hyper-Local Market',
  brandUrl: '/',
  brandImage: 'https://placehold.co/200x50/10B981/ffffff?text=Hyper+Local',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#10B981', // Primary Green
  colorSecondary: '#3B82F6', // Secondary Blue

  // UI
  appBg: '#F3F4F6',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E5E7EB',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#111827',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#9CA3AF',
  barSelectedColor: '#10B981',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E5E7EB',
  inputTextColor: '#111827',
  inputBorderRadius: 6,
});
