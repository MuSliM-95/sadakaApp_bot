declare module "@masaajid/qibla" {
  export interface QiblaData {
    bearing: number;
    magneticBearing: number;
    distance: number;
    cardinalDirection?: string;
  }

  getQiblaDirection: (location: { latitude: number; longitude: number }) =>
    QiblaData;
  calculateQiblaWithCompass: (
    location: {
      latitude: number;
      longitude: number;
    },
    options?: {
      includeCardinalDirection?: boolean;
      includeMagneticDeclination?: boolean;
      bearingPrecision?: number;
      distancePrecision?: number;
    }
  ) => QiblaData;

  export {getQiblaDirection, calculateQiblaWithCompass };
}
