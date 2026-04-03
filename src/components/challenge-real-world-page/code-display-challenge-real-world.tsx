import { TabbedCodeDisplay } from "@/components/challenge-real-world-page/tabled-code-display"

interface CodeDisplayProps {
  codeToDisplay: Array<{
    id: string;
    title: string;
    filename: string;
    language: string;
    code: string;
  }>;
  fileCount?: number;
}

export default function CodeDisplay({ codeToDisplay, fileCount }: CodeDisplayProps) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Code Examples</h1> */}
      <TabbedCodeDisplay
        examples={codeToDisplay}
        lightTheme="github-dark"
        darkTheme="github-dark"
        highlightColor="rgba(101, 117, 133, 0.16)"
        columnCount={fileCount}
      />
    </div>
  );
}
