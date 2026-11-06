"""Mierzy punkty styku kół na wyciętym zdjęciu pojazdu (PNG/WEBP z przezroczystym tłem).

Użycie: python3 scripts/vehicle_geometry.py backend/seed-images/*.webp
Wynik (JSON na stdout): dla każdego pliku szerokość, wysokość i punkty styku
lewego (xl, yl) oraz prawego (xr, yr) koła w pikselach obrazka.
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def lowest_pixels(alpha):
    rows = np.arange(alpha.shape[0])[:, None]
    opaque = alpha > 128
    return np.where(opaque.any(axis=0), (rows * opaque).max(axis=0), -1)


def tire_runs(low, width):
    runs = []
    x = 0
    while x < width:
        if low[x] < 0:
            x += 1
            continue
        y = low[x]
        end = x
        while end + 1 < width and low[end + 1] >= 0 and abs(low[end + 1] - y) <= 4:
            end += 1
        if end - x >= 40:
            bottom = int(low[x : end + 1].max())
            after = [v for v in low[end + 1 : end + 70] if v >= 0]
            before = [v for v in low[max(0, x - 70) : x] if v >= 0]
            sharp_edge = (after and bottom - min(after) >= 25) or (
                before and bottom - min(before) >= 25
            )
            if sharp_edge:
                runs.append(((x + end) // 2, bottom))
        x = end + 1
    return runs


def measure(path):
    alpha = np.array(Image.open(path).convert("RGBA"))[:, :, 3]
    height, width = alpha.shape
    runs = tire_runs(lowest_pixels(alpha), width)
    if not runs:
        raise SystemExit(f"{path}: nie znaleziono kół")

    first = max(runs, key=lambda run: run[1])
    right = [run for run in runs if run[0] - first[0] > 0.2 * width]
    left = [run for run in runs if first[0] - run[0] > 0.2 * width]
    second = max(right or left, key=lambda run: run[1])
    (xl, yl), (xr, yr) = sorted([first, second])
    return {"w": width, "h": height, "xl": xl, "yl": yl, "xr": xr, "yr": yr}


if __name__ == "__main__":
    result = {Path(p).name: measure(p) for p in sys.argv[1:]}
    print(json.dumps(result, indent=2))
