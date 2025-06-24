import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface FilterDropdownProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }
  
  const FilterDropdown = ({ label, value, onChange, options }: FilterDropdownProps) => {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder={`Filter by ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default FilterDropdown;
  