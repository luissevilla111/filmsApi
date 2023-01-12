export default {
  type: "object",
  properties: {
    saga: { type: "string" },
    name: { type: "string" },
  },
  required: ["saga", "name"],
} as const;
