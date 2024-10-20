import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectProps {
  handleSelectChange: (value: string) => void
}

export default function SelectItems({ handleSelectChange }: SelectProps) {
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="Itens" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  )
}
