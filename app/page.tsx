import { headers } from "next/headers";
import { getSiteByDomain } from "@/lib/sites";
import SiteProfile from "@/components/SiteProfile";

export default async function Home() {
  const headerList = await headers();
  const host = headerList.get("host") ?? "";
  const site = getSiteByDomain(host);

  if (site) {
    return <SiteProfile site={site} />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-zinc-50 text-center">
      <h1 className="text-3xl font-bold tracking-tight">LinkHub.uz</h1>
      <p className="mt-3 max-w-md text-zinc-600">
        Альтернатива Taplink для Узбекистана — своя ссылка-в-био страница на
        собственном домене (например{" "}
        <span className="font-medium">yourname.uz</span>) вместо{" "}
        <span className="line-through opacity-70">taplink.cc/yourname</span>.
      </p>
      <a
        href="/s/demo"
        className="mt-8 rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors"
      >
        Посмотреть пример страницы →
      </a>
    </main>
  );
}
