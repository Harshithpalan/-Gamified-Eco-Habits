/**
 * Carbon Calculation Model
 * 
 * Provides utility functions to estimate CO2 emissions based on user activity.
 * Emission factors are approximate and based on standard averages (kg CO2 per unit).
 */

export const EMISSION_FACTORS = {
    // Transport (kg CO2 per km)
    TRANSPORT: {
        CAR_GASOLINE: 0.192,
        CAR_DIESEL: 0.171,
        CAR_ELECTRIC: 0.053, // depends on grid
        BUS: 0.105,
        TRAIN: 0.041,
        BICYCLE: 0,
        WALKING: 0,
    },

    // Energy (kg CO2 per kWh)
    ENERGY: {
        GRID: 0.475, // average grid intensity
        SOLAR: 0.050, // lifecycle emissions
    },

    // Shopping (kg CO2 per unit/kg)
    SHOPPING: {
        BEEF: 27.0,
        CHICKEN: 6.9,
        VEGETABLES: 2.0,
        CLOTHING_COTTON: 8.3,
        ELECTRONICS: 50.0, // average small device
    }
};

export type TransportType = keyof typeof EMISSION_FACTORS.TRANSPORT;
export type EnergyType = keyof typeof EMISSION_FACTORS.ENERGY;

/**
 * Calculate transport emissions
 */
export function calculateTransportEmissions(distanceKm: number, type: TransportType): number {
    return distanceKm * EMISSION_FACTORS.TRANSPORT[type];
}

/**
 * Calculate energy emissions
 */
export function calculateEnergyEmissions(kWh: number, type: EnergyType): number {
    return kWh * EMISSION_FACTORS.ENERGY[type];
}

/**
 * Calculate savings compared to a baseline
 */
export function calculateSavings(baseline: number, current: number): number {
    return Math.max(0, baseline - current);
}

/**
 * Suggest alternatives based on current habit
 */
export function getEcoSuggestion(habit: string, value: number): string {
    if (habit === 'CAR_GASOLINE' && value > 10) {
        return `Switching to public transport for this ${value}km trip could save around ${(value * (EMISSION_FACTORS.TRANSPORT.CAR_GASOLINE - EMISSION_FACTORS.TRANSPORT.BUS)).toFixed(2)}kg of CO2.`;
    }
    if (habit === 'BEEF') {
        return `Replacing this beef portion with chicken could reduce emissions by ${((EMISSION_FACTORS.SHOPPING.BEEF - EMISSION_FACTORS.SHOPPING.CHICKEN)).toFixed(2)}kg.`;
    }
    return "Keep up the great work! Every small action counts.";
}
