import markdownit from "markdown-it";
import { tasklist } from "@mdit/plugin-tasklist";
import { figure } from "@mdit/plugin-figure";
import { footnote } from "@mdit/plugin-footnote";
import { tab } from "@mdit/plugin-tab";

export interface MarkdownHeading {
    id: string;
    text: string;
    level: number;
}

export interface MarkdownRenderResult {
    html: string;
    headings: MarkdownHeading[];
}

export class Markdown {
    private static createParser() {
        const md = markdownit({
            html: true,
            linkify: true,
            typographer: true,
            breaks: true,
        });
        md.use(tasklist, {
            label: true,
        });
        md.use(figure);
        md.use(footnote);
        md.use(tab, {
            // 你的选项，name 是必填的
            name: "tabs",
        });

        return md;
    }

    private static createHeadingId(text: string, usedIds: Map<string, number>) {
        const baseId =
            text
                .toLowerCase()
                .trim()
                .normalize("NFKD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
                .replace(/\s+/g, "-") || "section";

        const currentCount = usedIds.get(baseId) ?? 0;
        usedIds.set(baseId, currentCount + 1);

        return currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
    }

    public static render(text: string) {
        return this.renderWithHeadings(text).html;
    }

    public static renderWithHeadings(text: string): MarkdownRenderResult {
        const md = this.createParser();
        const tokens = md.parse(text, {});
        const usedIds = new Map<string, number>();
        const headings: MarkdownHeading[] = [];

        for (let index = 0; index < tokens.length; index += 1) {
            const token = tokens[index];

            if (!token || token.type !== "heading_open") {
                continue;
            }

            const inlineToken = tokens[index + 1];
            const textContent = inlineToken?.content.trim();

            if (!textContent) {
                continue;
            }

            const id = this.createHeadingId(textContent, usedIds);
            const level = Number.parseInt(token.tag.replace("h", ""), 10);

            token.attrSet("id", id);
            headings.push({
                id,
                text: textContent,
                level,
            });
        }

        return {
            html: md.renderer.render(tokens, md.options, {}),
            headings,
        };
    }
}
