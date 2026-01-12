import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const RubiksCube = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrambleCount, setScrambleCount] = useState(20);
  const [isAnimating, setIsAnimating] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [userMoveHistory, setUserMoveHistory] = useState<string[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const rotationGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  // Color scheme
  const colors = {
    white: 0xffffff,
    yellow: 0xffff00,
    blue: 0x0000ff,
    green: 0x00ff00,
    orange: 0xff8800,
    red: 0xff0000,
    black: 0x000000,
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create cubes
    const cubeSize = 1.5;
    const gap = 0.05;
    const offset = cubeSize + gap;
    const cubes = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

          // Create materials for each face
          const materials = [
            new THREE.MeshLambertMaterial({
              color: x === 1 ? colors.red : colors.black,
            }),
            new THREE.MeshLambertMaterial({
              color: x === -1 ? colors.orange : colors.black,
            }),
            new THREE.MeshLambertMaterial({
              color: y === 1 ? colors.white : colors.black,
            }),
            new THREE.MeshLambertMaterial({
              color: y === -1 ? colors.yellow : colors.black,
            }),
            new THREE.MeshLambertMaterial({
              color: z === 1 ? colors.blue : colors.black,
            }),
            new THREE.MeshLambertMaterial({
              color: z === -1 ? colors.green : colors.black,
            }),
          ];

          const cube = new THREE.Mesh(geometry, materials);
          cube.position.set(x * offset, y * offset, z * offset);

          // Store initial position
          cube.userData.initialPosition = cube.position.clone();
          cube.userData.gridPosition = { x, y, z };

          scene.add(cube);
          cubes.push(cube);
        }
      }
    }
    cubesRef.current = cubes;

    // // Mouse controls for camera rotation
    // const onMouseDown = (e: MouseEvent) => {
    //   isDraggingRef.current = true;
    //   previousMouseRef.current = { x: e.clientX, y: e.clientY };
    // };

    // const onMouseMove = (e: MouseEvent) => {
    //   if (!isDraggingRef.current || isAnimating) return;

    //   const deltaX = e.clientX - previousMouseRef.current.x;
    //   const deltaY = e.clientY - previousMouseRef.current.y;

    //   const rotationSpeed = 0.005;

    //   // Rotate camera around the cube
    //   const spherical = new THREE.Spherical();
    //   spherical.setFromVector3(camera.position);

    //   spherical.theta -= deltaX * rotationSpeed;
    //   spherical.phi += deltaY * rotationSpeed;
    //   spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

    //   camera.position.setFromSpherical(spherical);
    //   camera.lookAt(0, 0, 0);

    //   previousMouseRef.current = { x: e.clientX, y: e.clientY };
    // };

    // const onMouseUp = () => {
    //   isDraggingRef.current = false;
    // };

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || isAnimating) return;

      const deltaX = e.clientX - previousMouseRef.current.x;
      const deltaY = e.clientY - previousMouseRef.current.y;

      const rotationSpeed = 0.005;

      const spherical = new THREE.Spherical();
      spherical.setFromVector3(cameraRef.current!.position);

      spherical.theta -= deltaX * rotationSpeed;
      spherical.phi += deltaY * rotationSpeed;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      cameraRef.current!.position.setFromSpherical(spherical);
      cameraRef.current!.lookAt(0, 0, 0);

      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    // renderer.domElement.addEventListener("mousedown", onMouseDown);
    // renderer.domElement.addEventListener("mousemove", onMouseMove);
    // renderer.domElement.addEventListener("mouseup", onMouseUp);

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", onPointerUp);
        renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const rotateFace = (
    axis: string,
    layer: number,
    direction: number,
    duration = 300
  ): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (!sceneRef.current) {
        resolve();
        return;
      }

      const group = new THREE.Group();
      sceneRef.current.add(group);
      rotationGroupRef.current = group;

      // Select cubes for this face
      const cubesToRotate = cubesRef.current.filter((cube) => {
        const pos = cube.userData.gridPosition;
        if (axis === "x") return pos.x === layer;
        if (axis === "y") return pos.y === layer;
        if (axis === "z") return pos.z === layer;
        return false;
      });

      // Add cubes to rotation group
      cubesToRotate.forEach((cube) => {
        group.attach(cube);
      });

      // Animate rotation
      const startRotation: number = group.rotation[axis as "x" | "y" | "z"];
      const endRotation = startRotation + (Math.PI / 2) * direction;
      const startTime = Date.now();

      const animateRotation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        group.rotation[axis as "x" | "y" | "z"] =
          startRotation + (endRotation - startRotation) * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Detach cubes from group and update positions
          cubesToRotate.forEach((cube) => {
            sceneRef.current?.attach(cube);

            // Update grid position
            const pos = cube.position;
            const gridPos = {
              x: Math.round(pos.x),
              y: Math.round(pos.y),
              z: Math.round(pos.z),
            };
            cube.userData.gridPosition = gridPos;

            // Snap to grid
            cube.position.set(gridPos.x, gridPos.y, gridPos.z);
            cube.rotation.set(
              Math.round(cube.rotation.x / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(cube.rotation.y / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(cube.rotation.z / (Math.PI / 2)) * (Math.PI / 2)
            );
          });

          sceneRef.current?.remove(group);
          rotationGroupRef.current = null;
          resolve();
        }
      };

      animateRotation();
    });
  };

  const executeMove = async (move: string) => {
    const moves = {
      R: () => rotateFace("x", 1, 1),
      "R'": () => rotateFace("x", 1, -1),
      L: () => rotateFace("x", -1, -1),
      "L'": () => rotateFace("x", -1, 1),
      U: () => rotateFace("y", 1, 1),
      "U'": () => rotateFace("y", 1, -1),
      D: () => rotateFace("y", -1, -1),
      "D'": () => rotateFace("y", -1, 1),
      F: () => rotateFace("z", 1, 1),
      "F'": () => rotateFace("z", 1, -1),
      B: () => rotateFace("z", -1, -1),
      "B'": () => rotateFace("z", -1, 1),
    };

    if (moves[move as keyof typeof moves]) {
      await moves[move as keyof typeof moves]();
    }
  };

  const handleManualMove = async (move: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    await executeMove(move);
    setMoveHistory((prev: string[]) => [...prev, move]);
    setUserMoveHistory((prev: string[]) => [...prev, move]);
    setIsAnimating(false);
  };

  const scrambleCube = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const possibleMoves: string[] = [
      "R",
      "R'",
      "L",
      "L'",
      "U",
      "U'",
      "D",
      "D'",
      "F",
      "F'",
      "B",
      "B'",
    ];

    const scrambleMoves: string[] = [];

    for (let i = 0; i < scrambleCount; i++) {
      const randomMove =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      scrambleMoves.push(randomMove);
      await executeMove(randomMove);
    }

    setMoveHistory((prev: string[]) => [...prev, ...scrambleMoves]);
    setIsAnimating(false);
  };

  const solveCube = async () => {
    if (isAnimating || moveHistory.length === 0) return;
    setIsAnimating(true);

    // Reverse all moves to return to solved state
    const inverseMoves = {
      R: "R'",
      "R'": "R",
      L: "L'",
      "L'": "L",
      U: "U'",
      "U'": "U",
      D: "D'",
      "D'": "D",
      F: "F'",
      "F'": "F",
      B: "B'",
      "B'": "B",
    };

    for (let i = moveHistory.length - 1; i >= 0; i--) {
      await executeMove(
        inverseMoves[moveHistory[i] as keyof typeof inverseMoves]
      );
    }

    setMoveHistory([]);
    setUserMoveHistory([]);
    setIsAnimating(false);
  };

  const resetHistory = async () => {
    if (isAnimating || userMoveHistory.length === 0) return;
    setIsAnimating(true);

    // Reverse only the moves made by user
    const inverseMoves = {
      R: "R'",
      "R'": "R",
      L: "L'",
      "L'": "L",
      U: "U'",
      "U'": "U",
      D: "D'",
      "D'": "D",
      F: "F'",
      "F'": "F",
      B: "B'",
      "B'": "B",
    };

    for (let i = userMoveHistory.length - 1; i >= 0; i--) {
      await executeMove(
        inverseMoves[userMoveHistory[i] as keyof typeof inverseMoves]
      );
    }

    setMoveHistory((prev: string[]) =>
      prev.filter(
        (item, index) =>
          !userMoveHistory.includes(item) ||
          index < prev.length - userMoveHistory.length
      )
    );
    setUserMoveHistory([]);
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex-1" ref={mountRef} />

      <div className="bg-gray-900 border-t border-gray-700 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Control buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-white font-medium text-sm sm:text-base">
                Scramble:
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={scrambleCount}
                onChange={(e) =>
                  setScrambleCount(
                    Math.max(5, Math.min(50, parseInt(e.target.value) || 20))
                  )
                }
                className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                disabled={isAnimating}
              />
              <span className="text-gray-400 text-sm">moves</span>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={scrambleCube}
                disabled={isAnimating}
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-lg text-sm sm:text-base"
              >
                {isAnimating ? "Animating..." : "Scramble"}
              </button>

              <button
                onClick={solveCube}
                disabled={isAnimating || moveHistory.length === 0}
                className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-lg text-sm sm:text-base"
              >
                Solve
              </button>

              <button
                onClick={resetHistory}
                disabled={isAnimating || moveHistory.length === 0}
                className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-lg text-sm sm:text-base"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Manual move buttons */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Manual Moves
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {[
                "R",
                "R'",
                "L",
                "L'",
                "U",
                "U'",
                "D",
                "D'",
                "F",
                "F'",
                "B",
                "B'",
              ].map((move) => (
                <button
                  key={move}
                  onClick={() => handleManualMove(move)}
                  disabled={isAnimating}
                  className="px-2 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-mono rounded transition-colors text-xs sm:text-sm"
                >
                  {move}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-400 text-xs sm:text-sm">
            {userMoveHistory.length > 0
              ? `${userMoveHistory.length} moves in history`
              : "Drag to rotate view • Click move buttons to play"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RubiksCube;
