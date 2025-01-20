// Type-safe route parameters
export type RouteParams<T extends string> = {
  [K in T]: string;
};

// Type-safe search parameters
export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

// Type-safe dynamic imports
export type DynamicImport<T> = Promise<{
  default: React.ComponentType<T>;
}>;

// Type-safe error handling
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  digest?: string;
}

// Type-safe metadata
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
}

// Type-safe component props with required children
export interface WithChildren<P = Record<string, unknown>> {
  children: React.ReactNode;
  props?: P;
}

// Type-safe component props with optional children
export type WithOptionalChildren<P = Record<string, unknown>> = P & {
  children?: React.ReactNode;
};

// Type-safe event handlers
export type EventHandler<E = React.SyntheticEvent> = (event: E) => void;

// Type-safe async event handlers
export type AsyncEventHandler<E = React.SyntheticEvent> = (event: E) => Promise<void>;

// Type-safe form events
export type FormHandler = EventHandler<React.FormEvent<HTMLFormElement>>;
export type AsyncFormHandler = AsyncEventHandler<React.FormEvent<HTMLFormElement>>;

// Type-safe API responses
export interface ApiResponse<T> {
  data?: T;
  error?: AppError;
  statusCode: number;
  message?: string;
} 