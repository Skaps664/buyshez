"use client"

import React, { useRef, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ConfirmSubmitButton({
  children,
  className,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  formAction,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  formAction?: any;
  variant?: "default" | "destructive";
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {/* Hidden native submit button to trigger form action */}
      <button
        type="submit"
        ref={buttonRef}
        className="hidden"
        formAction={formAction}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelText}</AlertDialogCancel>
            <AlertDialogAction
              className={variant === "destructive" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                // Slight delay ensures the dialog closes before the browser navigates/submits,
                // which avoids issues with Radix focus traps.
                setTimeout(() => {
                  buttonRef.current?.click()
                }, 50)
              }}
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
