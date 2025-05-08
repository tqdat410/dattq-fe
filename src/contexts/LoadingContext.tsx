// src/contexts/LoadingContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type LoadingContextType = {
  setPartLoaded: (partId: string) => void;
  isAllLoaded: boolean;
  setIsAllocated: (isAllocated: boolean) => void;
  isAllocated: boolean;
  setIsAllLoaded: (isAllLoaded: boolean) => void; // Thêm setIsAllLoaded vào context type
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const TOTAL_PARTS = ["home", "about", "projects", "contact"];

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadedParts, setLoadedParts] = useState<string[]>([]);
  const [isAllLoaded, setIsAllLoadedState] = useState(false);
  const [isAllocated, setIsAllocated] = useState(false);

  const setPartLoaded = (partId: string) => {
    setLoadedParts((prev) =>
      prev.includes(partId) ? prev : [...prev, partId]
    );
  };

  useEffect(() => {
    if (TOTAL_PARTS.every((part) => loadedParts.includes(part))) {
      setIsAllLoadedState(true); // Cập nhật giá trị isAllLoaded khi tất cả phần đã được load
    }
  }, [loadedParts]);

  // Hàm setIsAllLoaded để cập nhật trạng thái isAllLoaded
  const setIsAllLoadedHandler = (isAllLoaded: boolean) => {
    setIsAllLoadedState(isAllLoaded);
  };

  return (
    <LoadingContext.Provider
      value={{
        setPartLoaded,
        isAllLoaded,
        setIsAllocated,
        isAllocated,
        setIsAllLoaded: setIsAllLoadedHandler, // Trả về hàm setIsAllLoaded
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
