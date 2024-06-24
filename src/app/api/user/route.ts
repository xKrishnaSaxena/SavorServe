import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

// Validation schema
const UserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  address: z.string().min(1, "Address is required").max(1000),
  role: z.string().min(1, "Role is required").max(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, username, name, address, role } =
      UserSchema.parse(body);

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { message: "Username already taken!" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        address,
        role,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
