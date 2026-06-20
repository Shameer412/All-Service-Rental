"use client";
import { Toaster } from 'sonner';

export const ToastProvider = () => {
  return (
    <Toaster 
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme="dark"
      toastOptions={{
        style: {
          background: '#0D2135',
          border: '1px solid #021928',
          color: '#fff',
          fontFamily: 'var(--font-outfit)',
        },
        className: 'my-toast-class',
      }}
    />
  );
};
