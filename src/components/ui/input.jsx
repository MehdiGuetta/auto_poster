import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        type === "date" &&
          "date:text-foreground date:bg-background relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:bg-black [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:p-1.5 [&::-webkit-calendar-picker-indicator]:rounded-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [& [&::-webkit-calendar-picker-indicator]:transition-all [&::-webkit-calendar-picker-indicator]:duration-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-datetime-edit]:text-foreground [&::-webkit-datetime-edit]:pl-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0 [&::-webkit-datetime-edit-text]:text-muted-foreground [&::-webkit-datetime-edit-text]:font-light [&::-webkit-datetime-edit-month-field]:text-foreground [&::-webkit-datetime-edit-month-field]:font-medium [&::-webkit-datetime-edit-day-field]:text-foreground [&::-webkit-datetime-edit-day-field]:font-medium [&::-webkit-datetime-edit-year-field]:text-foreground [&::-webkit-datetime-edit-year-field]:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

