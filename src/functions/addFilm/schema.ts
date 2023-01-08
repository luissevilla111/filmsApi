export default {
  type: "object",
  properties: {
    saga: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    imageUrl: { type: "string" },
    gender: { type: "string" },
    durationMinutes: { type: "string" },
  },
  required: [
    "saga",
    "name",
    "description",
    "imageUrl",
    "gender",
    "durationMinutes",
  ],
} as const;
