"use client"

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" }); 
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql);

