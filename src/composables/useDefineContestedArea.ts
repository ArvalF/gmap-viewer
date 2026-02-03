import type { ContestedArea } from "@/types/globals";

const useDefineContestedArea = (): ContestedArea[] => {
    return [
        {
            name: 'Cashmere Region',
            description: '',
            center: [8405627.126464, 4114758.106648],
            zoom: 5,
            googleObserver: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "IN", region: "Inde" },
                { code_regional: "PK", region: "Pakistan" },
            ],
            region : "Himalaya"
        },
        {
            name: 'Arunashal Pradesh',
            description: '',
            center: [10511620.129777, 3282511.742679],
            zoom: 5,
            googleObserver: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "IN", region: "Inde" },
                { code_regional: "PK", region: "Pakistan" },
            ],
            region : "Himalaya"
        },
        {
            name: 'Bhoutan',
            description: '',
            center: [10058072.680809, 3188158.554238],
            zoom: 8,
            googleObserver: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "BT", region: "Bhoutan" },
            ],
            region : "Himalaya"
        },
        {
            name: 'Israel / Palestine',
            description: '',
            center: [3875663.082172, 3769262.738799],
            zoom: 5,
            googleObserver: [
                { code_regional: "IL", region: "Israël" },
                { code_regional: "PS", region: "Palestine" },
                { code_regional: "FR", region: "France" },
                { code_regional: "US", region: "États-Unis" },
            ],
            region : "Moyen Orient"
        },
        {
            name: 'Ukraine / Russie',
            description: '',
            center: [3801060.542565, 5674684.979891],
            zoom: 7,
            googleObserver: [
                { code_regional: "UA", region: "Ukraine" },
                { code_regional: "RU", region: "Russie" },
            ],
            region : "Europe"
        },
        {
            name: 'Taïwan',
            description: '',
            center: [13345293.642365, 2827558.550325],
            zoom: 7,
            googleObserver: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "TW", region: "Taïwan" },
            ],
            region : "Asie de l'Est"
        },
        {
            name: 'Arménie',
            description: '',
            center: [4969018.334763, 4973910.304573],
            zoom: 7,
            googleObserver: [
                { code_regional: "AM", region: "Arménie" },
                { code_regional: "TR", region: "Turquie" },
            ],
            region : "Asie Centrale"
        },
        {
            name: 'Sahara Occidental',
            description: '',
            center: [-1125153.056358, 3316755.531350],
            zoom: 7,
            googleObserver: [
                { code_regional: "MA", region: "Maroc" },
                { code_regional: "DZ", region: "Algérie" },
                { code_regional: "MR", region: "Mauritanie" },
            ],
            region : "Afrique"
        },
        {
            name: 'Corée du Nord',
            description: '',
            center: [14128008.812006, 5028944.964938],
            zoom: 7,
            googleObserver: [
                { code_regional: "KP", region: "Corée du Nord" },
                { code_regional: "CN", region: "Chine" },
            ],
            region : "Asie de l'Est"
        },
        {
            name: 'Hong-Kong',
            description: '',
            center: [12709643.315146, 2548639.834113],
            zoom: 15,
            googleObserver: [
                { code_regional: "CN", region: "Chine" },
                { code_regional: "HK", region: "Hong Kong" },
            ],
            region : "Asie du Sud Est"
        },
        {
            name: 'Kenya / Somalie',
            description: '',
            center: [4657155.259359, 442723.267828],
            zoom: 7,
            googleObserver: [
                { code_regional: "KE", region: "Kenya" },
                { code_regional: "SO", region: "Somalie" },
                { code_regional: "ET", region: "Éthiopie" },
            ],
            region : "Afrique"
        },
        {
            name: 'Golf du Mexique',
            description: '',
            center: [-10062781.899687, 2881370.218238],
            zoom: 7,
            googleObserver: [
                { code_regional: "US", region: "États-Unis" },
                { code_regional: "FR", region: "France" },
            ],
            region : "Caraïbe"
        },
    ]
}

export default useDefineContestedArea; 