import { CodeDisplay } from "./code-display"

interface CodeDisplayProps {
  codeToDisplay: {
    id: string;
    title: string;
    filename: string;
    language: string;
    code: string;
  };
}

export default function CodeDisplayLearning({ codeToDisplay }: CodeDisplayProps) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <CodeDisplay
        examples={codeToDisplay}
        lightTheme="github-dark"
        darkTheme="github-dark"
        highlightColor="rgba(101, 117, 133, 0.16)"
      />
    </div>
  );
}
