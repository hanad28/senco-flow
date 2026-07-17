import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, FileText, BookOpen, PlusCircle, Trash2, User, Bot, Languages } from "lucide-react";
import { FamilyShell, AiLabel } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase } from "@/lib/family-case-store";
import { mockFamilyAi } from "@/lib/family-rag";
import { FAMILY_STATUTORY } from "@/lib/family-config";

export const Route = createFileRoute("/family/cases/$id/assistant")({
  component: AssistantScreen,
});

const SUGGESTED = [
  "What does the educational psychologist recommend for Maya?",
  "Does Section F address every need in Section B?",
  "What individual support is proposed for Maya?",
  "What might be missing from the draft?",
  "Why did you flag the communication outcome?",
  "What could I ask the local authority to clarify?",
];

function AssistantScreen() {
  const { t, lang } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [showEnglishFor, setShowEnglishFor] = useState<Record<string, boolean>>({});

  const ask = (q: string) => {
    if (!q.trim()) return;
    const question = q.trim();
    setInput("");
    dispatch({ type: "addAssistant", m: { role: "user", text: question, lang } });
    setPending(true);
    // Simulate latency for realism.
    setTimeout(() => {
      const resp = mockFamilyAi.ask(question, { lang, state });
      dispatch({
        type: "addAssistant",
        m: {
          role: "assistant",
          text: resp.text,
          lang,
          originalEnglish: resp.originalEnglish,
          citations: resp.citations,
          confidence: resp.confidence,
          limitations: resp.limitations,
          suggestedAction: resp.suggestedAction,
        },
      });
      setPending(false);
    }, 350);
  };

  return (
    <FamilyShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("assistant.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{t("assistant.subtitle")}</p>
          <div className="mt-3 rounded-md bg-info/10 border border-info/30 text-info-foreground text-xs p-3 flex items-start gap-2">
            <Sparkles className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{FAMILY_STATUTORY.aiDisclosure}</span>
          </div>
        </header>

        {state.assistant.length === 0 ? (
          <div className="rounded-lg border bg-surface p-5">
            <h2 className="text-sm font-semibold mb-3">{t("assistant.suggested")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(q)}
                  className="text-start rounded-md border bg-surface p-3 min-h-11 text-sm hover:bg-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ol className="space-y-4">
            {state.assistant.map((m) => (
              <li key={m.id}>
                {m.role === "user" ? (
                  <div className="flex items-start gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2.5 max-w-[85%] text-sm">
                      {m.text}
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0 mt-1"><User className="h-4 w-4" aria-hidden="true" /></div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-info/10 text-info-foreground grid place-items-center shrink-0 mt-1"><Bot className="h-4 w-4" aria-hidden="true" /></div>
                    <div className="flex-1 rounded-2xl rounded-tl-sm border bg-surface px-4 py-3 max-w-[85%] text-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <AiLabel>AI</AiLabel>
                        {m.confidence && <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Confidence: {m.confidence}</span>}
                        {m.lang !== "en" && m.originalEnglish && (
                          <button
                            type="button"
                            onClick={() => setShowEnglishFor((s) => ({ ...s, [m.id]: !s[m.id] }))}
                            className="ms-auto inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                          >
                            <Languages className="h-3 w-3" aria-hidden="true" />
                            {showEnglishFor[m.id] ? t("common.explainInMyLanguage") : t("common.showOriginalEnglish")}
                          </button>
                        )}
                      </div>
                      <p className="whitespace-pre-line">{showEnglishFor[m.id] && m.originalEnglish ? m.originalEnglish : m.text}</p>
                      {m.citations && m.citations.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Sources</div>
                          <ul className="space-y-1.5">
                            {m.citations.map((c) => (
                              <li key={c.id} className="rounded-md border bg-muted/30 p-2 text-xs">
                                <div className="flex items-start gap-1.5">
                                  {c.kind === "case_document" ? <FileText className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" /> : <BookOpen className="h-3.5 w-3.5 text-info-foreground shrink-0 mt-0.5" aria-hidden="true" />}
                                  <div className="flex-1">
                                    <div className="font-medium">{c.label}{c.page ? `, p.${c.page}` : ""}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                      {c.kind === "case_document" ? t("assistant.sourceCase") : t("assistant.sourceGuidance")}
                                    </div>
                                    {c.extract && <p className="mt-1 italic">“{c.extract}”</p>}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {m.limitations && <p className="text-[11px] text-muted-foreground border-t pt-2"><span className="font-medium">Limitations: </span>{m.limitations}</p>}
                      {m.suggestedAction && (
                        <div className="rounded-md bg-primary/5 border border-primary/20 p-2 text-xs flex items-start justify-between gap-2">
                          <span><span className="font-medium">Suggested next step: </span>{m.suggestedAction}</span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "addIssue",
                                issue: {
                                  origin: "family",
                                  section: "F",
                                  severity: "attention",
                                  category: "family_created",
                                  title: m.suggestedAction!.slice(0, 80),
                                  why: "Added from the Ask About the Plan conversation.",
                                  proposedAmendment: m.suggestedAction!,
                                  status: "drafted",
                                },
                              })
                            }
                            className="inline-flex items-center gap-1 text-primary hover:underline whitespace-nowrap"
                          >
                            <PlusCircle className="h-3 w-3" aria-hidden="true" />
                            {t("assistant.addToIssues")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
            {pending && (
              <li className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-8 w-8 rounded-full bg-info/10 grid place-items-center"><Bot className="h-4 w-4" aria-hidden="true" /></div>
                <span>Reading Maya's documents…</span>
              </li>
            )}
          </ol>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
          className="sticky bottom-4 bg-surface border rounded-xl p-2 flex items-end gap-2 shadow-sm"
        >
          <label htmlFor="assistant-input" className="sr-only">{t("assistant.placeholder")}</label>
          <textarea
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); }
            }}
            rows={1}
            placeholder={t("assistant.placeholder")}
            className="flex-1 resize-none rounded-md bg-transparent px-3 py-2 text-sm min-h-11 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            className="inline-flex items-center gap-1.5 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40"
            aria-label={t("assistant.send")}
          >
            <Send className="h-4 w-4" aria-hidden="true" /> {t("assistant.send")}
          </button>
        </form>

        {state.assistant.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "clearAssistant" })}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" /> {t("assistant.clear")}
          </button>
        )}
      </div>
    </FamilyShell>
  );
}
