import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

interface FORM1 {
    name: string;
    uniqueid: string;
    grade: number | undefined | string;
    saveinfo: boolean;
    wantstousegrade: boolean;
}

interface RequestBody {
    form2: string; // Changed to string
    form1: FORM1 | null;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { form2, form1 } = body;

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([816, 2556]);

        let yPosition = 2540; // Starting y position for the text

        // Draw content based on form1
        if (form1) {
            page.drawText(`Applicant Name: ${form1.name}`, {
                x: 50,
                y: yPosition,
                size: 20,
                color: rgb(0, 0, 0),
            });
            yPosition -= 30; // Move down for the next line
            page.drawText(`ID #:${form1.uniqueid}`, {
                x: 50,
                y: yPosition,
                size: 20,
                color: rgb(0, 0, 0),
            });
            yPosition -= 30; // Move down for the next line
        }

        // Draw content based on form2 (treated as a string)
        page.drawText(`Curriculum Details:`, {
            x: 50,
            y: yPosition,
            size: 20,
            color: rgb(0, 0, 0),
        });
        yPosition -= 20; // Move down for the paragraph content
        page.drawText(form2, {
            x: 50,
            y: yPosition,
            size: 15,
            color: rgb(0, 0, 0),
            maxWidth: 500, // Adjust width if needed
            lineHeight: 18, // Adjust line height if needed
        });

        // Serialize the PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Create a new Response with PDF data
        const response = new NextResponse(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="example.pdf"',
            },
        });

        return response;
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse('Error generating PDF', { status: 500 });
    }
}
