import { NextRequest, NextResponse } from "next/server";

let leads: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const newLead = await req.json();

    if (!newLead.name || !newLead.email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    newLead.id = leads.length + 1;
    leads.push(newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(leads, { status: 200 });
}
