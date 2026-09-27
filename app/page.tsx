import HomePage from "@/components/home/HomePage";
import { homeMetadata } from "@/lib/home-metadata";

export const metadata = homeMetadata("uz");

export default function Home() {
  return <HomePage lang="uz" />;
}
