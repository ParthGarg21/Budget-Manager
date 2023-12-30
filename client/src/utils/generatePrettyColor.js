const generatePrettyColor = () => {
  const hue = Math.random() * 360;
  const saturation = 0.4 + Math.random() * 0.4;
  const lightness = 0.2 + Math.random() * 0.4; // Adjusted for darker colors
  return `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
};

export default generatePrettyColor;