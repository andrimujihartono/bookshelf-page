'use client'
import React, { useEffect, useRef, useState } from "react";
import "./BookshelfRoom.css";

// Master Data 10 Buku Wajib + Koleksi Pendukung (v1.0.0)
const BOOK_DATABASE = {
  kudasai: {
    tag: "Master Data #1",
    title: "Kudasai",
    author: "Brian Khrisna",
    quote:
      "“Kadang kita tidak benar-benar melupakan seseorang; kita hanya belajar berdamai dengan ruang kosong yang ia tinggalkan.”",
    synopsis:
      "Kisah tentang perjalanan pulang, penyesalan yang tertinggal di sudut kota, dan keberanian memaafkan diri sendiri sebelum melangkah lagi.",
  },
  "this-is-why": {
    tag: "Master Data #2",
    title: "This Is Why I Need You",
    author: "Brian Khrisna",
    quote:
      "“Di antara ribuan langkah yang terasa berat, kehadiranmu selalu menjadi alasan paling sederhana untuk tetap bertahan.”",
    synopsis:
      "Catatan hangat mengenai pertemuan dua manusia yang sama-sama pernah patah namun memilih saling menguatkan di tengah riuh kehidupan.",
  },
  "mie-ayam": {
    tag: "Master Data #3",
    title: "Seporsi Mie Ayam Sebelum Mati",
    author: "Brian Khrisna",
    quote:
      "“Hal-hal kecil yang hangat sering kali menyelamatkan kita tepat di detik ketika dunia terasa terlalu dingin.”",
    synopsis:
      "Sebuah cerita menyentuh tentang Ale yang menemukan kembali arti hidup dari semangkuk mie ayam sederhana dan percakapan tak terduga.",
  },
  "angsa-kelelawar": {
    tag: "Master Data #4",
    title: "Angsa dan Kelelawar",
    author: "Keigo Higashino",
    quote:
      "“Kebenaran tidak selalu berdiri di sisi cahaya; terkadang ia bersembunyi di antara bayangan masa lalu yang sengaja dikubur.”",
    synopsis:
      "Misteri pembunuhan yang mempertemukan putra pelaku dan putri korban dalam pencarian kebenaran yang mengoyak batas hitam dan putih.",
  },
  malice: {
    tag: "Master Data #5",
    title: "Malice",
    author: "Keigo Higashino",
    quote:
      "“Bukan tentang siapa yang melakukannya, melainkan mengapa kebencian bisa tumbuh begitu sunyi namun mematikan.”",
    synopsis:
      "Detektif Kyoichiro Kaga menelusuri motif tersembunyi di balik kematian seorang novelis ternama melalui catatan harian dan kesaksian sahabatnya.",
  },
  namiya: {
    tag: "Master Data #6",
    title: "Keajaiban Toko Kelontong Namiya",
    author: "Keigo Higashino",
    quote:
      "“Setiap surat yang datang membawa kebingungan, namun di dalam hati si pengirim sebenarnya sudah tersimpan benih jawabannya.”",
    synopsis:
      "Tiga pemuda bersembunyi di toko kelontong tua yang ternyata terhubung lintas waktu melalui surat-surat konsultasi kehidupan dari masa lalu.",
  },
  "suspect-x": {
    tag: "Master Data #7",
    title: "The Devotion of Suspect X",
    author: "Keigo Higashino",
    quote:
      "“Terkadang memikirkan cara melindungi seseorang jauh lebih rumit daripada memecahkan persamaan matematika tersulit sekalipun.”",
    synopsis:
      "Duel kecerdasan antara seorang jenius matematika yang merancang alibi sempurna demi tetangganya dan fisikawan Manabu Yukawa.",
  },
  "cantik-itu-luka": {
    tag: "Master Data #8",
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    quote:
      "“Di negeri yang penuh luka sejarah, kecantikan bisa berubah menjadi kutukan sekaligus perlawanan paling sunyi.”",
    synopsis:
      "Epik realisme magis tentang Dewi Ayu dan keempat putrinya yang terjalin erat dengan sejarah kelam kolonialisme dan kemerdekaan Indonesia.",
  },
  kata: {
    tag: "Master Data #9",
    title: "Kata",
    author: "Rintik Sedu (Tsana)",
    quote:
      "“Ada perasaan yang tidak perlu diteriakkan; cukup dituliskan agar kelak ia menemukan rumahnya sendiri.”",
    synopsis:
      "Kisah Binta, Nugraha, dan Biru tentang masa lalu yang belum selesai, jarak, serta keberanian mengucapkan kata yang tertahan.",
  },
  "norwegian-wood": {
    tag: "Master Data #10",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    quote:
      "“Kematian bukanlah lawan dari kehidupan, melainkan bagian yang selalu hadir diam-diam di dalamnya.”",
    synopsis:
      "Kenangan melankolis Toru Watanabe di Tokyo akhir 1960-an tentang cinta pertama, kehilangan, dan proses tumbuh dewasa.",
  },
  "stories-ted-chiang": {
    tag: "Koleksi Fiksi Ilmiah",
    title: "Stories of Your Life and Others",
    author: "Ted Chiang",
    quote:
      "“Ketika bahasa mengubah cara kita memandang waktu, setiap kenangan menjadi sesuatu yang hidup di masa kini.”",
    synopsis:
      "Antologi fiksi ilmiah filosofis tentang bahasa, ingatan, dan pilihan hidup.",
  },
  "tao-te-ching": {
    tag: "Klasik Filosofi",
    title: "Tao Te Ching",
    author: "Laozi",
    quote:
      "“Perjalanan seribu mil selalu dimulai dari satu langkah kecil yang tenang.”",
    synopsis:
      "Kumpulan kebijaksanaan klasik tentang keselarasan alam, ketenangan batin, dan kesederhanaan.",
  },
};

