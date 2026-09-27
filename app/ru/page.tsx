import HomePage from "@/components/home/HomePage";
import { homeMetadata } from "@/lib/home-metadata";

export const metadata = homeMetadata("ru");

export default function HomeRu() {
  return <HomePage lang="ru" />;
}
