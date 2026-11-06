"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { imageSrc } from "@/lib/api";
import { preloadImage } from "@/lib/preload";
import { stageStyle } from "@/lib/stage";
import type { ImageGeometry, VehicleType } from "@/types/vehicle";

const sceneSrc = "/scene/scena-szeroka.webp";
const fogSrc = "/scene/mgla-przod.webp";
const reflections = [
  "vs-refl vs-streak vs-l",
  "vs-refl vs-streak vs-r",
  "vs-refl vs-l",
  "vs-refl vs-r",
];

type Props = {
  type: VehicleType;
  imageUrl: string | null;
  geometry: ImageGeometry | null;
  alt: string;
  scene?: boolean;
  className?: string;
};

type Shot = {
  src: string;
  geometry: ImageGeometry | null;
};

export function VehicleStage({
  type,
  imageUrl,
  geometry,
  alt,
  scene = false,
  className,
}: Props) {
  const src = imageSrc(imageUrl);
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    if (!src) {
      return;
    }
    let active = true;
    const sources = scene ? [src, sceneSrc, fogSrc] : [src, fogSrc];
    Promise.all(sources.map(preloadImage)).then(([loaded]) => {
      if (active && loaded) {
        setShot({ src, geometry });
      }
    });
    return () => {
      active = false;
    };
  }, [src, geometry, scene]);

  return (
    <div className={cn("vehicle-stage aspect-video", className)}>
      {shot && (
        <>
          {scene && <img className="vs-scene" src={sceneSrc} alt="" />}

          {shot.geometry ? (
            <div
              className={cn("vs-vehicle", type)}
              style={stageStyle(shot.geometry, type)}
            >
              <div className="vs-shadow vs-ao-l" />
              <div className="vs-shadow vs-ao-r" />
              <div className="vs-shadow vs-contact vs-contact-l" />
              <div className="vs-shadow vs-contact vs-contact-r" />
              {reflections.map((name) => (
                <img
                  key={name}
                  className={name}
                  src={shot.src}
                  alt=""
                  decoding="sync"
                />
              ))}
              <img
                className="vs-main"
                src={shot.src}
                alt={alt}
                decoding="sync"
              />
            </div>
          ) : (
            <img className="vs-fallback" src={shot.src} alt={alt} />
          )}

          <div className="vs-fog">
            <img src={fogSrc} alt="" />
            <img src={fogSrc} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
