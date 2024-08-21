export async function POST(request: Request) {
  const response = await request.json();
  return Response.json({ response });
}
