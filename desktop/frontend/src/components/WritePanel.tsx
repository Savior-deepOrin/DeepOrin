import { useState, useMemo } from "react";
import { FileText, Eye, Code2, Columns2, Wand2, Pencil } from "lucide-react";
import { Markdown } from "./Markdown";

type WriteViewMode = "source" | "preview" | "split";

export function WritePanel({ onInsertIntoComposer }: { onInsertIntoComposer?: (text: string) => void }) {
  const [content, setContent] = useState<string>("# Write Mode\n\n在聊天框中输入写作指令，AI 会帮你创作和编辑文档。\n\n## 快速开始\n- `/write 主题` — 开始写新文档\n- `/polish 文件路径` — 润色现有文档\n- 直接在聊天框描述你的写作需求\n\n## 可用技能\n- **论文写作** (paper-writing) — Abstract/Introduction/Method/Experiments/Conclusion\n- **文档美化** (document-style) — 排版、格式、表格、代码规范\n- **文档自审** (self-review) — 审稿人视角的逻辑、结构和表达审查");
  const [viewMode, setViewMode] = useState<WriteViewMode>("split");
  const [editing, setEditing] = useState(false);

  const aiActions = useMemo(() => [
    { label: "润色文章", icon: <Wand2 size={14} />, text: "/polish " },
    { label: "美化格式", icon: <Pencil size={14} />, text: "请用 document-style 技能美化以下文档的排版格式：\n\n" + content.slice(0, 500) },
    { label: "审阅检查", icon: <FileText size={14} />, text: "请用 self-review 技能审查以下文档：\n\n" + content.slice(0, 500) },
    { label: "论文写作", icon: <Pencil size={14} />, text: "请用 paper-writing 技能帮我写" },
  ], [content]);

  return (
    <div className="write-panel">
      <div className="write-panel__toolbar">
        <div className="write-panel__modes">
          <button className={`write-panel__mode-btn${viewMode === "source" ? " write-panel__mode-btn--active" : ""}`} onClick={() => setViewMode("source")} title="源代码">
            <Code2 size={14} />
          </button>
          <button className={`write-panel__mode-btn${viewMode === "preview" ? " write-panel__mode-btn--active" : ""}`} onClick={() => setViewMode("preview")} title="预览">
            <Eye size={14} />
          </button>
          <button className={`write-panel__mode-btn${viewMode === "split" ? " write-panel__mode-btn--active" : ""}`} onClick={() => setViewMode("split")} title="分屏">
            <Columns2 size={14} />
          </button>
        </div>
        <div className="write-panel__actions">
          {aiActions.map((act, i) => (
            <button key={i} className="write-panel__ai-btn" onClick={() => onInsertIntoComposer?.(act.text)} title={act.label}>
              {act.icon}<span>{act.label}</span>
            </button>
          ))}
          <button className="write-panel__edit-btn" onClick={() => setEditing(!editing)}>
            <Pencil size={14} /> {editing ? "预览" : "编辑"}
          </button>
        </div>
      </div>
      <div className={`write-panel__main write-panel__main--${viewMode}`}>
        {(viewMode === "source" || viewMode === "split") && (
          <div className="write-panel__source">
            {editing ? (
              <textarea className="write-panel__textarea" value={content} onChange={(e) => setContent(e.target.value)} spellCheck={false} />
            ) : (
              <pre className="write-panel__preview-code" onClick={() => setEditing(true)}>{content}</pre>
            )}
          </div>
        )}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className="write-panel__preview">
            {content ? <Markdown text={content} /> : <div className="write-panel__empty"><Eye size={48} /><p>预览区域</p></div>}
          </div>
        )}
      </div>
    </div>
  );
}
