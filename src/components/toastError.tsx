// lib/toast.ts
import { toast, Slide, ToastOptions } from "react-toastify";

/**
 * Show a reusable error toast.
 * @param message - The message to display
 * @param options - Optional overrides for toast configuration
 */
export function toastError(
  message: string,
  options?: ToastOptions
): void {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
    ...options, // allow overrides
  });
}
