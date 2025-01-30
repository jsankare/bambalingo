export const pronunciationRules = [
    {
        title: "Les voyelles",
        description: "Le bambara a 7 voyelles orales et leurs équivalents nasals :",
        cases: [
            {
                rule: "a",
                pronunciation: "comme dans 'patte'",
                example: "ba",
                simplifiedPhonetic: "ba",
                translation: "fleuve"
            },
            {
                rule: "e",
                pronunciation: "comme dans 'été'",
                example: "se",
                simplifiedPhonetic: "sé",
                translation: "arriver"
            },
            {
                rule: "ɛ",
                pronunciation: "comme dans 'être'",
                example: "kɛ",
                simplifiedPhonetic: "kè",
                translation: "faire"
            },
            {
                rule: "i",
                pronunciation: "comme dans 'lit'",
                example: "ji",
                simplifiedPhonetic: "ji",
                translation: "eau"
            },
            {
                rule: "o",
                pronunciation: "comme dans 'mot'",
                example: "ko",
                simplifiedPhonetic: "ko",
                translation: "dos"
            },
            {
                rule: "ɔ",
                pronunciation: "comme dans 'port'",
                example: "sɔ",
                simplifiedPhonetic: "saw",
                translation: "cheval"
            },
            {
                rule: "u",
                pronunciation: "comme dans 'tout'",
                example: "su",
                simplifiedPhonetic: "sou",
                translation: "nuit"
            }
        ],
        note: ""
    },
    {
        title: "Longueur des voyelles",
        description: "Les voyelles peuvent être courtes ou longues :",
        cases: [
            {
                rule: "Voyelle simple",
                pronunciation: "courte",
                example: "ba",
                simplifiedPhonetic: "ba",
                translation: "fleuve"
            },
            {
                rule: "Voyelle double",
                pronunciation: "longue",
                example: "baa",
                simplifiedPhonetic: "baaa",
                translation: "mère"
            }
        ],
        note: ""
    },
    {
        title: "Consonnes spécifiques",
        description: "Certaines consonnes ont une prononciation particulière en bambara :",
        cases: [
            {
                rule: "ɲ",
                pronunciation: "comme 'gn' dans 'agneau'",
                example: "ɲɔ",
                simplifiedPhonetic: "gno",
                translation: "mil"
            },
            {
                rule: "ŋ",
                pronunciation: "comme 'ng' dans 'parking'",
                example: "ŋɔmi",
                simplifiedPhonetic: "ngomi",
                translation: "miel"
            }
        ],
        note: ""
    },
    {
        title: "Combinaisons consonantiques",
        description: "Certaines combinaisons de consonnes sont fréquentes :",
        cases: [
            {
                rule: "mb",
                pronunciation: "comme dans 'jambe'",
                example: "mbe",
                simplifiedPhonetic: "mbé",
                translation: "pouvoir"
            },
            {
                rule: "nt",
                pronunciation: "comme dans 'entre'",
                example: "nta",
                simplifiedPhonetic: "nta",
                translation: "certains"
            }
        ],
        note: ""
    },
    {
        title: "Règle du 'g'",
        description: "Le 'g' se prononce différemment selon sa position :",
        cases: [
            {
                rule: "Entre voyelles",
                pronunciation: "comme 'g' dans 'gâteau'",
                example: "sogo",
                simplifiedPhonetic: "so-go",
                translation: "viande"
            },
            {
                rule: "En fin de syllabe ou de mot",
                pronunciation: "comme 'k'",
                example: "sunɔgɔ",
                simplifiedPhonetic: "su-naw-kaw",
                translation: "dormir"
            },
            {
                rule: "Avant voyelle nasale",
                pronunciation: "tend vers 'k'",
                example: "ngɔni",
                simplifiedPhonetic: "n-kaw-ni",
                translation: "harpe"
            }
        ],
        note: ""
    },
    {
        title: "Tons",
        description: "Le bambara est une langue tonale avec deux tons principaux :",
        cases: [
            {
                rule: "Ton haut",
                pronunciation: "voix montante",
                example: "bá",
                simplifiedPhonetic: "BAA",
                translation: "chèvre"
            },
            {
                rule: "Ton bas",
                pronunciation: "voix descendante",
                example: "ba",
                simplifiedPhonetic: "baa",
                translation: "fleuve"
            }
        ],
        note: "Les tons peuvent changer le sens des mots. Attention : les tons ne sont généralement pas marqués dans l'écriture courante."
    },
    {
        title: "Accentuation",
        description: "L'accent en bambara suit des règles précises :",
        cases: [
            {
                rule: "Mots simples",
                pronunciation: "L'accent est généralement sur la première syllabe",
                example: "màlo",
                simplifiedPhonetic: "MA-lo",
                translation: "riz"
            },
            {
                rule: "Mots composés",
                pronunciation: "Chaque composant garde son accent",
                example: "mìsidenkɛ",
                simplifiedPhonetic: "MI-si-den-kè",
                translation: "garçon vacher (misi = vache + den = enfant + kɛ = mâle)",
                note: "Notez l'accent sur 'mi' et 'den'"
            }
        ],
        note: ""
    },
    {
        title: "Élisions",
        description: "Certaines voyelles peuvent disparaître dans la parole rapide :",
        cases: [
            {
                rule: "Entre deux mots",
                pronunciation: "La voyelle finale du premier mot peut disparaître",
                example: "n ka taa → n k'taa",
                simplifiedPhonetic: "n-ka-taa → n-k-taa",
                translation: "je dois partir"
            },
            {
                rule: "Avec les pronoms",
                pronunciation: "Les pronoms peuvent se contracter",
                example: "i bi → b'i",
                simplifiedPhonetic: "ee bee → bee",
                translation: "tu es"
            }
        ],
        note: "Ces élisions sont courantes dans le langage parlé mais pas toujours écrites"
    },
    {
        title: "Liaisons",
        description: "Les mots peuvent se lier dans certains contextes :",
        cases: [
            {
                rule: "Nasalisation",
                pronunciation: "Un 'n' final peut influencer le mot suivant",
                example: "n ye → n nye",
                simplifiedPhonetic: "n-yé → n-nyé",
                translation: "j'ai"
            },
            {
                rule: "Assimilation",
                pronunciation: "Certains sons s'adaptent aux sons voisins",
                example: "don ka → don ga",
                simplifiedPhonetic: "don-ka → don-ga",
                translation: "entrer dans"
            }
        ],
        note: ""
    },
    {
        title: "Rythme et intonation",
        description: "Le bambara a un rythme particulier :",
        cases: [
            {
                rule: "Questions",
                pronunciation: "Intonation montante à la fin",
                example: "i ka kɛnɛ?",
                simplifiedPhonetic: "ee-ka-kè-nè↗",
                translation: "ça va?",
                note: "La flèche ↗ indique une intonation montante"
            },
            {
                rule: "Affirmations",
                pronunciation: "Ton descendant à la fin",
                example: "n ka kɛnɛ",
                simplifiedPhonetic: "n-ka-kè-nè↘",
                translation: "je vais bien",
                note: "La flèche ↘ indique une intonation descendante"
            }
        ],
        note: ""
    },
    {
        title: "Particularités dialectales",
        description: "La prononciation peut varier selon les régions :",
        cases: [
            {
                rule: "Bamako (standard)",
                pronunciation: "Prononciation de référence",
                example: "jiri",
                simplifiedPhonetic: "ji-ri",
                translation: "arbre"
            },
            {
                rule: "Variante régionale (ex: Ségou)",
                pronunciation: "Peut varier légèrement",
                example: "jiri → gyiri",
                simplifiedPhonetic: "ji-ri → gyi-ri",
                translation: "arbre"
            }
        ],
        note: "Il est conseillé d'apprendre d'abord la prononciation standard (Bamako)"
    },
];
