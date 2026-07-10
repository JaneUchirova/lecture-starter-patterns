const CardEvent = {
  CREATE: "card:create",
  REORDER: "card:reorder",
  RENAME: "card:rename",
  CHANGE_DESCRIPTION: "card:change-description",
  DELETE: "card:delete",
  DUPLICATE: "card:duplicate",
} as const;

export { CardEvent };
