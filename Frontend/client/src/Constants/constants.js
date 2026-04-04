export const ROLES = {
    USER: "ROLE_USER",
    ADMIN: "ROLE_ADMIN"
};

export const PERMISSIONS = {
    VIEW_DASHBOARD: "view:dashboard",
    MANAGE_CATEGORIES: "manage:categories",
    MANAGE_USERS: "manage:users",
    MANAGE_INVENTORY: "manage:inventory",
    MANAGE_ORDERS: "manage:orders"
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: Object.values(PERMISSIONS),
    [ROLES.USER]: []
};
