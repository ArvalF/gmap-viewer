import type { ContestedArea } from "@/types/globals";

const useDefineContestedArea = (): ContestedArea[] => {
    return [
        {
            name: 'Cashmere Region',
            description: '',
            center: [8405627.126464, 4114758.106648],
            zoom: 5,
            regions: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "IN", region: "Inde" },
                { code_regional: "PK", region: "Pakistan" },
            ],
        },
        {
            name: 'Israel / Palestine',
            description: '',
            center: [3875663.082172, 3769262.738799],
            zoom: 5,
            regions: [
                { code_regional: "IL", region: "Israël" },
                { code_regional: "PS", region: "Palestine" },
                { code_regional: "FR", region: "France" },
                { code_regional: "US", region: "États-Unis" },
            ],
        },
        {
            name: 'Ukraine / Russie',
            description: '',
            center: [3801060.542565, 5674684.979891],
            zoom: 7,
            regions: [
                { code_regional: "UA", region: "Ukraine" },
                { code_regional: "RU", region: "Russie" },
            ],
        },
        {
            name: 'Taïwan',
            description: '',
            center: [13345293.642365, 2827558.550325],
            zoom: 7,
            regions: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "TW", region: "Taïwan" },
            ],
        },
        {
            name: 'Arménie',
            description: '',
            center: [4969018.334763, 4973910.304573],
            zoom: 7,
            regions: [
                { code_regional: "AM", region: "Arménie" },
                { code_regional: "TR", region: "Turquie" },
            ],
        },
        {
            name: 'Sahara Occidental',
            description: '',
            center: [-1125153.056358, 3316755.531350],
            zoom: 7,
            regions: [
                { code_regional: "MA", region: "Maroc" },
                { code_regional: "DZ", region: "Algérie" },
                { code_regional: "MR", region: "Mauritanie" },
            ],
        },
        {
            name: 'Corée du Nord',
            description: '',
            center: [14128008.812006, 5028944.964938],
            zoom: 7,
            regions: [
                { code_regional: "KP", region: "Corée du Nord" },
                { code_regional: "CN", region: "Chine" },
                { code_regional: "JP", region: "Japon" },
            ],
        },
        {
            name: 'Kenya / Somalie',
            description: '',
            center: [4657155.259359, 442723.267828],
            zoom: 7,
            regions: [
                { code_regional: "KE", region: "Kenya" },
                { code_regional: "SO", region: "Somalie" },
                { code_regional: "ET", region: "Éthiopie" },
            ],
        }
    ]
}

export default useDefineContestedArea; 