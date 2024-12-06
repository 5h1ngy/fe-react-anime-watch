import type { Meta, StoryObj } from '@storybook/react';
import { HiHome, HiBookmark, HiMagnifyingGlass } from "react-icons/hi2";

import Component from './component';

const meta = {
  title: 'Page/Preview',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbarItems: [
      { icon: <HiHome />, label: 'Newset', value: '/home' },
      { icon: <HiMagnifyingGlass />, label: 'Search', value: '/search' },
      { icon: <HiBookmark />, label: 'My List', value: '/my-list' },
    ],
    navbarSubItems: [
      { icon: <HiHome />, label: 'Overview', value: '/overview' },
      { icon: <HiMagnifyingGlass />, label: 'Explore', value: '/explore' },
      { icon: <HiBookmark />, label: 'Saved', value: '/saved' },
    ],
    logo: 'https://via.placeholder.com/42', // Placeholder logo URL
    decorationBody: 'https://via.placeholder.com/100x100', // Placeholder decoration image URL
    children: (
      <div>
        <h1>Welcome to the Preview</h1>
        <p>This is a sample body content for the Preview.</p>
      </div>
    ),
  },
};
