import * as THREE from 'three';

// --- MOBILE DETECTION ---
const isMobile = window.innerWidth < 768;

// --- CONFIGURATION ---
// Mobile par particles kam rakhenge taaki lag na ho (Performance Fix)
const PARTICLE_COUNT = isMobile ? 6000 : 15000;
const PARTICLE_SIZE = isMobile ? 0.12 : 0.08; // Mobile par thode bade particles
const CAM_Z = 30;

// --- GLOBALS ---
let scene, camera, renderer, particles, geometry, material;
let positions, colors, targetPositions;
let handPosition = new THREE.Vector3(0, 0, 0);
let isHandDetected = false;
let gestureMode = 'neutral';
let isCameraActive = false;

// Shape Management
const shapes = ['sphere', 'heart', 'saturn', 'flower', 'torus'];
let currentShapeIndex = 0;
let lastShapeSwitchTime = 0;

// --- INITIALIZATION ---
initThree();

// Check for Camera Support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    initMediaPipe();
} else {
    console.warn("Camera API not supported or insecure context.");
    updateStatusText("HTTPS Required");
}

animate();

function updateStatusText(text, isActive = false) {
    const statusDot = document.getElementById('camera-status');
    const statusText = document.getElementById('status-text');
    if (statusDot && statusText) {
        if(isActive) {
            statusDot.classList.remove('inactive');
            statusDot.classList.add('active');
        } else {
            statusDot.classList.add('inactive');
            statusDot.classList.remove('active');
        }
        statusText.innerText = text;
    }
}

function initThree() {
    const container = document.getElementById('canvas-container');
    
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = CAM_Z;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Sharpness fix
    container.appendChild(renderer.domElement);

    geometry = new THREE.BufferGeometry();
    positions = new Float32Array(PARTICLE_COUNT * 3);
    targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    colors = new Float32Array(PARTICLE_COUNT * 3);

    const colorObj = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        colorObj.setHSL(Math.random(), 0.8, 0.5);
        colors[i * 3] = colorObj.r;
        colors[i * 3 + 1] = colorObj.g;
        colors[i * 3 + 2] = colorObj.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
        size: PARTICLE_SIZE,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    generateShape('sphere');
    
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
}

