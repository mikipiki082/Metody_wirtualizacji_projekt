export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden mix-blend-screen"
    >
      <div className="backdrop-layer parallax-slow bottom-0 h-[70vh] bg-[url(/bg/gory-daleko.webp)] opacity-70" />
      <div className="backdrop-layer parallax-drift top-[30vh] h-[50vh] bg-[url(/bg/mgla-pasy.webp)] opacity-60" />
      <div className="backdrop-layer parallax-fast -bottom-[10vh] h-[60vh] bg-[url(/bg/gory-blisko.webp)] opacity-50" />
      <div className="backdrop-layer bottom-0 h-[40vh] bg-[url(/bg/mgla-dol.webp)] opacity-70" />
    </div>
  );
}
