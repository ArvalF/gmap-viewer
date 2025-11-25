import type { GoogleMapRegion } from "@/composables/useDefineGoogleMapRegion";

export interface ContestedArea{
    name: string;
    description: string;
    center: [number, number];
    zoom: number,
    regions: GoogleMapRegion[];
}