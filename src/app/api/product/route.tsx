import { useProductState } from "@/hooks/useProductState";
import { IProducts } from "@/types";
import { NextResponse } from "next/server";

const URL_API = process.env.URL_BACKEND
    
export async function GET(request: Request) {
    try {
        if (!URL_API) {
            return NextResponse.json(
                { error: "API URL no definido" },
                { status: 500 },
            );
        }

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        const res = await fetch(`${URL_API}/product?userId=${userId}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Falló al hacer fetch: ${res.statusText}`);
        }

        const data: IProducts[] = await res.json();
        return NextResponse.json(data , { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
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
        const file = formData.get('image');


        const bodyFormData = new FormData();
        bodyFormData.append('title', title as string);
        bodyFormData.append('description', description as string);
        bodyFormData.append('userId', userId as string);
        bodyFormData.append('file', file as Blob);

        const res = await fetch(`${URL_API}/product`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Falló al hacer fetch: ${res.statusText}`);
        }

        const { data } = await res.json();
        return NextResponse.json( data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}