export default function ContactPage() {
  return (
    <main className="container py-24">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <p className="mb-4">Prefer to email? Click the link below to open your default mail client.</p>
      <a
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md"
        href={`mailto:adebayotoheen666@gmail.com`}
      >
        Email Adrian
      </a>
    </main>
  );
}
