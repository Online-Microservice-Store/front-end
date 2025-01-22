import { LatLngExpression } from "leaflet";

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/api"
//Estado del usuario
export const ACTIVE_USER_STATUS = "Activo";
export const BLOQUED_USER_STATUS = "Bloqueado";
export const AVAILABLE_PRODUCT = "TRUE";
export const NOT_AVAILABLE_PRODUCT = "FALSE";

export const DEFAULT_MAP_CENTER : LatLngExpression = [-4.032747, -79.202405];
export const DEFAULT_MAP_ZOOM = 18;

