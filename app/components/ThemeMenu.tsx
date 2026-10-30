'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemePreference } from '../lib/theme-context';

const options: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export default function ThemeMenu() {
  const { theme, preference, setPreference } = useTheme();
  const CurrentIcon = theme === 'dark' ? Moon : Sun;

  return (
    <Menu>
      <MenuButton className="icon-btn" aria-label={`Theme: ${preference}. Change theme`}>
        <CurrentIcon className="h-5 w-5" aria-hidden="true" />
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom end', gap: 8 }}
        transition
        className="z-[60] w-40 rounded-xl border border-edge bg-surface p-1.5 shadow-elevated-lg outline-none transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        {options.map(({ value, label, icon: Icon }) => (
          <MenuItem key={value}>
            <button
              type="button"
              onClick={() => setPreference(value)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted data-focus:bg-surface-light data-focus:text-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="flex-1 text-left">{label}</span>
              {preference === value && <Check className="h-4 w-4 text-primary" aria-label="selected" />}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
