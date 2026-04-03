import { scenarioData, ScenarioSlug } from "@/constants";
import { notFound } from "next/navigation";
import ScenarioClient from "../../../components/challenge-real-world-page/RealWorldClient";

export function generateStaticParams() {
    return Object.keys(scenarioData).map((slug) => ({ scenario: slug }));
}

export default async function ScenarioPage({ params }: {params: Promise<{ scenario: string }>}) {
    // Await params in case it's a Promise (for Next.js dynamic route compliance)
    const resolvedParams = await Promise.resolve(params);
    const data = scenarioData[resolvedParams.scenario as ScenarioSlug];
    if (!data) return notFound();
    
    return <ScenarioClient data={data} slug={resolvedParams.scenario} />;
}