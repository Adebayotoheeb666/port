import { supabaseAdmin } from "@/lib/supabaseClient";

export const revalidate = 0;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("id, title, content, excerpt, created_at")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return (
      <main className="container py-24">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">{error?.message ?? "No post with that slug."}</p>
      </main>
    );
  }

  const post: any = data;

  return (
    <main className="container py-24">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-neutral-500 mb-6">{new Date(post.created_at).toLocaleString()}</div>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
