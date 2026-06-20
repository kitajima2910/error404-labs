---
name: webs-auth
description: Authentication production — Auth.js, OAuth, JWT, RBAC, session, CSRF. Không lỗ hổng bảo mật, HTTP-only cookie.
---

# webs-auth — Authentication

## Cài đặt Auth.js (NextAuth)

```typescript
// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.password) return null; // OAuth user can't login with password
        if (!await compare(credentials.password as string, user.password)) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub!;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
```

## RBAC Middleware

```typescript
// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

const roles = {
  admin: ["read", "write", "delete", "manage"],
  editor: ["read", "write"],
  user: ["read"],
} as const;

type Role = keyof typeof roles;

async function requireRole(req: NextRequest, role: Role) {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect(new URL("/login", req.url));
  if (!roles[session.user.role as Role]?.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export default auth((req) => {
  if (!req.auth?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});
```

## JWT (thủ công)

```typescript
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: { userId: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}
```

## Bảo vệ CSRF

```typescript
// API route CSRF check
import { cookies } from "next/headers";

export async function validateCSRF(request: Request) {
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get("csrf-token")?.value;
  const csrfHeader = request.headers.get("x-csrf-token");

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    throw new AppError(403, "Invalid CSRF token");
  }
}
```
