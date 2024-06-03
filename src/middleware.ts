import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BACKEND_URL } from "./lib/config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const response = await axios.get(`${BACKEND_URL}/validate-token`, {
        headers: {
            token: request.cookies.get("token")?.value,
        },
    });

    if (!response.data.success) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/profile/:path*", "/home"],
};
