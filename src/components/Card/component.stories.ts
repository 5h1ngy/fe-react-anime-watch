import type { Meta, StoryObj } from '@storybook/react';
import Component from './index';

const meta: Meta<typeof Component> = {
  title: 'Components/Card', // Aggiorna il titolo per riflettere il nome del tuo componente
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Puoi modificare il layout se preferisci un posizionamento diverso
  },
  args: {
    thumbnail: 'https://via.placeholder.com/150', // Placeholder per l'immagine
    title: 'Sample Title',
    type: 'Sample Type',
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storie del componente
export const Default: Story = {};

export const Custom: Story = {
  args: {
    thumbnail: 'https://via.placeholder.com/300',
    title: 'Custom Title',
    type: 'Custom Type',
  },
};
