import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    character: { control: 'text' },
    borderRadius: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    color: { control: 'color' },
    fontSize: { control: 'text' },
  },
}

export const AsNumber = {
  args: {
    character: '7',
    borderRadius: '75px',
    width: '65px',
    height: '65px',
    color: '#b79472',
    fontSize: '30px',
  },
}

export const AsOperation = {
  args: {
    character: 'X',
    borderRadius: '75px',
    width: '65px',
    height: '65px',
    color: '#52cfc2',
    fontSize: '30px',
  },
}
