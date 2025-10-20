import { supabaseAdmin } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 0; // always fresh

export default async function BlogPage() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("id, title, slug, excerpt, created_at")
    .order("created_at", { ascending: false });

  const posts = data ?? [];

  return (
    <main className="container py-24">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {error && (
        <p className="text-sm text-red-500">Error fetching posts: {error.message}</p>
      )}
      <div className="grid gap-6">
        {posts.length === 0 && <p>No posts yet. You can add one via Supabase.</p>}
        {posts.map((post: any) => (
          <article key={post.id} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-neutral-500">{post.excerpt}</p>
            <div className="mt-2 text-xs text-neutral-400">{new Date(post.created_at).toLocaleString()}</div>
          </article>
        ))}
      </div>
    </main>
  );
}
