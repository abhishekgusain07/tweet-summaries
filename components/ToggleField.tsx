import React, { useId, useState } from "react";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TrashIcon } from "./icon/trashIcon";
import { EditIcon } from "./icon/editIcon";

interface FieldName {
  name: string;
  placeholder?: string;
}

interface ToggleFieldProps extends React.PropsWithChildren {
  title: string;
  initialOpen?: boolean;
  onToggle?: () => void;
  name?: string;
  editable?: boolean;
  setFieldNames?: React.Dispatch<React.SetStateAction<FieldName[]>>;
  idx?: number;
  blockToggleState?: boolean;
  setUpgradeOpen?: (open: boolean) => void;
  placeholder?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  title,
  children,
  initialOpen = false,
  onToggle,
  name,
  editable,
  setFieldNames,
  idx,
  blockToggleState,
  setUpgradeOpen,
  placeholder,
}) => {
  const id = useId();
  const [open, setOpen] = useState(initialOpen);
  const [editLabel, setEditLabel] = useState(false);

  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor={id} className="text-sm font-medium text-zinc-900">
            {title}
          </Label>
          <p className="text-sm text-zinc-500">
            Get summaries delivered directly to your inbox
          </p>
        </div>
        {editable && (
          <div className="flex items-center space-x-2">
            <EditIcon
              className="h-4 w-4 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              onClick={() => setEditLabel(!editLabel)}
            />
            <TrashIcon
              className="h-4 w-4 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setFieldNames?.((prev) => {
                  const updatedFieldNames = [...prev];
                  updatedFieldNames.splice(idx!, 1);
                  setEditLabel(false);
                  return updatedFieldNames;
                });
              }}
            />
          </div>
        )}
        <Switch
          id={id}
          name={name}
          checked={open}
          onCheckedChange={
            blockToggleState
              ? () => setUpgradeOpen?.(true)
              : (x) => {
                  setOpen(x);
                  onToggle?.();
                }
          }
          className="data-[state=checked]:bg-purple-600"
        />
      </div>
      {editLabel && (
        <div className="mt-4 space-y-4">
          <Input
            defaultValue={title}
            label="Field Name"
            onChange={(e) => {
              e.preventDefault();
              setFieldNames?.((prev) => {
                const updatedFieldNames = [...prev];
                if (idx !== undefined) {
                  updatedFieldNames[idx].name = e.target.value;
                }
                return updatedFieldNames;
              });
            }}
          />
          <Input
            defaultValue={placeholder}
            label="Placeholder"
            onChange={(e) => {
              e.preventDefault();
              setFieldNames?.((prev) => {
                const updatedFieldNames = [...prev];
                if (idx !== undefined) {
                  updatedFieldNames[idx].placeholder = e.target.value;
                }
                return updatedFieldNames;
              });
            }}
          />
        </div>
      )}
      {open && children && (
        <div className="mt-4 border-t border-zinc-200 pt-4">
          {children}
        </div>
      )}
    </div>
  );
};
