export default {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    imageUrl: { type: "string" },
    gender: { type: "string" },
    durationMinutes: { type: "string" },
  },
  required: ["name", "description", "imageUrl", "gender", "durationMinutes"],
} as const;
