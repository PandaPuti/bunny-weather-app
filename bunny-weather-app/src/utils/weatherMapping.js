export const getBunnyState = (condition) => {
  const mapping = {
    Clear: {
      state: "SUNNY",
      color: "#87CEEB", // Sky Blue
      action: "Hanging clothes on the line",
      bunnyMood: "happy"
    },
    Clouds: {
      state: "CLOUDY",
      color: "#B0C4DE", // Light Steel Blue
      action: "Looking at the sky doubtfully",
      bunnyMood: "worried"
    },
    Rain: {
      state: "RAINY",
      color: "#4B515D", // Dark Grey
      action: "Rushing clothes into the house",
      bunnyMood: "hurried"
    },
    Drizzle: {
      state: "RAINY",
      color: "#4B515D",
      action: "Rushing clothes into the house",
      bunnyMood: "hurried"
    },
    Thunderstorm: {
      state: "STORMY",
      color: "#2F3640", // Deep Charcoal
      action: "Hiding inside the house",
      bunnyMood: "scared"
    }
  };

  return mapping[condition] || mapping.Clear;
};