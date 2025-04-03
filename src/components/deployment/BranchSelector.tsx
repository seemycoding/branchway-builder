
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const branches = [
  { value: "main", label: "main" },
  { value: "develop", label: "develop" },
  { value: "feature/auth", label: "feature/auth" },
  { value: "feature/dashboard", label: "feature/dashboard" },
  { value: "hotfix/login", label: "hotfix/login" },
  { value: "release/v1.0", label: "release/v1.0" },
];

export function BranchSelector({ onSelect }: { onSelect: (branch: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleSelect = (branch: typeof branches[number]) => {
    setSelectedBranch(branch);
    setOpen(false);
    onSelect(branch.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {selectedBranch.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search branch..." />
          <CommandEmpty>No branch found.</CommandEmpty>
          <CommandGroup>
            {branches.map((branch) => (
              <CommandItem
                key={branch.value}
                value={branch.value}
                onSelect={() => handleSelect(branch)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedBranch.value === branch.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {branch.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
