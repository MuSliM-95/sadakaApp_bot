export const PlayerPlane = ({ className = "" }) => {
	return (
	  <svg
		viewBox="0 0 120 120"
		className={`w-16 h-16 ${className}`}
		xmlns="http://www.w3.org/2000/svg"
	  >
		<defs>
		  <linearGradient id="planeGradient" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stopColor="#ffffff" />
			<stop offset="100%" stopColor="#cfe9ff" />
		  </linearGradient>
  
		  <filter id="glow">
			<feGaussianBlur stdDeviation="4" result="coloredBlur" />
			<feMerge>
			  <feMergeNode in="coloredBlur" />
			  <feMergeNode in="SourceGraphic" />
			</feMerge>
		  </filter>
		</defs>
  
		{/* корпус */}
		<polygon
		  points="60,5 110,95 60,75 10,95"
		  fill="url(#planeGradient)"
		  filter="url(#glow)"
		/>
  
		{/* хвостовой свет */}
		<circle cx="60" cy="100" r="6" fill="#00f0ff" opacity="0.8" />
	  </svg>
	);
  };