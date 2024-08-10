export interface Item {
    name: string,
    description: string,
    filters: string[],
    isTopicSelector: boolean,
    isNameInput: boolean
}

export const GalleryItems: Item[] = [
    {
        name: "Wireless Earbuds",
        description: "Experience crystal clear audio on the go.",
        filters: ["Audio", "Portable", "Wireless"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Ergonomic Desk Chair",
        description: "Improve your posture and comfort while working.",
        filters: ["Furniture", "Ergonomic", "Office"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Portable Bluetooth Speaker",
        description: "Bring the party wherever you go.",
        filters: ["Audio", "Portable", "Bluetooth"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Fitness Tracker",
        description: "Monitor your activity and health metrics.",
        filters: ["Fitness", "Health", "Wearable"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Noise-Cancelling Headphones",
        description: "Immerse yourself in your music or podcasts.",
        filters: ["Audio", "Headphones", "Noise-Cancelling"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Laptop Stand",
        description: "Elevate your laptop to eye level for better ergonomics.",
        filters: ["Office", "Ergonomic", "Stand"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Wireless Charging Pad",
        description: "Charge your devices wirelessly with ease.",
        filters: ["Electronics", "Wireless", "Charger"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Color Printer (Ink Tank)",
        description: "Print high-quality documents and photos with an ink-efficient system.",
        filters: ["Electronics", "Printer", "Ink Tank"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Color Printer (Laser)",
        description: "Fast, reliable, and cost-efficient color printing with laser technology.",
        filters: ["Electronics", "Printer", "Laser"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Spiral Binding Machine",
        description: "Create professional-looking documents with ease using spiral binding.",
        filters: ["Office", "Binding", "Spiral"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Pencil",
        description: "Write and sketch with ease using this classic tool.",
        filters: ["Office", "Writing", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Pen",
        description: "Smooth and reliable writing instrument for everyday use.",
        filters: ["Office", "Writing", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Paper",
        description: "High-quality paper for all your printing and writing needs.",
        filters: ["Office", "Paper", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Notebook",
        description: "Keep your notes organized in this sturdy notebook.",
        filters: ["Office", "Writing", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Stapler",
        description: "Fasten your documents together with ease.",
        filters: ["Office", "Binding", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Paper Clips",
        description: "Hold your papers together without the need for staples.",
        filters: ["Office", "Binding", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Scissors",
        description: "Cut with precision using these ergonomic scissors.",
        filters: ["Office", "Tools", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Tape Dispenser",
        description: "Dispense tape easily for sealing, binding, and other tasks.",
        filters: ["Office", "Tools", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Highlighter",
        description: "Mark important text with these vibrant highlighters.",
        filters: ["Office", "Writing", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Folder",
        description: "Organize your documents and papers in this sturdy folder.",
        filters: ["Office", "Organization", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Sticky Notes",
        description: "Leave reminders and notes with these adhesive sticky notes.",
        filters: ["Office", "Organization", "Basic"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Tye Dye Kit",
        description: "Create vibrant tye-dye patterns on clothing and fabric.",
        filters: ["Crafts", "Art", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Board Game (Strategy)",
        description: "Engage in strategic thinking with this classic board game.",
        filters: ["Games", "Strategy", "Entertainment"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Puzzle",
        description: "Challenge your mind with this engaging puzzle.",
        filters: ["Games", "Puzzle", "Brain"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Craft Kit",
        description: "Explore your creativity with this all-in-one craft kit.",
        filters: ["Crafts", "Art", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Art Supplies (Canvas & Paint)",
        description: "Create beautiful paintings with this canvas and paint set.",
        filters: ["Art", "Crafts", "Painting"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Sensory Bin",
        description: "Encourage exploration and learning with this sensory bin.",
        filters: ["Education", "Tactile", "Sensory"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        "name": "Sensory Toy",
        "description": "Engage the senses and stimulate development with this versatile sensory toy.",
        "filters": ["Education", "Tactile", "Developmental"],
        "isTopicSelector": false,
        "isNameInput": false
    },
    {
        name: "Mess Table",
        description: "Provide a fun and educational experience with this mess/water table.",
        filters: ["Education", "Tactile", "Sensory"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Science Project Kit",
        description: "Conduct exciting experiments with this science project kit.",
        filters: ["Education", "Science", "Experiment"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Workbook",
        description: "Improve your skills with this educational workbook.",
        filters: ["Education", "Learning", "Workbook"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Music Exploration Kit",
        description: "Discover the world of music with this exploration kit.",
        filters: ["Education", "Music", "Learning"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Bookshelf",
        description: "Keep your books organized and easily accessible with this bookshelf.",
        filters: ["Furniture", "Organization", "Storage"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Organizational Storage Solution",
        description: "Optimize your space with this storage solution.",
        filters: ["Organization", "Storage", "Furniture"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Gardening Kit",
        description: "Start your own garden with this comprehensive gardening kit.",
        filters: ["Outdoors", "Gardening", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Food Preservation Kit",
        description: "Learn how to preserve your own food with this kit.",
        filters: ["Food", "DIY", "Preservation"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Educational Subscription Service",
        description: "Access a wide range of educational content with this subscription service.",
        filters: ["Education", "Learning", "Subscription"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "VR Educational App",
        description: "Immerse yourself in virtual reality learning experiences.",
        filters: ["Virtual Reality", "Education", "Technology"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "3D Printer",
        description: "Create 3D objects with precision using this printer.",
        filters: ["Printing", "Technology", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Jewelry Making Kit",
        description: "Craft your own jewelry with this all-in-one kit.",
        filters: ["Crafting", "Art", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Candle Making Kit",
        description: "Create custom candles with this comprehensive kit.",
        filters: ["Crafting", "Art", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Resin Art Kit",
        description: "Design unique resin art pieces with this versatile kit.",
        filters: ["Crafting", "Art", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "Sewing Supplies",
        description: "All the essentials for your sewing projects.",
        filters: ["Sewing", "Crafting", "DIY"],
        isTopicSelector: false,
        isNameInput: false
    },
    {
        name: "How-To Books",
        description: "Learn new skills with these instructional books.",
        filters: ["Education", "Learning", "Books"],
        isTopicSelector: false,
        isNameInput: false
    }
];
