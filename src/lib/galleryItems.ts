export interface Item {
    name: string,
    description: string,
    curriculum?: Function
}

export const GalleryItems: Item[] = [
    {
        name: "How-To-Learn Book",
        description: "Learn new skills with this instructional book."
    },
    {
        name: "Wireless Earbuds",
        description: "Experience crystal clear audio on the go."
    },
    {
        name: "Ergonomic Desk Chair",
        description: "Improve your posture and comfort while working."
    },
    {
        name: "Portable Bluetooth Speaker",
        description: "Bring the party wherever you go."
    },
    {
        name: "Fitness Tracker",
        description: "Monitor your activity and health metrics."
    },
    {
        name: "Noise-Cancelling Headphones",
        description: "Immerse yourself in your music or podcasts."
    },
    {
        name: "Laptop Stand",
        description: "Elevate your laptop to eye level for better ergonomics."
    },
    {
        name: "Wireless Charging Pad",
        description: "Charge your devices wirelessly with ease."
    },
    {
        name: "Color Printer (Ink Tank)",
        description: "Print high-quality documents and photos with an ink-efficient system."
    },
    {
        name: "Color Printer (Laser)",
        description: "Fast, reliable, and cost-efficient color printing with laser technology."
    },
    {
        name: "Spiral Binding Machine",
        description: "Create professional-looking documents with ease using spiral binding."
    },
    {
        name: "Pencil",
        description: "Write and sketch with ease using this classic tool."
    },
    {
        name: "Pen",
        description: "Smooth and reliable writing instrument for everyday use."
    },
    {
        name: "Paper",
        description: "High-quality paper for all your printing and writing needs."
    },
    {
        name: "Notebook",
        description: "Keep your notes organized in this sturdy notebook."
    },
    {
        name: "Stapler",
        description: "Fasten your documents together with ease."
    },
    {
        name: "Paper Clips",
        description: "Hold your papers together without the need for staples."
    },
    {
        name: "Scissors",
        description: "Cut with precision using these ergonomic scissors."
    },
    {
        name: "Tape Dispenser",
        description: "Dispense tape easily for sealing, binding, and other tasks."
    },
    {
        name: "Highlighter",
        description: "Mark important text with these vibrant highlighters."
    },
    {
        name: "Folder",
        description: "Organize your documents and papers in this sturdy folder."
    },
    {
        name: "Sticky Notes",
        description: "Leave reminders and notes with these adhesive sticky notes."
    },
    {
        name: "Tye Dye Kit",
        description: "Create vibrant tye-dye patterns on clothing and fabric."
    },
    {
        name: "Board Game (Strategy)",
        description: "Engage in strategic thinking with this classic board game."
    },
    {
        name: "Puzzle",
        description: "Challenge your mind with this engaging puzzle."
    },
    {
        name: "Craft Kit",
        description: "Explore your creativity with this all-in-one craft kit."
    },
    {
        name: "Art Supplies (Canvas & Paint)",
        description: "Create beautiful paintings with this canvas and paint set."
    },
    {
        name: "Sensory Bin",
        description: "Encourage exploration and learning with this sensory bin."
    },
    {
        name: "Sensory Toy",
        description: "Engage the senses and stimulate development with this versatile sensory toy."
    },
    {
        name: "Mess Table",
        description: "Provide a fun and educational experience with this mess/water table."
    },
    {
        name: "Science Project Kit",
        description: "Conduct exciting experiments with this science project kit."
    },
    {
        name: "Workbook",
        description: "Improve your skills with this educational workbook."
    },
    {
        name: "Music Exploration Kit",
        description: "Discover the world of music with this exploration kit."
    },
    {
        name: "Bookshelf",
        description: "Keep your books organized and easily accessible with this bookshelf."
    },
    {
        name: "Organizational Storage Solution",
        description: "Optimize your space with this storage solution."
    },
    {
        name: "Gardening Kit",
        description: "Start your own garden with this comprehensive gardening kit."
    },
    {
        name: "Food Preservation Kit",
        description: "Learn how to preserve your own food with this kit."
    },
    {
        name: "Educational Subscription Service",
        description: "Access a wide range of educational content with this subscription service."
    },
    {
        name: "VR Educational App",
        description: "Immerse yourself in virtual reality learning experiences."
    },
    {
        name: "3D Printer",
        description: "Create 3D objects with precision using this printer."
    },
    {
        name: "Jewelry Making Kit",
        description: "Craft your own jewelry with this all-in-one kit."
    },
    {
        name: "Candle Making Kit",
        description: "Create custom candles with this comprehensive kit."
    },
    {
        name: "Resin Art Kit",
        description: "Design unique resin art pieces with this versatile kit."
    },
    {
        name: "Sewing Supplies",
        description: "All the essentials for your sewing projects."
    },
    {
        name: "Sport Equipment",
        description: "Gear up for your favorite sport with this essential equipment."
    },
    {
        "name": "Sport Attire",
        "description": "Stay comfortable and perform at your best with this collection of sportswear."
    },
    {
        "name": "Educational Kit",
        "description": "Equip yourself with the tools and resources needed for effective learning and exploration."
    },
    {
        "name": "Field Trip Ticket",
        "description": "Your pass to an exciting adventure! Explore new places, learn outside the classroom, and make unforgettable memories.",
        curriculum: (s: string) => {
            return `
                Write a curriculum that has the word "educational" somewhere in it with scope and sequence, learning objectives, 6 detailed lessons in order, activity, instructional materials
                required, and assessment for a child wanting to learn about ${s}. Include thebenefits of learning about ${s} and all
                they have to offer and how it can be educational. 
                List summary of materials below required at the end for activities like all of the following: ${s} ticket
            `
        }
    }
];
