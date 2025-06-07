import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('visiondb');
  const users = db.collection('users');

  const existing = await users.findOne({ email });
  if (existing) {
    return new NextResponse(JSON.stringify({ error: 'Email already exists' }), {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({
    email,
    password: hashed,
    role: 'free',
    dailyGenerationCount: 0,
    createdAt: new Date(),
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