function generateShape(type) {
    const shapeText = document.getElementById('shape-name');
    if(shapeText) shapeText.innerText = type.toUpperCase();

    const colorObj = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x, y, z;

        if (type === 'sphere') {
            const r = 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
            colorObj.setHSL(0.6 + Math.random() * 0.1, 1.0, 0.5); 
        } 
        else if (type === 'heart') {
            const t = Math.random() * Math.PI * 2;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            z = (Math.random() - 0.5) * 5; 
            x *= 0.5; y *= 0.5;
            colorObj.setHSL(0.95 + Math.random() * 0.1, 1.0, 0.4); 
        }
        else if (type === 'saturn') {
            if (Math.random() > 0.3) {
                const r = 6;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                x = r * Math.sin(phi) * Math.cos(theta);
                y = r * Math.sin(phi) * Math.sin(theta);
                z = r * Math.cos(phi);
                colorObj.setHSL(0.1, 0.8, 0.5); 
            } else {
                const r = 8 + Math.random() * 6;
                const theta = Math.random() * Math.PI * 2;
                x = r * Math.cos(theta);
                z = r * Math.sin(theta);
                y = (Math.random() - 0.5) * 0.5;
                const tilt = Math.PI / 6;
                const yNew = y * Math.cos(tilt) - z * Math.sin(tilt);
                const zNew = y * Math.sin(tilt) + z * Math.cos(tilt);
                y = yNew; z = zNew;
                colorObj.setHSL(0.15, 0.6, 0.7); 
            }
        }
        else if (type === 'flower') {
            const spread = 0.5;
            const angle = 137.5 * (Math.PI / 180);
            const r = spread * Math.sqrt(i);
            const theta = i * angle;
            x = r * Math.cos(theta);
            y = r * Math.sin(theta);
            z = (Math.sin(r * 0.5) * 2);
            colorObj.setHSL((i % 100) / 100, 1.0, 0.5); 
        }
        else if (type === 'torus') {
            const R = 10;
            const r = 3;
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            x = (R + r * Math.cos(v)) * Math.cos(u);
            y = (R + r * Math.cos(v)) * Math.sin(u);
            z = r * Math.sin(v);
            colorObj.setHSL(0.5, 0.8, 0.5);
        }

        targetPositions[i * 3] = x;
        targetPositions[i * 3 + 1] = y;
        targetPositions[i * 3 + 2] = z;
        colors[i * 3] = colorObj.r;
        colors[i * 3 + 1] = colorObj.g;
        colors[i * 3 + 2] = colorObj.b;
    }
    
    geometry.attributes.color.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);

    const positionAttribute = geometry.attributes.position;
    const positionsArray = positionAttribute.array;

    // --- RESPONSIVE HAND MAPPING ---
    // Mobile needs different sensitivity because aspect ratio is inverted
    let sensitivityX = -40;
    let sensitivityY = -30;
    
    if (isMobile) {
        sensitivityX = -25; // Less horizontal range on mobile
        sensitivityY = -35; // More vertical range on mobile
    }

    const handX = (handPosition.x - 0.5) * sensitivityX;
    const handY = (handPosition.y - 0.5) * sensitivityY;
    
    // Shift hand INTERACTION UP on mobile to match the visual particle shift
    let visualYOffset = 0;
    if (isMobile) visualYOffset = 5; 

    const handVec = new THREE.Vector3(handX, handY + visualYOffset, 0);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        let px = positionsArray[ix];
        let py = positionsArray[iy];
        let pz = positionsArray[iz];

        let tx = targetPositions[ix];
        let ty = targetPositions[iy];
        let tz = targetPositions[iz];

        // Slower animation speed on mobile for smoothness
        const timeFactor = isMobile ? 0.005 : 0.01;
        const speed = 0.03 + (Math.sin(i + performance.now() * 0.001) * timeFactor);
        
        px += (tx - px) * speed;
        py += (ty - py) * speed;
        pz += (tz - pz) * speed;

        if (isHandDetected) {
            const dx = px - handVec.x;
            const dy = py - handVec.y;
            const dz = pz - handVec.z;
            const distSq = dx*dx + dy*dy + dz*dz;
            const dist = Math.sqrt(distSq);

            // Interaction Radius
            if (dist < 15) {
                if (gestureMode === 'repel') {
                    const force = (15 - dist) * 0.5;
                    px += (dx / dist) * force;
                    py += (dy / dist) * force;
                    pz += (dz / dist) * force;
                } else if (gestureMode === 'attract') {
                    const force = (15 - dist) * 0.05;
                    px -= (dx / dist) * force;
                    py -= (dy / dist) * force;
                    pz -= (dz / dist) * force;
                }
            }
        }

        positionsArray[ix] = px;
        positionsArray[iy] = py;
        positionsArray[iz] = pz;
    }

    positionAttribute.needsUpdate = true;
    particles.rotation.y += 0.002;
    particles.rotation.z += 0.001;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Shift Particles UP on Mobile (so they are visible above bottom panel)
    if (window.innerWidth < 768) {
        if(particles) particles.position.y = 5;
    } else {
        if(particles) particles.position.y = 0;
    }
}

function initMediaPipe() {
    const videoElement = document.getElementById('input_video');
    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: isMobile ? 0 : 1, // Lite model for mobile (Faster)
        minDetectionConfidence: 0.5, // Lower confidence needed for mobile
        minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);

    const cameraUtils = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({image: videoElement});
        },
        width: isMobile ? 480 : 640,  // Lower resolution processing on mobile
        height: isMobile ? 360 : 480,
        facingMode: 'user' // Force front camera
    });
    
    cameraUtils.start().catch(e => {
        console.warn("Camera failed to start:", e);
        updateStatusText("Error");
    });
}

function onResults(results) {
    if (!isCameraActive) {
        isCameraActive = true;
        updateStatusText("Active", true);
    }

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        isHandDetected = true;
        const landmarks = results.multiHandLandmarks[0];
        
        // Use Index Finger Tip (8) or Middle of Palm (9)
        handPosition.set(landmarks[9].x, landmarks[9].y, 0);

        // Gesture Logic
        const isVictory = landmarks[8].y < landmarks[5].y && 
                          landmarks[12].y < landmarks[9].y && 
                          landmarks[16].y > landmarks[13].y && 
                          landmarks[20].y > landmarks[17].y;
        
        const dWristTip = Math.hypot(landmarks[8].x - landmarks[0].x, landmarks[8].y - landmarks[0].y);
        // Fist detection threshold adjusted slightly
        const isFist = dWristTip < (isMobile ? 0.15 : 0.2); 

        const now = Date.now();
        if (isVictory) {
            if (now - lastShapeSwitchTime > 2000) {
                currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
                generateShape(shapes[currentShapeIndex]);
                lastShapeSwitchTime = now;
                gestureMode = 'neutral';
            }
        } else if (isFist) {
            gestureMode = 'repel';
        } else {
            gestureMode = 'attract';
        }

    } else {
        isHandDetected = false;
    }
}