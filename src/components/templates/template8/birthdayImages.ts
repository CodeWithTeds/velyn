export type BirthdayCollageImages = {
  cakeIcon: string;
  cakeMain: string;
  main: string;
  stripTop: string;
  stripMiddle: string;
  stripBottom: string;
};

const defaultCakeIcon = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="none"/>
  <path d="M40 78c0-19 20-34 50-34s50 15 50 34v58H40V78z" fill="#ffd899" stroke="#111" stroke-width="7" stroke-linejoin="round"/>
  <path d="M40 82c18 14 26-10 41 2 15 12 26-12 42 0 10 8 15 4 17 0v28H40V82z" fill="#fff2d4" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
  <path d="M55 136h70" stroke="#d57949" stroke-width="7" stroke-linecap="round"/>
  <path d="M62 37v28M82 31v34M103 35v30M124 30v35" stroke="#ff4d85" stroke-width="9" stroke-linecap="round"/>
  <circle cx="62" cy="29" r="7" fill="#ffb000"/>
  <circle cx="82" cy="23" r="7" fill="#ffb000"/>
  <circle cx="103" cy="27" r="7" fill="#ffb000"/>
  <circle cx="124" cy="22" r="7" fill="#ffb000"/>
</svg>
`)}`;

const defaultCakeMain = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320">
  <rect width="420" height="320" fill="none"/>
  <ellipse cx="210" cy="222" rx="168" ry="58" fill="#efeadf" stroke="#111" stroke-width="8"/>
  <path d="M58 151c0-50 68-91 152-91s152 41 152 91v72c0 51-68 91-152 91S58 274 58 223v-72z" fill="#fff6e8" stroke="#111" stroke-width="8"/>
  <ellipse cx="210" cy="151" rx="152" ry="91" fill="#fffaf0" stroke="#111" stroke-width="8"/>
  <path d="M82 142c32 28 56-18 90 5 34 23 55-18 91 4 31 19 53 10 73-5" fill="none" stroke="#ffd0a3" stroke-width="26" stroke-linecap="round"/>
  <g fill="#d83c34" stroke="#111" stroke-width="5">
    <circle cx="132" cy="130" r="18"/>
    <circle cx="179" cy="112" r="18"/>
    <circle cx="230" cy="109" r="18"/>
    <circle cx="282" cy="126" r="18"/>
  </g>
  <path d="M286 49v78" stroke="#7b4a24" stroke-width="10" stroke-linecap="round"/>
  <path d="M286 21c19 31-20 34 0 64 28-27 26-49 0-64z" fill="#ffb22c" stroke="#111" stroke-width="5"/>
</svg>
`)}`;

export const defaultBirthdayImages: BirthdayCollageImages = {
  cakeIcon: defaultCakeIcon,
  cakeMain: defaultCakeMain,
  main: '/images/velyn.png',
  stripTop: '/images/test1.png',
  stripMiddle: '/images/test3.png',
  stripBottom: '/images/test2.png',
};
