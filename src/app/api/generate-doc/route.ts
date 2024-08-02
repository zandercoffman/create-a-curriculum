// pages/api/generate-docx.ts
import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell, VerticalAlign } from 'docx';

interface FORM1 {
    name: string;
    uniqueid: string;
    grade: number | undefined | string;
    saveinfo: boolean;
    wantstousegrade: boolean;
}

interface RequestBody {
    form2: string;
    form1: FORM1 | null;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { form2, form1 } = body;

        // Construct DOCX document
        const doc = new Document({
            sections: [
                {
                    children: [
                        // Add content based on form1
                        
                        // Add split content from form2
                        ...form2.split(/\*\*(.*?)\*\*/g).map((section, index) => new Paragraph({
                            text: section,
                            heading: index % 2 === 1 ? HeadingLevel.HEADING_2 : undefined, // Optional: Add heading for split sections
                        })),
                    ],
                },
            ],
        });

        // Convert the document to a Blob
        const docxBlob = await Packer.toBlob(doc);

        // Create a new Response with DOCX data
        const response = new NextResponse(docxBlob, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': 'attachment; filename="document.docx"',
            },
        });

        return response;
    } catch (error) {
        console.error('Error generating DOCX:', error);
        return new NextResponse('Error generating DOCX', { status: 500 });
    }
}
