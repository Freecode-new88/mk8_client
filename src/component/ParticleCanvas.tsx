import React, { useRef, useEffect } from "react";
import p5 from "p5";

const ParticleCanvas: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let particles: Particle[] = [];
        let sketch: p5;
        let bg: p5.Image | null = null;

        class Particle {
            p: p5;
            x: number;
            y: number;
            size: number;
            speed: number;
            alpha: number;
            c: p5.Color;

            constructor(p: p5, x: number, y: number) {
                this.p = p;
                this.x = x;
                this.y = y;
                this.size = p.random(2, 15);
                this.speed = p.random(0.5, 2);
                this.alpha = 255;
                this.c = p.color(
                    p.random([255, 255, 200]),
                    p.random(120, 180),
                    p.random(0, 50),
                    this.alpha
                );
            }
            update() {
                this.y -= this.speed;
                this.alpha -= 2;
            }
            finished() {
                return this.alpha < 0;
            }
            // show() {
            //     const r = this.p.red(this.c);
            //     const g = this.p.green(this.c);
            //     const b = this.p.blue(this.c);

            //     this.p.fill(r, g, b, this.alpha);
            //     this.p.noStroke();
            //     this.p.ellipse(this.x, this.y, this.size);
            // }
        }

        const sketchFn = (p: p5) => {
            p.setup = async () => {
                p.createCanvas(p.windowWidth, p.windowHeight).parent(containerRef.current!);
                p.noStroke();
                bg = await p.loadImage("/images/0H6A8283-1.webp");
            };

            p.draw = () => {
                p.clear(); // transparent background
                 if (bg) {
                    const isMobile = p.width < 768;
                    if (!isMobile) {
                        const scale = p.width / bg.width;
                        const newW = p.width;
                        const newH = bg.height * scale;
                        p.image(bg, 0, 0, newW, newH);
                    }
                }
                if (p.frameCount % 3 === 0) {
                    particles.push(new Particle(p, p.random(p.width), p.height + 10));
                }
                for (let i = particles.length - 1; i >= 0; i--) {
                    const pt = particles[i];
                    pt.update();
                    // pt.show();
                    if (pt.finished()) {
                        particles.splice(i, 1);
                    }
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };

        sketch = new p5(sketchFn);

        return () => {
            sketch.remove(); // cleanup
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default ParticleCanvas;