const FALLBACK_INFO = {
  tag: "Koleksi Rak Buku",
  author: "Koleksi Pribadi",
  quote:
    "“Membaca adalah cara paling tenang untuk bepergian ke dunia lain tanpa meninggalkan kursi favoritmu.”",
  synopsis:
    "Salah satu koleksi bacaan pilihan yang tersusun rapi di rak kayu untuk menemani waktu santai dan alunan musik lo-fi.",
};

const CHORDS = [
  [174.61, 220.0, 261.63, 329.63],
  [164.81, 196.0, 246.94, 293.66],
  [146.83, 174.61, 220.0, 261.63],
  [130.81, 164.81, 196.0, 246.94],
];

export default function BookshelfRoom() {
  const [nightMode, setNightMode] = useState(false);
  const [lofiPlaying, setLofiPlaying] = useState(false);
  const [rainPlaying, setRainPlaying] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const rafRef = useRef(null);

  const audioCtxRef = useRef(null);
  const beatTimerRef = useRef(null);
  const rainNodeRef = useRef(null);
  const stepRef = useRef(0);

  // Sinkronkan class night-mode pada <body>
  useEffect(() => {
    document.body.classList.toggle("night-mode", nightMode);
    return () => {
      document.body.classList.remove("night-mode");
    };
  }, [nightMode]);

  // Jam Analog Realtime dengan cleanup requestAnimationFrame
  useEffect(() => {
    const tickClock = () => {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      if (hourRef.current) {
        hourRef.current.setAttribute("transform", `rotate(${hr * 30} 30 36)`);
      }
      if (minuteRef.current) {
        minuteRef.current.setAttribute("transform", `rotate(${min * 6} 30 36)`);
      }
      if (secondRef.current) {
        secondRef.current.setAttribute("transform", `rotate(${sec * 6} 30 36)`);
      }

      rafRef.current = requestAnimationFrame(tickClock);
    };

    rafRef.current = requestAnimationFrame(tickClock);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cleanup timer & AudioContext saat komponen unmount
  useEffect(() => {
    return () => {
      clearInterval(beatTimerRef.current);
      if (rainNodeRef.current) {
        try {
          rainNodeRef.current.stop();
        } catch (_) {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playChord = (ctx, freqs, duration) => {
    const now = ctx.currentTime;
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(780, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.032, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  };

  const playSoftKick = (ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.16);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);
  };

  const playSoftSnare = (ctx) => {
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1350;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  };

  const handleToggleLofi = () => {
    if (!lofiPlaying) {
      const ctx = ensureAudioContext();
      setLofiPlaying(true);
      stepRef.current = 0;
      const stepMs = (60 / 74 / 2) * 1000;

      const tick = () => {
        const barStep = stepRef.current % 8;
        if (barStep === 0) {
          const chordIdx = Math.floor(stepRef.current / 8) % CHORDS.length;
          playChord(ctx, CHORDS[chordIdx], (stepMs * 8) / 1000);
          playSoftKick(ctx);
        } else if (barStep === 3) {
          playSoftKick(ctx);
        } else if (barStep === 4 || barStep === 6) {
          playSoftSnare(ctx);
        }
        stepRef.current += 1;
      };

      tick();
      clearInterval(beatTimerRef.current);
      beatTimerRef.current = setInterval(tick, stepMs);
    } else {
      clearInterval(beatTimerRef.current);
      setLofiPlaying(false);
    }
  };

  const handleToggleRain = () => {
    if (!rainPlaying) {
      const ctx = ensureAudioContext();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 650;

      const gain = ctx.createGain();
      gain.gain.value = 0.035;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      rainNodeRef.current = source;
      setRainPlaying(true);
    } else {
      if (rainNodeRef.current) {
        try {
          rainNodeRef.current.stop();
        } catch (_) {}
        rainNodeRef.current = null;
      }
      setRainPlaying(false);
    }
  };

  const handleOpenBook = (bookId, fallbackTitle = "Koleksi Buku") => {
    const info = BOOK_DATABASE[bookId] || {
      ...FALLBACK_INFO,
      title: fallbackTitle,
    };
    setActiveBook(info);
  };

  const handleRandomBook = () => {
    const keys = Object.keys(BOOK_DATABASE);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    handleOpenBook(randomKey);
  };

  return (
    <div className="bookshelf-page-wrapper">
      <main className="room-stage">
        <div className="scene-assembly">
          <div className="floor-pot-plant" aria-hidden="true">
            <svg
              className="sway-plant"
              viewBox="0 0 140 240"
              width="100%"
              height="100%"
              style={{ zIndex: 3 }}
            >
              <path
                d="M70 155 C45 120, 15 108, 6 122 C24 128, 48 138, 67 162 Z"
                fill="#2d5a3c"
              />
              <path
                d="M68 152 C38 100, 14 74, 18 56 C36 74, 54 106, 70 148 Z"
                fill="#3a724d"
              />
              <path
                d="M70 150 C58 92, 52 44, 66 24 C74 52, 74 96, 72 148 Z"
                fill="#46855b"
              />
              <path
                d="M72 150 C88 94, 108 56, 124 46 C116 74, 96 108, 74 150 Z"
                fill="#346645"
              />
              <path
                d="M73 156 C98 122, 122 108, 135 118 C118 126, 94 138, 74 162 Z"
                fill="#274e34"
              />
              <path
                d="M69 150 Q42 98 20 62"
                stroke="#6aa87e"
                strokeWidth="1.3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M71 148 Q64 86 66 30"
                stroke="#6aa87e"
                strokeWidth="1.3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M73 150 Q98 96 120 52"
                stroke="#6aa87e"
                strokeWidth="1.3"
                fill="none"
                opacity="0.6"
              />
              <ellipse cx="70" cy="160" rx="34" ry="6" fill="#2b1b12" />
              <defs>
                <linearGradient
                  id="terracottaGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8c4125" />
                  <stop offset="32%" stopColor="#c86843" />
                  <stop offset="72%" stopColor="#a84e2d" />
                  <stop offset="100%" stopColor="#6e3019" />
                </linearGradient>
              </defs>
              <rect
                x="30"
                y="156"
                width="80"
                height="12"
                rx="4"
                fill="url(#terracottaGrad)"
              />
              <line
                x1="32"
                y1="168"
                x2="108"
                y2="168"
                stroke="#4d2010"
                strokeWidth="2"
                opacity="0.55"
              />
              <polygon
                points="35,168 105,168 95,232 45,232"
                fill="url(#terracottaGrad)"
              />
              <rect x="41" y="229" width="58" height="6" rx="3" fill="#7c371e" />
            </svg>
            <div className="pot-contact-shadow" />
            <div className="pot-floor-reflection" />
          </div>

          <section className="bookcase" aria-label="Rak Buku Estetis">
            <div className="bookcase-crown" />

            <svg className="ivy-vine-left" viewBox="0 0 80 170" aria-hidden="true">
              <path
                d="M18 0 Q10 45 24 85 T16 162"
                stroke="#2c593b"
                strokeWidth="2.2"
                fill="none"
              />
              <ellipse cx="12" cy="24" rx="7" ry="4" transform="rotate(-25 12 24)" fill="#3b754e" />
              <ellipse cx="26" cy="48" rx="7" ry="4" transform="rotate(25 26 48)" fill="#2d5c3d" />
              <ellipse cx="14" cy="78" rx="8" ry="4.5" transform="rotate(-20 14 78)" fill="#45875b" />
              <ellipse cx="27" cy="108" rx="7" ry="4" transform="rotate(22 27 108)" fill="#356946" />
              <ellipse cx="14" cy="138" rx="7" ry="4" transform="rotate(-18 14 138)" fill="#2b5739" />
            </svg>

            <svg className="ivy-vine-right" viewBox="0 0 110 190" aria-hidden="true">
              <path
                d="M88 0 Q96 52 76 98 T84 182"
                stroke="#2c593b"
                strokeWidth="2.2"
                fill="none"
              />
              <path
                d="M84 18 Q55 24 34 14"
                stroke="#2c593b"
                strokeWidth="1.8"
                fill="none"
              />
              <ellipse cx="42" cy="16" rx="7" ry="4" transform="rotate(-15 42 16)" fill="#45875b" />
              <ellipse cx="64" cy="21" rx="7" ry="4" transform="rotate(12 64 21)" fill="#356946" />
              <ellipse cx="94" cy="42" rx="8" ry="4.5" transform="rotate(25 94 42)" fill="#3b754e" />
              <ellipse cx="74" cy="76" rx="7" ry="4" transform="rotate(-25 74 76)" fill="#2d5c3d" />
              <ellipse cx="88" cy="118" rx="8" ry="4.5" transform="rotate(20 88 118)" fill="#45875b" />
              <ellipse cx="74" cy="154" rx="7" ry="4" transform="rotate(-22 74 154)" fill="#2b5739" />
            </svg>

            {/* RAK 1 */}
            <div className="shelf-tier">
              <div className="shelf-decor sway-plant" style={{ marginLeft: 14 }}>
                <svg width="78" height="86" viewBox="0 0 90 96">
                  <path d="M45 58 C24 38, 8 34, 2 44 C18 46, 32 52, 43 62 Z" fill="#356b47" />
                  <path d="M45 56 C32 24, 24 8, 34 2 C42 18, 44 38, 46 56 Z" fill="#46875c" />
                  <path d="M47 56 C62 26, 76 12, 86 18 C76 34, 60 46, 48 58 Z" fill="#2e5e3e" />
                  <rect x="22" y="58" width="46" height="8" rx="3" fill="#c4633e" />
                  <polygon points="26,66 64,66 58,94 32,94" fill="#a84e2d" />
                </svg>
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("kudasai", "Kudasai")}
                  style={{
                    "--h": "88px",
                    "--w": "24px",
                    "--bg": "linear-gradient(180deg,#1d3557 0%,#2b4c7e 100%)",
                    "--tc": "#f7ede2",
                    "--band": "#e07a5f",
                  }}
                >
                  <span className="book-title">Kudasai</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("this-is-why", "This Is Why I Need You")
                  }
                  style={{
                    "--h": "92px",
                    "--w": "25px",
                    "--bg": "linear-gradient(180deg,#264653 0%,#e76f51 100%)",
                    "--tc": "#fffaf2",
                    "--band": "#f4a261",
                  }}
                >
                  <span className="book-title">This Is Why I Need You</span>
                </button>
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook("norwegian-wood", "Norwegian Wood")
                  }
                  style={{
                    "--h": "86px",
                    "--w": "23px",
                    "--bg": "linear-gradient(180deg,#b52b27 0%,#236b43 100%)",
                    "--tc": "#fff8ee",
                    "--band": "#f6e8d5",
                  }}
                >
                  <span className="book-title">Norwegian Wood</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("kata", "Kata — Tsana")}
                  style={{
                    "--h": "84px",
                    "--w": "22px",
                    "--bg": "linear-gradient(180deg,#6d8ea0 0%,#9bb1bd 100%)",
                    "--tc": "#1f2d36",
                    "--band": "#f4efe6",
                  }}
                >
                  <span className="book-title">Kata — Tsana</span>
                </button>
                <button
                  type="button"
                  className="book leaning"
                  onClick={() =>
                    handleOpenBook(
                      "stories-ted-chiang",
                      "Stories of Your Life"
                    )
                  }
                  style={{
                    "--h": "90px",
                    "--w": "23px",
                    "--bg": "linear-gradient(180deg,#1b2c4e 0%,#4b79a1 58%,#d9e7f2 100%)",
                    "--tc": "#ffffff",
                    "--band": "#90bce0",
                  }}
                >
                  <span className="book-title">Stories of Your Life</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />

            {/* RAK 2 */}
            <div className="shelf-tier">
              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("namiya", "Toko Kelontong Namiya")
                  }
                  style={{
                    "--h": "90px",
                    "--w": "25px",
                    "--bg": "linear-gradient(180deg,#182848 0%,#2c4875 68%,#e6b85c 100%)",
                    "--tc": "#fff6dc",
                    "--band": "#f3c86b",
                  }}
                >
                  <span className="book-title">Toko Kelontong Namiya</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("suspect-x", "Devotion of Suspect X")
                  }
                  style={{
                    "--h": "92px",
                    "--w": "24px",
                    "--bg": "linear-gradient(180deg,#17171a 0%,#2b1216 65%,#9e1b24 100%)",
                    "--tc": "#f7f3f0",
                    "--band": "#d62828",
                  }}
                >
                  <span className="book-title">Devotion of Suspect X</span>
                </button>
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook("classic-olive", "Catatan Hujan")
                  }
                  style={{
                    "--h": "84px",
                    "--w": "20px",
                    "--bg": "#6b8068",
                    "--tc": "#f7f3e8",
                    "--band": "#d8cbb4",
                  }}
                >
                  <span className="book-title">Catatan Hujan</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-navy", "Senja di Pelabuhan")
                  }
                  style={{
                    "--h": "88px",
                    "--w": "21px",
                    "--bg": "#33475b",
                    "--tc": "#f5efe4",
                    "--band": "#d4a373",
                  }}
                >
                  <span className="book-title">Senja di Pelabuhan</span>
                </button>
              </div>

              <div className="shelf-decor" style={{ margin: "0 6px" }}>
                <svg width="46" height="54" viewBox="0 0 52 60">
                  <rect
                    x="4"
                    y="4"
                    width="44"
                    height="52"
                    rx="3"
                    fill="#9c4a32"
                    stroke="#4a2316"
                    strokeWidth="2"
                  />
                  <rect x="10" y="10" width="32" height="40" fill="#e9dec8" />
                  <circle cx="32" cy="20" r="4" fill="#d98a4e" />
                  <polygon points="10,48 24,30 36,48" fill="#4f795c" />
                  <polygon points="22,48 34,34 42,48" fill="#365942" />
                </svg>
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() => handleOpenBook("tao-te-ching", "Tao Te Ching")}
                  style={{
                    "--h": "88px",
                    "--w": "22px",
                    "--bg": "linear-gradient(180deg,#c9ab72 0%,#b59457 100%)",
                    "--tc": "#2a1d11",
                    "--band": "#5c4228",
                  }}
                >
                  <span className="book-title">Tao Te Ching</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-plum", "Antologi Puisi")
                  }
                  style={{
                    "--h": "85px",
                    "--w": "21px",
                    "--bg": "#7d4455",
                    "--tc": "#faefe8",
                    "--band": "#e5b89b",
                  }}
                >
                  <span className="book-title">Antologi Puisi</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-terracotta", "Surat dari Timur")
                  }
                  style={{
                    "--h": "89px",
                    "--w": "22px",
                    "--bg": "#b85a3a",
                    "--tc": "#fff7ed",
                    "--band": "#f3d5b5",
                  }}
                >
                  <span className="book-title">Surat dari Timur</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />

            {/* RAK 3 */}
            <div className="shelf-tier">
              <div className="book-cluster">
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook(
                      "mie-ayam",
                      "Seporsi Mie Ayam Sebelum Mati"
                    )
                  }
                  style={{
                    "--h": "89px",
                    "--w": "25px",
                    "--bg": "linear-gradient(180deg,#f5ead6 0%,#e8d3b3 100%)",
                    "--tc": "#3d2516",
                    "--band": "#c94a38",
                  }}
                >
                  <span className="book-title">Seporsi Mie Ayam Sebelum Mati</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-ochre", "Filosofi Kopi")
                  }
                  style={{
                    "--h": "85px",
                    "--w": "21px",
                    "--bg": "#c88d43",
                    "--tc": "#2b1c0e",
                    "--band": "#fff3dc",
                  }}
                >
                  <span className="book-title">Filosofi Kopi</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-slate", "Laut Bercerita")
                  }
                  style={{
                    "--h": "87px",
                    "--w": "21px",
                    "--bg": "#475b63",
                    "--tc": "#f4f1ea",
                    "--band": "#d9ae7e",
                  }}
                >
                  <span className="book-title">Laut Bercerita</span>
                </button>
              </div>

              <div className="shelf-decor sway-plant">
                <svg width="46" height="68" viewBox="0 0 54 78">
                  <path d="M27 46 C14 30, 8 18, 14 10 C22 20, 25 34, 27 46 Z" fill="#3a724d" />
                  <path d="M27 45 C25 24, 26 10, 32 4 C35 18, 32 32, 28 45 Z" fill="#4c8c62" />
                  <path d="M28 46 C38 30, 46 20, 44 12 C36 22, 31 34, 28 46 Z" fill="#2d5a3c" />
                  <rect x="13" y="46" width="28" height="6" rx="2" fill="#c4633e" />
                  <polygon points="16,52 38,52 34,76 20,76" fill="#a84e2d" />
                </svg>
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("angsa-kelelawar", "Angsa dan Kelelawar")
                  }
                  style={{
                    "--h": "91px",
                    "--w": "25px",
                    "--bg": "linear-gradient(180deg,#f2efe9 0%,#7e848c 50%,#1d2024 100%)",
                    "--tc": "#ffffff",
                    "--band": "#c83e37",
                  }}
                >
                  <span className="book-title">Angsa dan Kelelawar</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("malice", "Malice — Keigo H")}
                  style={{
                    "--h": "89px",
                    "--w": "24px",
                    "--bg": "linear-gradient(180deg,#18191c 0%,#2f3238 100%)",
                    "--tc": "#f5f2ed",
                    "--band": "#d62828",
                  }}
                >
                  <span className="book-title">Malice — Keigo H</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("classic-teal", "Pulang")}
                  style={{
                    "--h": "85px",
                    "--w": "21px",
                    "--bg": "#366866",
                    "--tc": "#f7f2e7",
                    "--band": "#e0c097",
                  }}
                >
                  <span className="book-title">Pulang</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />

            {/* RAK 4 (KHUSUS TUMPUKAN BUKU NATURAL) */}
            <div className="shelf-tier">
              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-indigo", "Bumi Manusia")
                  }
                  style={{
                    "--h": "86px",
                    "--w": "21px",
                    "--bg": "#3b4d71",
                    "--tc": "#f7f2e7",
                    "--band": "#d9b08c",
                  }}
                >
                  <span className="book-title">Bumi Manusia</span>
                </button>
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook("classic-sand", "Perahu Kertas")
                  }
                  style={{
                    "--h": "82px",
                    "--w": "20px",
                    "--bg": "#d8c3a5",
                    "--tc": "#2f2218",
                    "--band": "#8e5b3e",
                  }}
                >
                  <span className="book-title">Perahu Kertas</span>
                </button>
              </div>

              <div
                className="natural-stack-wrap"
                aria-label="Tumpukan Buku dan Kacamata"
              >
                <svg className="reading-glasses" viewBox="0 0 64 20">
                  <circle
                    cx="18"
                    cy="11"
                    r="7"
                    fill="rgba(255,255,255,0.22)"
                    stroke="#3a281c"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="46"
                    cy="11"
                    r="7"
                    fill="rgba(255,255,255,0.22)"
                    stroke="#3a281c"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M25 10 Q32 7 39 10"
                    stroke="#3a281c"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M11 10 L4 7"
                    stroke="#3a281c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M53 10 L60 7"
                    stroke="#3a281c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                {[
                  {
                    id: "stack-journal-1",
                    label: "Catatan Senja",
                    sh: "13px",
                    sw: "84px",
                    ox: "-3px",
                    scover: "#b85a3a",
                  },
                  {
                    id: "stack-journal-2",
                    label: "Kumpulan Cerpen",
                    sh: "15px",
                    sw: "96px",
                    ox: "4px",
                    scover: "#355c47",
                  },
                  {
                    id: "stack-journal-3",
                    label: "Jurnal Bacaan",
                    sh: "14px",
                    sw: "90px",
                    ox: "-2px",
                    scover: "#2d4363",
                  },
                  {
                    id: "stack-journal-4",
                    label: "Antologi Klasik",
                    sh: "16px",
                    sw: "104px",
                    ox: "1px",
                    scover: "#7b4453",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="stacked-book"
                    onClick={() => handleOpenBook(item.id, item.label)}
                    style={{
                      "--sh": item.sh,
                      "--sw": item.sw,
                      "--ox": item.ox,
                      "--scover": item.scover,
                    }}
                  >
                    <span className="stack-label">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-rust", "Negeri 5 Menara")
                  }
                  style={{
                    "--h": "87px",
                    "--w": "21px",
                    "--bg": "#a84b36",
                    "--tc": "#fff5ea",
                    "--band": "#f2cc8f",
                  }}
                >
                  <span className="book-title">Negeri 5 Menara</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("classic-sage", "Hujan")}
                  style={{
                    "--h": "83px",
                    "--w": "20px",
                    "--bg": "#5c7a67",
                    "--tc": "#f7f3e8",
                    "--band": "#e6ccb2",
                  }}
                >
                  <span className="book-title">Hujan</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />

            {/* RAK 5 */}
            <div className="shelf-tier">
              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("cantik-itu-luka", "Cantik Itu Luka")
                  }
                  style={{
                    "--h": "92px",
                    "--w": "25px",
                    "--bg": "linear-gradient(180deg,#1e4635 0%,#2d634b 100%)",
                    "--tc": "#fce8ec",
                    "--band": "#e5989b",
                  }}
                >
                  <span className="book-title">Cantik Itu Luka</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-cobalt", "Laskar Pelangi")
                  }
                  style={{
                    "--h": "86px",
                    "--w": "21px",
                    "--bg": "#2b4c6f",
                    "--tc": "#f7f2e7",
                    "--band": "#e09f3e",
                  }}
                >
                  <span className="book-title">Laskar Pelangi</span>
                </button>
              </div>

              <div className="shelf-decor sway-plant">
                <svg width="48" height="66" viewBox="0 0 54 74">
                  <path d="M27 44 C12 34, 6 22, 12 16 C20 22, 24 32, 27 44 Z" fill="#3a724d" />
                  <path d="M27 44 C26 24, 30 10, 36 8 C38 22, 32 34, 27 44 Z" fill="#498a5f" />
                  <path d="M27 44 C38 34, 48 26, 46 18 C38 24, 32 34, 27 44 Z" fill="#2d5a3c" />
                  <rect x="14" y="44" width="26" height="6" rx="2" fill="#c4633e" />
                  <polygon points="17,50 37,50 33,72 21,72" fill="#a84e2d" />
                </svg>
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book"
                  onClick={() => handleOpenBook("classic-charcoal", "Rindu")}
                  style={{
                    "--h": "88px",
                    "--w": "22px",
                    "--bg": "#2c353d",
                    "--tc": "#f7f2e7",
                    "--band": "#d4a373",
                  }}
                >
                  <span className="book-title">Rindu</span>
                </button>
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook("classic-cream", "Aroma Karsa")
                  }
                  style={{
                    "--h": "84px",
                    "--w": "20px",
                    "--bg": "#e6d7be",
                    "--tc": "#332419",
                    "--band": "#9c523b",
                  }}
                >
                  <span className="book-title">Aroma Karsa</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-amber", "Gadis Kretek")
                  }
                  style={{
                    "--h": "86px",
                    "--w": "21px",
                    "--bg": "#b87735",
                    "--tc": "#fff7eb",
                    "--band": "#4a2c16",
                  }}
                >
                  <span className="book-title">Gadis Kretek</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />

            {/* RAK 6 + JAM ANALOG REALTIME */}
            <div className="shelf-tier">
              <div
                className="shelf-decor"
                style={{ marginLeft: 16 }}
                title="Jam Meja Realtime"
              >
                <div className="analog-clock-wrap">
                  <svg viewBox="0 0 60 68" width="44" height="50">
                    <path
                      d="M18 56 L13 65 M42 56 L47 65"
                      stroke="#8a6228"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="30"
                      cy="7"
                      r="4"
                      fill="none"
                      stroke="#c8963e"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx="30"
                      cy="36"
                      r="23"
                      fill="url(#brassRim)"
                      stroke="#5c3e14"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="30"
                      cy="36"
                      r="18.5"
                      fill="#faf3e3"
                      stroke="#9e7432"
                      strokeWidth="1"
                    />
                    <defs>
                      <linearGradient
                        id="brassRim"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#e6be6a" />
                        <stop offset="50%" stopColor="#b5832c" />
                        <stop offset="100%" stopColor="#755015" />
                      </linearGradient>
                    </defs>
                    <line x1="30" y1="20" x2="30" y2="23" stroke="#3b2612" strokeWidth="1.6" />
                    <line x1="46" y1="36" x2="43" y2="36" stroke="#3b2612" strokeWidth="1.6" />
                    <line x1="30" y1="52" x2="30" y2="49" stroke="#3b2612" strokeWidth="1.6" />
                    <line x1="14" y1="36" x2="17" y2="36" stroke="#3b2612" strokeWidth="1.6" />
                    <line
                      ref={hourRef}
                      x1="30"
                      y1="36"
                      x2="30"
                      y2="26"
                      stroke="#2b1b0e"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <line
                      ref={minuteRef}
                      x1="30"
                      y1="36"
                      x2="30"
                      y2="22"
                      stroke="#2b1b0e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      ref={secondRef}
                      x1="30"
                      y1="39"
                      x2="30"
                      y2="20"
                      stroke="#c83e2b"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <circle cx="30" cy="36" r="2" fill="#2b1b0e" />
                  </svg>
                </div>
              </div>

              <div className="book-cluster">
                <button
                  type="button"
                  className="book leaning"
                  onClick={() =>
                    handleOpenBook("classic-ochre-2", "Sang Pemimpi")
                  }
                  style={{
                    "--h": "86px",
                    "--w": "21px",
                    "--bg": "#c98a3c",
                    "--tc": "#2b1c0e",
                    "--band": "#fff4e0",
                  }}
                >
                  <span className="book-title">Sang Pemimpi</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-sky", "Tentang Kamu")
                  }
                  style={{
                    "--h": "88px",
                    "--w": "22px",
                    "--bg": "#5a849c",
                    "--tc": "#f7f4ec",
                    "--band": "#e6ccb2",
                  }}
                >
                  <span className="book-title">Tentang Kamu</span>
                </button>
                <button
                  type="button"
                  className="book light-spine"
                  onClick={() =>
                    handleOpenBook("classic-ivory", "Sabtu Bersama Bapak")
                  }
                  style={{
                    "--h": "85px",
                    "--w": "21px",
                    "--bg": "#ede2ce",
                    "--tc": "#332418",
                    "--band": "#8c4a32",
                  }}
                >
                  <span className="book-title">Sabtu Bersama Bapak</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-burgundy", "Supernova")
                  }
                  style={{
                    "--h": "90px",
                    "--w": "23px",
                    "--bg": "#6e2c3b",
                    "--tc": "#faefe8",
                    "--band": "#e0b165",
                  }}
                >
                  <span className="book-title">Supernova</span>
                </button>
                <button
                  type="button"
                  className="book"
                  onClick={() =>
                    handleOpenBook("classic-forest", "Rectoverso")
                  }
                  style={{
                    "--h": "87px",
                    "--w": "22px",
                    "--bg": "#2e5240",
                    "--tc": "#f5efe4",
                    "--band": "#d4a373",
                  }}
                >
                  <span className="book-title">Rectoverso</span>
                </button>
              </div>
            </div>
            <div className="shelf-plank" />
            <div className="bookcase-plinth" />
          </section>
        </div>

        <div className="room-floor-area" aria-hidden="true">
          <div className="wall-baseboard" />
          <div className="wood-floor-plain">
            <div className="bookcase-floor-shadow" />
            <div className="bookcase-floor-reflection" />
          </div>
        </div>
      </main>

      <nav className="control-dock" aria-label="Kontrol Suasana">
        <button
          type="button"
          className={`dock-btn ${lofiPlaying ? "active" : ""}`}
          onClick={handleToggleLofi}
        >
          <span className="eq-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{lofiPlaying ? "Lo-Fi Aktif" : "Musik Lo-Fi"}</span>
        </button>



        <button
          type="button"
          className={`dock-btn ${nightMode ? "active" : ""}`}
          onClick={() => setNightMode((prev) => !prev)}
        >
          {nightMode ? "☀️ Mode Siang" : "🕯️ Mode Malam"}
        </button>

        <button type="button" className="dock-btn" onClick={handleRandomBook}>
          📖 Kutipan Acak
        </button>
      </nav>

      {activeBook && (
        <div
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveBook(null);
          }}
        >
          <div className="book-card">
            <span className="card-badge">{activeBook.tag}</span>
            <h2 id="modal-title" className="card-title">
              {activeBook.title}
            </h2>
            <p className="card-author">{activeBook.author}</p>
            <blockquote className="card-quote">{activeBook.quote}</blockquote>
            <p className="card-synopsis">{activeBook.synopsis}</p>
            <div className="card-actions">
              <button
                type="button"
                className="card-btn secondary"
                onClick={handleRandomBook}
              >
                Buku Lain
              </button>
              <button
                type="button"
                className="card-btn primary"
                onClick={() => setActiveBook(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}