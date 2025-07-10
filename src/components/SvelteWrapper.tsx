import React, { useEffect, useRef } from 'react';

interface SvelteWrapperProps {
  component: any;
  props?: any;
}

export const SvelteWrapper: React.FC<SvelteWrapperProps> = ({ component, props = {} }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const svelteInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (elementRef.current && component) {
      // Clean up previous instance
      if (svelteInstanceRef.current) {
        svelteInstanceRef.current.$destroy();
      }

      // Create new Svelte component instance
      svelteInstanceRef.current = new component({
        target: elementRef.current,
        props
      });
    }

    return () => {
      if (svelteInstanceRef.current) {
        svelteInstanceRef.current.$destroy();
        svelteInstanceRef.current = null;
      }
    };
  }, [component, props]);

  return <div ref={elementRef} className="w-full" />;
};