"use client";

import { Switch } from "@base-ui/react/switch";

type Props = {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function AvailabilitySwitch({ id, checked, disabled, onChange }: Props) {
  return (
    <Switch.Root
      id={id}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onChange}
      className="flex h-6 w-11 flex-none border border-border bg-background p-0.5 transition-colors outline-none hover:border-steel/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redline data-checked:border-redline data-checked:bg-redline data-disabled:opacity-50"
    >
      <Switch.Thumb className="size-[1.125rem] bg-steel/70 transition-transform duration-200 data-checked:translate-x-5 data-checked:bg-white" />
    </Switch.Root>
  );
}
