"use client"
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultSettings = {
  minW: 1,
  maxW: 12,
  minH: 1,
  maxH: 12
};

const items = [
  { i: "1", t: "text", d: "Content 1" },
  { i: "2", t: "image", d: "Image 2" },
  { i: "3", t: "text", d: "Content 3" },
  { i: "4", t: "image", d: "Image 4" },
  { i: "5", t: "text", d: "Content 5" },
  { i: "6", t: "image", d: "Image 6" },
  { i: "7", t: "text", d: "Content 7" },
  { i: "8", t: "image", d: "Image 8" },
  { i: "9", t: "text", d: "Content 9" },
  { i: "10", t: "image", d: "Image 10" }
];

const initialLayouts = {
  lg: [
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 1, y: 0, w: 1, h: 1 },
    { i: "3", x: 2, y: 0, w: 1, h: 1 },
    { i: "4", x: 0, y: 1, w: 1, h: 1 },
    { i: "5", x: 1, y: 1, w: 1, h: 1 },
    { i: "6", x: 2, y: 1, w: 1, h: 1 },
    { i: "7", x: 0, y: 2, w: 1, h: 1 },
    { i: "8", x: 1, y: 2, w: 1, h: 1 },
    { i: "9", x: 2, y: 2, w: 1, h: 1 },
    { i: "10", x: 0, y: 3, w: 1, h: 1 }
  ],
  md: [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 4, y: 0, w: 2, h: 2 },
    { i: "4", x: 0, y: 2, w: 2, h: 2 },
    { i: "5", x: 2, y: 2, w: 2, h: 2 },
    { i: "6", x: 4, y: 2, w: 2, h: 2 },
    { i: "7", x: 0, y: 4, w: 2, h: 2 },
    { i: "8", x: 2, y: 4, w: 2, h: 2 },
    { i: "9", x: 4, y: 4, w: 2, h: 2 },
    { i: "10", x: 0, y: 6, w: 2, h: 2 }
  ],
  xs: [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 0, y: 2, w: 2, h: 2 },
    { i: "4", x: 2, y: 2, w: 2, h: 2 },
    { i: "5", x: 0, y: 4, w: 2, h: 2 },
    { i: "6", x: 2, y: 4, w: 2, h: 2 },
    { i: "7", x: 0, y: 6, w: 2, h: 2 },
    { i: "8", x: 2, y: 6, w: 2, h: 2 },
    { i: "9", x: 0, y: 8, w: 2, h: 2 },
    { i: "10", x: 2, y: 8, w: 2, h: 2 }
  ]
};

const applyDefaults = (layout) => {
  return layout.map(item => ({
    ...defaultSettings,
    ...item
  }));
};

const GridLayout = () => {
  const [layouts, setLayouts] = useState({
    lg: applyDefaults(initialLayouts.lg),
    md: applyDefaults(initialLayouts.md),
    xs: applyDefaults(initialLayouts.xs)
  });
  const [showGrid, setShowGrid] = useState(false);

  const handleLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    console.log('Layouts:', allLayouts);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <div>
      <button onClick={toggleGrid}>
        {showGrid ? "Masquer la grille" : "Afficher la grille"}
      </button>
      <div style={{ position: "relative" }}>
        {showGrid && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${layouts.lg.length}, 1fr)`,
              gridTemplateRows: `repeat(${Math.ceil(layouts.lg.length / 3)}, 30px)`,
              pointerEvents: "none",
              zIndex: 1
            }}
          >
            {layouts.lg.map((_, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)"
                }}
              />
            ))}
          </div>
        )}
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          isDraggable={true}
          isResizable={true}
          rowHeight={30}
          breakpoints={{ lg: 1280, md: 992, xs: 480 }}
          cols={{ lg: 12, md: 10, xs: 4 }}
          onLayoutChange={handleLayoutChange}
        >
          {items.map(item => {
            const layoutItem = layouts.lg.find(l => l.i === item.i);
            return (
              <div key={item.i} className="custom-grid-item" style={{ background: 'red', border: '1px solid black' }}>
                {item.t === "text" ? item.d : <img src={item.d} alt={item.i} />}
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default GridLayout;
