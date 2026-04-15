const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const newAutoSliceLogic = `
        const visited = new Uint8Array(width * height);
        let boxes: {x: number, y: number, w: number, h: number}[] = [];
        
        const floodFillDist = (autoGroupMethod === 'pixel' || autoGroupMethod === 'color') ? Math.max(1, connDist) : 1;
        
        // Use a single typed array for the stack to avoid GC overhead and improve performance
        const stack = new Int32Array(width * height);
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = y * width + x;
            if (visited[i]) continue;
            
            const alpha = data[i * 4 + 3];
            if (alpha > 0) {
              let minX = x, minY = y, maxX = x, maxY = y;
              let stackPtr = 0;
              stack[stackPtr++] = i;
              visited[i] = 1;
              
              while (stackPtr > 0) {
                const ci = stack[--stackPtr];
                const cx = ci % width;
                const cy = Math.floor(ci / width);
                
                if (cx < minX) minX = cx;
                if (cx > maxX) maxX = cx;
                if (cy < minY) minY = cy;
                if (cy > maxY) maxY = cy;
                
                // Check neighborhood based on connectionDistance
                const startDy = Math.max(-floodFillDist, -cy);
                const endDy = Math.min(floodFillDist, height - 1 - cy);
                const startDx = Math.max(-floodFillDist, -cx);
                const endDx = Math.min(floodFillDist, width - 1 - cx);
                
                for (let dy = startDy; dy <= endDy; dy++) {
                  for (let dx = startDx; dx <= endDx; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = cx + dx;
                    const ny = cy + dy;
                    const ni = ny * width + nx;
                    
                    if (!visited[ni] && data[ni * 4 + 3] > 0) {
                      let shouldAdd = false;
                      if (autoGroupMethod === 'color') {
                        const r1 = data[ci * 4];
                        const g1 = data[ci * 4 + 1];
                        const b1 = data[ci * 4 + 2];
                        const a1 = data[ci * 4 + 3];
                        const r2 = data[ni * 4];
                        const g2 = data[ni * 4 + 1];
                        const b2 = data[ni * 4 + 2];
                        const a2 = data[ni * 4 + 3];
                        const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);
                        if (diff <= colTol) {
                          shouldAdd = true;
                        }
                      } else {
                        shouldAdd = true;
                      }
                      
                      if (shouldAdd) {
                        visited[ni] = 1;
                        stack[stackPtr++] = ni;
                      }
                    }
                  }
                }
              }
              
              const bw = maxX - minX + 1;
              const bh = maxY - minY + 1;
              if (autoGroupMethod === 'bbox') {
                boxes.push({ x: minX, y: minY, w: bw, h: bh });
              } else {
                if (bw >= minSize && bh >= minSize) {
                  boxes.push({ x: minX, y: minY, w: bw, h: bh });
                }
              }
            } else {
              visited[i] = 1;
            }
          }
        }
        
        if (autoGroupMethod === 'bbox' && boxes.length > 0) {
          // Optimize bounding box merging using Disjoint Set Union (DSU)
          // This reduces complexity from O(N^3) to O(N^2)
          const parent = new Int32Array(boxes.length);
          for (let i = 0; i < boxes.length; i++) parent[i] = i;
          
          const find = (i: number): number => {
            if (parent[i] === i) return i;
            return parent[i] = find(parent[i]);
          };
          
          const union = (i: number, j: number) => {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) {
              parent[rootI] = rootJ;
            }
          };
          
          for (let i = 0; i < boxes.length; i++) {
            for (let j = i + 1; j < boxes.length; j++) {
              const b1 = boxes[i];
              const b2 = boxes[j];
              
              const b1Right = b1.x + b1.w;
              const b1Bottom = b1.y + b1.h;
              const b2Right = b2.x + b2.w;
              const b2Bottom = b2.y + b2.h;
              
              const dx = Math.max(0, Math.max(b1.x - b2Right, b2.x - b1Right));
              const dy = Math.max(0, Math.max(b1.y - b2Bottom, b2.y - b1Bottom));
              
              if (dx <= connDist && dy <= connDist) {
                union(i, j);
              }
            }
          }
          
          const mergedBoxesMap = new Map<number, {x: number, y: number, w: number, h: number}>();
          for (let i = 0; i < boxes.length; i++) {
            const root = find(i);
            const b = boxes[i];
            if (!mergedBoxesMap.has(root)) {
              mergedBoxesMap.set(root, { ...b });
            } else {
              const mb = mergedBoxesMap.get(root)!;
              const mbRight = mb.x + mb.w;
              const mbBottom = mb.y + mb.h;
              const bRight = b.x + b.w;
              const bBottom = b.y + b.h;
              
              const newX = Math.min(mb.x, b.x);
              const newY = Math.min(mb.y, b.y);
              const newRight = Math.max(mbRight, bRight);
              const newBottom = Math.max(mbBottom, bBottom);
              
              mb.x = newX;
              mb.y = newY;
              mb.w = newRight - newX;
              mb.h = newBottom - newY;
            }
          }
          
          boxes = Array.from(mergedBoxesMap.values()).filter(b => b.w >= minSize && b.h >= minSize);
        }`;

const oldAutoSliceLogicRegex = /const visited = new Uint8Array\(width \* height\);[\s\S]*?boxes = boxes\.filter\(b => b\.w >= minSize && b\.h >= minSize\);\n        }/;

content = content.replace(oldAutoSliceLogicRegex, newAutoSliceLogic.trim());

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
