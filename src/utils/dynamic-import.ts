import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

interface DynamicImportOptions {
  ssr?: boolean;
  loading?: (props: DynamicOptionsLoadingProps) => JSX.Element | null;
}

export function dynamicImport<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportOptions = {}
) {
  const { ssr = true, loading } = options;

  return dynamic(importFn, {
    ssr,
    loading,
    // Disable automatic static optimization for components that need to be dynamic
    suspense: true,
  });
}

// Example usage:
// const DynamicComponent = dynamicImport(() => import('@/components/heavy-component'), {
//   loading: () => <div>Loading...</div>
// }); 