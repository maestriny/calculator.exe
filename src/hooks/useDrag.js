import { useRef, useCallback } from 'react';


export function useDrag() {
  const ref = useRef(null);
  // how far the mouse is from the element's top-left corner when dragging starts
  const offset = useRef({ x: 0, y: 0 });

  // fires on every mouse move while dragging
  // clamps position so the element stays within the viewport
  const onMouseMove = useCallback((e) => {
    const element = ref.current;
    if (!element) return;
    const { clientWidth, clientHeight } = document.documentElement;
    const { offsetWidth, offsetHeight } = element;

    const x = Math.max(0, Math.min(e.clientX - offset.current.x, clientWidth - offsetWidth));
    const y = Math.max(0, Math.min(e.clientY - offset.current.y, clientHeight - offsetHeight));

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }, []);

  // remove the listeners
  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  // start dragging and listen for mouse movement on the whole document
  const onMouseDown = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    el.style.position = 'absolute';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.style.left = `${rect.left}px`;
    el.style.top = `${rect.top}px`;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  return { ref, onMouseDown };
}
