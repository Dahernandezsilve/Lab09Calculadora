import Button from './Screen'

export default {
  title: 'Components/Screen',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    numberInput: { control: 'text' },
    numberOutput: { control: 'text' },

  },
}

export const AsDefault = {
  args: {
    numberInput: '1',
    numberOutput: '2',
  },
}
