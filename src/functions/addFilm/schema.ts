export default {
  type: "object",
  properties: {
    saga: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    imageUrl: { type: "string" },
    genders: { type: "array", items: { type: "string" } },
    durationMinutes: { type: "string" },
  },
  required: [
    "saga",
    "name",
    "description",
    "imageUrl",
    "genders",
    "durationMinutes",
  ],
} as const;
