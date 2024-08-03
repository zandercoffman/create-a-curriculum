// pages/api/generate-docx.ts
import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

interface FORM1 {
    username: string;
    id: string;
    grade: number | undefined | string;
    saveInfo: boolean
}

interface RequestBody {
    form2: string;
    form1: FORM1 | null;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { form1, form2 } = body;

        // Construct DOCX document
        const children = [];

        if (form1) {
            const userP = [
                new Paragraph({
                    text: `Applicant Name: ${form1.username}`,
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: `Applicant ID: ${form1.id}`,
                    heading: HeadingLevel.HEADING_2,
                }),
            ];
            children.push(...userP);
        }

        // Add split content from form2
        const form2Content = form2.split(/\*\*(.*?)\*\*/g).map((section, index) => 
            new Paragraph({
                text: section,
                heading: index % 2 === 1 ? HeadingLevel.HEADING_2 : undefined,
            })
        );

        children.push(...form2Content);

        const doc = new Document({
            sections: [
                {
                    children,
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
