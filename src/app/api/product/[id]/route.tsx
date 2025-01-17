import { NextResponse } from "next/server";

const URL_API = process.env.URL_BACKEND

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        if (!URL_API) {
            return NextResponse.json(
                { error: "API URL no definido" },
                { status: 500 },
            );
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const userId = formData.get('userId');
        const imageUrl = formData.get('imageUrl');
        const file = formData.get('image');


        const bodyFormData = new FormData();
        bodyFormData.append('title', title as string);
        bodyFormData.append('description', description as string);
        bodyFormData.append('userId', userId as string);
        bodyFormData.append('imageUrl', imageUrl as string);
        bodyFormData.append('file', file as Blob);

        const result = await fetch(`${URL_API}/product/${id}`, {
            method: "PATCH",
            body: formData,
        })
        if (!result.ok) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }
        const product = await result.json();
        return NextResponse.json({ data: product })
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    try {
        if (!URL_API) {
            return NextResponse.json(
                { error: "API URL no definido" },
                { status: 500 },
            );
        }
        const result = await fetch(`${URL_API}/product/${id}?userId=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*"
            }
        })
        if (!result.ok) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }
        const product = await result.json();
        return NextResponse.json({ data: product })
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}