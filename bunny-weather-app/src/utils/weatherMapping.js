export const getBunnyState = (condition) => {
  const mapping = {
    Clear: { state: "SUNNY", color: "#87CEEB", action: "Hanging clothes" },
    Clouds: { state: "CLOUDY", color: "#A0B0C0", action: "Watching clouds" },
    Rain: { state: "RAINY", color: "#4B515D", action: "Rushing inside" },
    Drizzle: { state: "RAINY", color: "#4B515D", action: "Rushing inside" },
    Thunderstorm: { state: "STORMY", color: "#2F3640", action: "Hiding" },
    // New States
    Haze: { state: "FOGGY", color: "#BDB2CF", action: "Squinting through haze" },
    Mist: { state: "FOGGY", color: "#D1D9E0", action: "Feeling the damp air" },
    Smoke: { state: "FOGGY", color: "#A9A9A9", action: "Staying close to home" }
  };

  return mapping[condition] || mapping.Clear;
};