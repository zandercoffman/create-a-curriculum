import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface FORM1 {
    username: string;
    id: string;
    grade: number | undefined | string;
    saveInfo: boolean
}

interface RequestBody {
    form2: string; // Changed to string
    form1: FORM1 | null;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { form2, form1 } = body;

        const split = form2.split(/\*\*(.*?)\*\*/g);

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        var page = pdfDoc.addPage([816, 1056]);
        const { width, height } = page.getSize()
        const fontSize = 30

        let yPosition = 990; // Starting y position for the text

        // Draw content based on form1
        if (form1) {
            page.drawText(`Applicant Name: ${form1.username}`, {
                x: 50,
                y: yPosition,
                size: 20,
                color: rgb(0, 0, 0),
                font: timesRomanFont
            });
            yPosition -= 30; // Move down for the next line
            page.drawText(`ID #:${form1.id}`, {
                x: 50,
                y: yPosition,
                size: 20,
                color: rgb(0, 0, 0),
                font: timesRomanFont
            });
            yPosition -= 30; // Move down for the next line
        }

        split.forEach((splitten, index) => {
            page.drawText(splitten, {
                x: 50,
                y: yPosition,
                size: 15,
                color: rgb(0, 0, 0),
                maxWidth: 700, // Adjust width if needed
                lineHeight: 15, // Adjust line height if needed
                font: timesRomanFont
            });
            yPosition -= 40;

            if (yPosition <= 100) {
                page = pdfDoc.addPage([816, 1056]);
                yPosition = 950;
            }
        })



        // Serialize the PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Create a new Response with PDF data
        const response = new NextResponse(Buffer.from(pdfBytes), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="curriculum.pdf"',
            },
        });

        return response;
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse('Error generating PDF', { status: 500 });
    }
}
