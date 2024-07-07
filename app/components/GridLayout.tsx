"use client";
import React, { useState, useEffect, useRef } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useParams } from "next/navigation";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultSettings = {
  minW: 1,
  maxW: 12,
  minH: 1,
  maxH: 12,
};

const applyDefaults = (layout: Layout[]) => {
  return layout.map((item) => ({
    ...defaultSettings,
    ...item,
    x: item.x ?? 0, // Default x to 0 if null
    y: item.y ?? Infinity, // Default y to a large value if null
  }));
};

const GridLayout: React.FC = () => {
  const { id } = useParams();

  const [layouts, setLayouts] = useState<Layouts>({
    lg: applyDefaults([]),
    md: applyDefaults([]),
    xs: applyDefaults([]),
  });
  const [items, setItems] = useState<any[]>([]);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // if (id && isLoading) {
    //   fetch(`/api/layouts/get?id=${id}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data && data.layouts && data.items) {
    //         setLayouts({
    //           lg: applyDefaults(data.layouts.lg),
    //           md: applyDefaults(data.layouts.md),
    //           xs: applyDefaults(data.layouts.xs),
    //         });
    //         setItems(data.items);
    //       } else {
    //         setLayouts({
    //           lg: applyDefaults([]),
    //           md: applyDefaults([]),
    //           xs: applyDefaults([]),
    //         });
    //         setItems([]);
    //       }
    //       setIsLoading(false); // Set loading to false after data is fetched
    //     })
    //     .catch((error) => {
    //       console.error("Error loading layouts:", error);
    //       setIsLoading(false);
    //     });
    // }
  }, [id, isLoading]);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    setHasChanges(true);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const addItem = () => {
    const newItem = {
      i: (items.length + 1).toString(),
      t: "text",
      d: `Content ${items.length + 1}`,
    };
    const newItems = [...items, newItem];
    const newLayouts = {
      lg: [...layouts.lg, { i: newItem.i, x: 0, y: Infinity, w: 1, h: 1 }],
      md: [...layouts.md, { i: newItem.i, x: 0, y: Infinity, w: 2, h: 2 }],
      xs: [...layouts.xs, { i: newItem.i, x: 0, y: Infinity, w: 2, h: 2 }],
    };
    setItems(newItems);
    setLayouts(newLayouts);
    setHasChanges(true);
  };

  const removeItem = (i: string) => {
    const newItems = items.filter((item) => item.i !== i);
    const newLayouts = {
      lg: layouts.lg.filter((item) => item.i !== i),
      md: layouts.md.filter((item) => item.i !== i),
      xs: layouts.xs.filter((item) => item.i !== i),
    };
    setItems(newItems);
    setLayouts(newLayouts);
    setHasChanges(true);
  };

  const saveLayouts = () => {
    if (id) {
      fetch(`/api/layouts/post?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ layouts, items }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Save successful: ", data);
          setHasChanges(false);
        })
        .catch((error) => {
          console.error("Error saving layouts:", error);
        });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={toggleGrid}>
        {showGrid ? "Masquer la grille" : "Afficher la grille"}
      </button>
      <button onClick={addItem}>Ajouter un élément</button>
      {hasChanges && <button onClick={saveLayouts}>Sauvegarder</button>}
      <div style={{ position: "relative" }}>
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
          {items.map((item) => {
            return (
              <div
                key={item.i}
                className="custom-grid-item"
                style={{
                  background: "red",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                {item.t === "text" ? item.d : <img src={item.d} alt={item.i} />}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "50%",
                    padding: "10px", // Increase padding to make clickable area larger
                  }}
                  onClick={() => removeItem(item.i)}
                >
                  &times;
                </span>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default GridLayout;
