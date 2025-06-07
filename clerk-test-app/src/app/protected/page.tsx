import { auth } from "@clerk/nextjs/server"; // ✅


export default async function ProtectedPage() {
  const { userId } = await auth();

  return (
    <div className="text-white text-xl p-6">
      Bu sayfa sadece giriş yapmış kullanıcılar içindir. <br />
      Kullanıcı ID: <span className="text-cyan-400">{userId}</span>
    </div>
  );
}
