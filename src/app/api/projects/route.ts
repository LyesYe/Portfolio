import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}