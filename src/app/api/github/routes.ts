import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

export async function GET() {
  const octokit = new Octokit();
  try {
    const { data } = await octokit.request('GET /users/{username}/repos', {
      username: 'JsuisSayker',
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
