import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateCursor);
      }
    };

    const updateCursor = () => {
      if (cursorRef.current) {
        const { x, y } = mousePos.current;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafId.current = null;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'LABEL' ||
        target.closest('button') ||
        target.closest('a');

      const isText =
        ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(target.tagName);

      const computedStyle = window.getComputedStyle(target);
      const isPointer = computedStyle.cursor === 'pointer';

      setIsHovered(isInteractive || isText || isPointer);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
    />
  );
};

export default CustomCursor;
