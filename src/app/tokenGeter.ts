"use server";

export default async function TokenGeter() {
    return process.env.GITHUB_TOKEN
}