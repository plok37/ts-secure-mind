"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { transformerNotationFocus } from "@shikijs/transformers"
import { FileIcon, Copy, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useMemo } from "react"

interface CodeExample {
  id: string
  title: string
  filename: string
  language: string
  code: string
}

interface CodeDisplayProps {
  examples: CodeExample
  lightTheme: string
  darkTheme: string
  highlightColor?: string
  maxHeight?: string
}

export function CodeDisplay({
  examples,
  lightTheme,
  darkTheme,
  highlightColor,
  maxHeight = "270px",
}: CodeDisplayProps) {
  const { theme, systemTheme } = useTheme()
  const [highlightedCode, setHighlightedCode] = useState<Record<string, string>>({})
  const [focusStates, setFocusStates] = useState<Record<string, boolean>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme
    return currentTheme === "dark" ? darkTheme : lightTheme
  }, [theme, systemTheme, darkTheme, lightTheme])

  useEffect(() => {
    const newFocusStates: Record<string, boolean> = {}
    Object.entries(highlightedCode).forEach(([id, code]) => {
      newFocusStates[id] = code.includes('class="line focused"')
    })
    setFocusStates(newFocusStates)
  }, [highlightedCode])

  useEffect(() => {
    async function highlightAllCode() {
      try {
        const { codeToHtml } = await import("shiki")
        const { transformerNotationHighlight } = await import("@shikijs/transformers")

        const highlighted: Record<string, string> = {}

        // Only handle a single example object
        const example = examples
        const result = await codeToHtml(example.code, {
          lang: example.language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        })
        highlighted[example.id] = result

        setHighlightedCode(highlighted)
      } catch (error) {
        console.error("Error highlighting code:", error)
        const fallback: Record<string, string> = {}
        const example = examples
        fallback[example.id] = `<pre>${example.code}</pre>`
        setHighlightedCode(fallback)
      }
    }
    highlightAllCode()
  }, [examples, selectedTheme])

  const copyToClipboard = async (code: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedStates((prev) => ({ ...prev, [exampleId]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [exampleId]: false }))
      }, 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  const renderCode = (example: CodeExample) => {
    const highlighted = highlightedCode[example.id]
    const hasFocus = focusStates[example.id]
    const isCopied = copiedStates[example.id]

    if (highlighted) {
      return (
        <div
          style={{ "--highlight-color": highlightColor } as React.CSSProperties}
          className={cn(
            "h-full w-full overflow-auto bg-background font-mono text-xs",
            "[&>pre]:h-full [&>pre]:!w-full [&>pre]:py-2",
            "[&>pre>code]:!inline-block [&>pre>code]:!w-full",
            "[&>pre>code>span]:!inline-block [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:",
            // !bg-[var(--highlight-color)]", comment this for removing highlight color
            "group-hover:[&>pre>code>:not(.focused)]:!opacity-100 group-hover:[&>pre>code>:not(.focused)]:!blur-none",
            "group-hover:[&>pre>code>:not(.focused)]:transition-all group-hover:[&>pre>code>:not(.focused)]:duration-300",
            hasFocus && "[&>pre>code>:not(.focused)]:!opacity-50 [&>pre>code>:not(.focused)]:!blur-[0.095rem]",
            "[&>pre>code>:not(.focused)]:transition-all [&>pre>code>:not(.focused)]:duration-300",
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
          {example.code}
        </pre>
      )
    }
  }

  return (
    <div className="w-full">
      <div className="group relative w-full overflow-hidden rounded-md border border-border">
        <div className="flex items-center justify-between border-b border-black bg-slate-200 p-2 text-sm font-h3">
          <div className="flex items-center pl-3">
            <FileIcon className="mr-2 h-4 w-4" />
            {examples.filename}
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(examples.code, examples.id)}
            className="h-8 w-8 p-0 bg-transparent border-none cursor-pointer"
          >
            {copiedStates[examples.id] ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="overflow-auto" style={{ maxHeight }}>
          {renderCode(examples)}
        </div>
      </div>
    </div>
  )
}
