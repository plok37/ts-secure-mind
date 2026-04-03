import React from "react";

export default function CubesHoverEffect() {
  return (
    <div className="cubes-container">
      {[0, 1, 2].map((cubeIdx) => (
        <div className={`cube cube-${cubeIdx + 1}`} key={cubeIdx}>
          {[-1, 0, 1].map((x) => (
            <div key={x} style={{
              // @ts-ignore
              '--x': x,
              '--y': 0
            }}>
              {[3, 2, 1].map((i) => (
                <span key={i} style={{
                  // @ts-ignore
                  '--i': i
                  // Remove any custom width/height here, use CSS only
                }}></span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// To ensure perfect cubes, adjust the CSS so that:
// - .cube span { width: 32px; height: 32px; }
// - .cube > div { gap: 0; }
// - .cube > div { translate: calc(-36px * var(--x)) 0; }
// - .cube-2, .cube-3 { translate: ... } // adjust for new size
// - .cube span:before { left: -24px; width: 24px; height: 100%; }
// - .cube span:after { top: -24px; height: 24px; width: 100%; }
// These changes will make each cube a true square in all dimensions.