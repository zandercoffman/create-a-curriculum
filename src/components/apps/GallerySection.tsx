"use client"

import { GalleryHorizontalEnd, SearchIcon, SlidersHorizontal, Target } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "../ui/badge";
import ActualGallery from "../component/gallery-section";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button";
import Link from "next/link";

const topics: {
    title: string,
    options: string[]
}[] = [
    {
        title: "Core Subjects",
        options: ["Math", "Science", "History", "Language Arts", "Social Studies", "Physical Education", "Health Education", "Core Subjects"],
    },
    {
        title: "World Language",
        options: ["English", "Spanish", "Mandarin", "Hindi", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Punjabi", "German", "French", "Italian", "Korean", "Vietnamese", "Turkish", "Urdu", "Javanese", "Telugu", "Marathi", "Latin", "World Language"],
    },
    {
        title: "Computer Science",
        options: ["Computer Science", "Algorithms", "Data Structures", "Operating Systems", "Computer Networks", "Databases", "Software Engineering", "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Programming Languages", "Computer Architecture", "Web Development", "Mobile Application Development", "Cloud Computing", "Computer Graphics", "Cryptography", "Quantum Computing", "Augmented Reality", "Virtual Reality"],
    },
    {
        title: "Math",
        options: ["Addition", "Subtraction", "Division", "Multiplication", "Algebra", "Geometry", "Trigonometry", "Calculus", "Linear Algebra", "Statistics"],
    },
    {
        title: "Sports",
        options: ["Soccer", "Basketball", "Baseball", "Tennis", "Football", "Hockey", "Volleyball", "Swimming", "Track and Field", "Gymnastics", "Golf", "Cricket", "Rugby", "Wrestling", "Boxing", "Badminton", "Table Tennis", "Martial Arts", "Cycling", "Surfing", "Skiing", "Snowboarding"],
    },
    {
        title: "Arts & Humanities",
        options: ["Art History", "Visual Arts", "Music Theory", "Theater", "Dance", "Film Studies", "Literature", "Philosophy", "Religious Studies", "Cultural Studies", "Anthropology", "Ethics"],
    },
    {
        title: "Engineering & Technology",
        options: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Biomedical Engineering", "Robotics", "Nanotechnology", "Renewable Energy", "Automation", "3D Printing"],
    },
    {
        title: "Social Sciences",
        options: ["Psychology", "Sociology", "Political Science", "Economics", "Geography", "Civics", "Law", "International Relations", "Archaeology", "Public Policy"],
    },
    {
        title: "Health & Medicine",
        options: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Nursing", "Public Health", "Nutrition", "Pathology", "Medical Ethics", "Veterinary Medicine"],
    },
    {
        title: "Business & Economics",
        options: ["Accounting", "Finance", "Marketing", "Entrepreneurship", "Human Resources", "Business Administration", "Economics", "Management", "Supply Chain Management", "E-commerce"],
    },
    {
        title: "Environmental Studies",
        options: ["Ecology", "Environmental Science", "Sustainability", "Conservation", "Climate Change", "Renewable Energy", "Environmental Policy", "Marine Biology", "Forestry", "Wildlife Management"],
    },
    {
        title: "History & Culture",
        options: ["Ancient Civilizations", "World History", "U.S. History", "European History", "Asian History", "African History", "Middle Eastern History", "Latin American History", "Historiography", "Cultural Heritage"],
    },
    {
        title: "Communication & Media Studies",
        options: ["Journalism", "Public Relations", "Advertising", "Digital Media", "Film Production", "Broadcasting", "Speech Communication", "Media Literacy", "Interpersonal Communication", "Corporate Communication"],
    },
    {
        title: "Psychology & Human Behavior",
        options: ["Cognitive Psychology", "Developmental Psychology", "Behavioral Psychology", "Clinical Psychology", "Social Psychology", "Educational Psychology", "Forensic Psychology", "Neuroscience", "Counseling", "Psychotherapy"],
    },
    {
        title: "Ethics & Philosophy",
        options: ["Moral Philosophy", "Logic", "Metaphysics", "Epistemology", "Aesthetics", "Political Philosophy", "Philosophy of Mind", "Philosophy of Science", "Existentialism", "Stoicism"],
    },
    {
        title: "Life Sciences",
        options: ["Biology", "Genetics", "Botany", "Zoology", "Microbiology", "Ecology", "Evolutionary Biology", "Marine Biology", "Biotechnology", "Molecular Biology"],
    },
    {
        title: "Fine Arts",
        options: ["Painting", "Sculpture", "Photography", "Drawing", "Ceramics", "Printmaking", "Graphic Design", "Textile Arts", "Fashion Design", "Jewelry Design"],
    },
    {
        title: "Performing Arts",
        options: ["Acting", "Directing", "Stage Design", "Playwriting", "Choreography", "Vocal Performance", "Instrumental Performance", "Musical Theater", "Opera", "Improvisation"],
    },
    {
        title: "Astronomy & Space Sciences",
        options: ["Astronomy", "Astrophysics", "Planetary Science", "Cosmology", "Space Exploration", "Astrobiology", "Stellar Evolution", "Exoplanets", "Space Technology", "Astronautics"],
    },
    {
        title: "Agricultural Sciences",
        options: ["Agronomy", "Horticulture", "Animal Science", "Soil Science", "Agricultural Engineering", "Plant Breeding", "Agricultural Economics", "Agroecology", "Agricultural Biotechnology", "Sustainable Agriculture"],
    },
    {
        title: "Design & Architecture",
        options: ["Architecture", "Interior Design", "Urban Planning", "Landscape Architecture", "Graphic Design", "Industrial Design", "Fashion Design", "Product Design", "Environmental Design", "Sustainable Architecture"],
    },
    {
        title: "Ethnic & Gender Studies",
        options: ["African American Studies", "Latino Studies", "Asian American Studies", "Native American Studies", "Gender Studies", "Women’s Studies", "Intersectionality", "Cultural Identity", "Postcolonial Studies"],
    },
    {
        title: "Literary Studies",
        options: ["Literary Analysis", "Poetry", "Drama", "Prose Fiction", "Literary Criticism", "Comparative Literature", "World Literature", "Modern Literature", "Classical Literature", "Postmodern Literature"],
    },
    {
        title: "Culinary Arts",
        options: ["Culinary Techniques", "Baking and Pastry", "Culinary Nutrition", "International Cuisine", "Culinary Management", "Food Safety", "Gastronomy", "Wine and Beverage Studies", "Culinary Entrepreneurship", "Food Science"],
    },
    {
        title: "Education & Pedagogy",
        options: ["Educational Theory", "Curriculum Development", "Instructional Design", "Special Education", "Early Childhood Education", "Educational Psychology", "Classroom Management", "Assessment and Evaluation", "Educational Technology", "Adult Education"],
    },
    {
        title: "Ethics & Social Responsibility",
        options: ["Business Ethics", "Environmental Ethics", "Bioethics", "Social Justice", "Corporate Social Responsibility", "Human Rights", "Ethical Leadership", "Ethics in Technology", "Global Ethics", "Civic Responsibility"],
    },
    {
        title: "Geology & Earth Sciences",
        options: ["Geology", "Geophysics", "Mineralogy", "Volcanology", "Seismology", "Paleontology", "Hydrology", "Environmental Geology", "Geomorphology", "Petrology"],
    },
    {
        title: "Global Studies & International Relations",
        options: ["Globalization", "International Development", "Global Politics", "International Law", "Humanitarian Studies", "Global Health", "Conflict Resolution", "Global Trade", "International Organizations", "Diplomacy"],
    },
    {
        title: "History of Science & Technology",
        options: ["History of Medicine", "History of Technology", "Scientific Revolutions", "History of Mathematics", "History of Engineering", "History of Physics", "History of Biology", "History of Computing", "Industrial Revolution", "Space Race"],
    },
    {
        title: "Media & Popular Culture",
        options: ["Popular Culture", "Film Studies", "Television Studies", "Music Studies", "Comic Books", "Video Games", "Social Media", "Celebrity Culture", "Cultural Criticism", "Fan Studies"],
    },
    {
        title: "Military & Defense Studies",
        options: ["Military History", "Strategic Studies", "Defense Policy", "Intelligence Studies", "Military Ethics", "Security Studies", "Peacekeeping", "Cyber Warfare", "Counterterrorism", "Arms Control"],
    },
    {
        title: "Transportation & Logistics",
        options: ["Transportation Engineering", "Logistics Management", "Supply Chain Management", "Urban Transportation", "Aviation Management", "Maritime Studies", "Rail Transport", "Automotive Engineering", "Public Transportation", "Transportation Safety"],
    },
    {
        title: "Urban & Regional Planning",
        options: ["Urban Planning", "Regional Planning", "Urban Design", "Land Use Planning", "Sustainable Cities", "Transportation Planning", "Community Development", "Environmental Planning", "Housing Policy", "Urban Economics"],
    }
];



export default function GallerySection() {

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [input, setInput] = useState("");

    return <>
        <Dialog>
            <DialogTrigger>
                <div className="flex flex-col items-center gap-2">
                    <GalleryHorizontalEnd className="w-6 h-6" />
                    <span className="text-sm font-medium">Gallery</span>
                    <Badge variant={"destructive"}>New</Badge>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[95vw] lg:w-[90vw] rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Gallery</DialogTitle>
                    <DialogDescription className="flex flex-row gap-2">
                        <p>A scroll page where you explore products and generate a custom curriculum based on what piques your interest. All images are generated by Meta AI. <Link href={"https://forms.gle/TKgtnAL6qjtYAQLGA"} className="text-blue-400 font-semibold">Recommendation Form</Link></p>
                    </DialogDescription>
                    <Accordion type="single" collapsible className="w-[96%] mx-auto" defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger >Filtering Options</AccordionTrigger>
                            <AccordionContent className="w-[96%] mx-auto flex flex-col lg:flex-row gap-3 mt-2 justify-between">

                                <div className="relative w-full lg:w-1/3">
                                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="relative w-full lg:w-2/3 flex gap-3 flex-row">
                                    <div className="relative w-full ">
                                        <SlidersHorizontal className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Select onValueChange={
                                            (value) => {
                                                setSelectedSubject(value);
                                            }
                                        }>
                                            <SelectTrigger className="pl-10 w-full">
                                                <SelectValue placeholder={selectedSubject === "" ? "Subject" : selectedSubject} />
                                            </SelectTrigger>
                                            <ScrollArea className="max-h-[350px]">
                                                <SelectContent className="max-h-[350px]">
                                                    {topics.map((topic) => (
                                                        <div key={topic.title}>
                                                            <SelectTitle>{topic.title}</SelectTitle>
                                                            {topic.options.map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </SelectContent>
                                            </ScrollArea>
                                        </Select>
                                    </div>
                                    <div className="relative w-full">
                                        <Target className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Title"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />

                                    </div>
                                </div>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </DialogHeader>
                <ScrollArea className="max-h-[50vh] lg:max-h-[55vh]">
                    <ActualGallery searchQuery={searchQuery} selectedSubject={selectedSubject} input={input} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    </>
}

function SelectTitle(
    {
        children
    }: {
        children: any
    }
) {
    return <>
        <h1 className="ml-3 text-sm text-gray-900 my-2 font-semibold">{children}</h1>
    </>
}
