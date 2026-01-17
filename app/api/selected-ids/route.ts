import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Case gereği seçilen id'ler
  console.log("Seçilen ID'ler:", body.ids);

  return NextResponse.json({
    success: true,
    receivedIds: body.ids,
  });
}