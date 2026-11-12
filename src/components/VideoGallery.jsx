import { useEffect, useRef, useState } from 'react';
import { videoTestimonials } from '../data.js';

// Grid of reel-style video cards. Clicking a card opens a full-screen player.
export default function VideoGallery({ videos = videoTestimonials }) {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div className="reels">
        {videos.map((v, i) => (
          <VideoCard key={v.id} video={v} onOpen={() => setOpen(i)} />
        ))}
      </div>
      {open !== null && (
        <VideoModal
          videos={videos}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

function VideoCard({ video, onOpen }) {
  const ref = useRef(null);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  // Silent preview on hover (desktop only), so phones don't download video until tapped.
  const start = () => {
    if (!canHover || !ref.current) return;
    ref.current.play().catch(() => {});
  };
  const stop = () => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
  };

  return (
    <button
      type="button"
      className="reel"
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      aria-label={`Play ${video.title}`}
    >
      <img className="reel__poster" src={video.poster} alt="" loading="lazy" />
      {canHover && (
        <video ref={ref} className="reel__preview" src={video.src} muted loop playsInline preload="none" />
      )}
      <span className="reel__shade" aria-hidden="true" />
      <span className="reel__top">
        <span className="reel__badge">
          <img src="/logo.png" alt="" />
          Rebirth
        </span>
        <span className="reel__live">Review</span>
      </span>
      <span className="reel__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
      </span>
      <span className="reel__caption">
        <strong>{video.title}</strong>
        <small>Tap to watch with sound</small>
      </span>
    </button>
  );
}

function VideoModal({ videos, index, onChange, onClose }) {
  const video = videos[index];
  const count = videos.length;
  const closeRef = useRef(null);

  const go = (i) => onChange((i + count) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="vmodal" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="vmodal__inner" onClick={(e) => e.stopPropagation()}>
        <video
          key={video.src}
          className="vmodal__video"
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
        />
        <div className="vmodal__bar">
          <span>
            <strong>{video.title}</strong>
            <small>{index + 1} / {count}</small>
          </span>
          <span className="vmodal__nav">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous video">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next video">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </span>
        </div>
      </div>
      <button ref={closeRef} type="button" className="vmodal__close" onClick={onClose} aria-label="Close video">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}
