import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick date",
}) => {
  const selectedDate = value ? dayjs(value).toDate() : undefined;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex items-center gap-2 h-9 px-3 border rounded-md text-sm 
                     bg-background hover:bg-accent transition"
        >
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          {value ? dayjs(value).format("DD MMM YYYY") : placeholder}
        </button>
      </Popover.Trigger>

      <Popover.Content
        side="bottom"
        align="start"
        className="bg-background border rounded-md shadow-md p-2 z-50"
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onChange(dayjs(date).format("YYYY-MM-DD"));
            }
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
