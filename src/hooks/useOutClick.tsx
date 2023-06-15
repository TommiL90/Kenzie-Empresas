"use client"
import { useEffect, useRef } from "react";

export const useOutClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(!ref.current) {
        return;
      }

      if(!event.target) {
        return
      }

      if(!ref.current.contains(event.target as HTMLElement)) {
        callback()
      }
    }

    window.addEventListener("mousedown", handleClick)

    return () => {
      window.removeEventListener("mousedown", handleClick)
    }
  }, [callback])

  return ref
};
