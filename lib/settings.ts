type RouteAccessMap = {
    [key: string]: string[];
};
export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/teacher(.*)": ["teacher"],
    "/attendances": ["admin", "teacher"],
    "/lessons": ["admin", "teacher"],
    "/groups": ["admin", "teacher"],
    "/students": ["admin", "teacher"],
    "/subjects": ["admin"],
    "/courses": ["admin"],
    "/payments": ["admin"],
    "/statistics": ["admin"],
    "/settings": ["admin"]
}