import type { Metadata } from "next";
import EjesContent from "./EjesContent";

export const metadata: Metadata = {
  title: "Ejes Temáticos — Sierras Grandes",
};

export default function EjesPage() {
  return <EjesContent />;
}
