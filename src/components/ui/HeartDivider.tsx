export default function HeartDivider() {
  return (
    <div className="flex justify-center items-center py-8 bg-white gap-0" aria-hidden="true">
      <svg width="340" height="36" viewBox="0 0 340 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left ECG run */}
        <polyline
          points="0,18 42,18 48,12 54,24 60,6 66,30 72,18 100,18"
          stroke="#DDE3EE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central heart + lungs glyph */}
        {/* Trachea */}
        <line x1="170" y1="4" x2="170" y2="10" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
        {/* Left bronchus */}
        <line x1="170" y1="10" x2="163" y2="14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Right bronchus */}
        <line x1="170" y1="10" x2="177" y2="14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Left lung lobe */}
        <path d="M163,14 C158,13 150,15 147,20 C144,25 145,31 149,33 C153,35 158,33 160,30 C162,27 162,20 162,14 Z"
          stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        {/* Right lung lobe */}
        <path d="M177,14 C182,13 190,15 193,20 C196,25 195,31 191,33 C187,35 182,33 180,30 C178,27 178,20 178,14 Z"
          stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        {/* Heart */}
        <path d="M170,21 C167,17 160,18 160,22 C160,26 170,32 170,32 C170,32 180,26 180,22 C180,18 173,17 170,21 Z"
          stroke="#C9A84C" strokeWidth="1.5" fill="none"/>

        {/* Right ECG run */}
        <polyline
          points="240,18 268,18 274,12 280,24 286,6 292,30 298,18 340,18"
          stroke="#DDE3EE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
