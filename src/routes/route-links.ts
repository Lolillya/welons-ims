export const links = {
  DASHBOARD: "admin/dashboard",
  QUOTATIONS: "admin/quotation",
  INVENTORY: "admin/inventory",
  PURCHASE_ORDERS: "admin/purchase-orders",
  PROJECTS: "admin/projects",
  DISPATCH: "admin/dispatch",
} as const;

export type Links = (typeof links)[keyof typeof links];
