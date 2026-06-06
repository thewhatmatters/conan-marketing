import { useState } from "react";

// Skills / MCP tile for the Bento "Skills & MCP" panel. Mirrors the real Conan
// app HUD, where Skills and MCP are two TABS of one panel you toggle between
// (see ../conan/ui/src/components/Hud.tsx + lib/tabStyles.ts). VS Code-style
// flat tabs: the active tab is marked by a top accent border (ember here, the
// site's --primary) + a muted fill, not a pill. The Skills tab carries a
// User/System sub-toggle (pill-style, like the app's SkillsWidget). The
// selected list sits in a fixed-height, bottom-faded panel so it reads as even
// (and "continuing") whatever the list length.
//
// Data is authored in Bento.astro's frontmatter and passed in as props, keeping
// copy editable in the .astro per project conventions. Hydration-safe: the
// default tab ("skills") + group ("user") render identically on the server and
// first client paint; the only client state is which tab/group is active.

interface Skill {
  name: string;
  desc: string;
  path: string;
  fired?: string;
}
interface Server {
  name: string;
  url: string;
  status: string;
  ok: boolean;
}

const FADE = "linear-gradient(to bottom, #000 68%, transparent)";

export default function SkillsMcp({
  skillsUser,
  skillsSystem,
  servers,
  userCount = skillsUser.length,
  systemCount = skillsSystem.length,
}: {
  skillsUser: Skill[];
  skillsSystem: Skill[];
  servers: Server[];
  userCount?: number;
  systemCount?: number;
}) {
  const [tab, setTab] = useState<"skills" | "mcp">("skills");
  const [group, setGroup] = useState<"user" | "system">("user");

  const tabCls = (active: boolean) =>
    "shrink-0 rounded-none border-t px-3 py-1.5 text-xs transition-colors " +
    (active
      ? "border-primary bg-muted font-medium text-foreground"
      : "border-transparent text-muted-foreground hover:text-foreground");

  const pillCls = (active: boolean) =>
    "rounded-md px-2 py-0.5 text-[11px] transition-colors " +
    (active
      ? "bg-muted font-medium text-foreground"
      : "text-muted-foreground hover:bg-muted/60");

  const shown = group === "user" ? skillsUser : skillsSystem;

  return (
    <div className="flex flex-col">
      {/* Tab bar — Skills | MCP, with a contextual control group on the right:
          the User/System sub-toggle for Skills, server count + refresh for MCP. */}
      <div className="flex items-stretch border-b border-border">
        <button type="button" onClick={() => setTab("skills")} className={tabCls(tab === "skills")}>
          Skills
        </button>
        <button type="button" onClick={() => setTab("mcp")} className={tabCls(tab === "mcp")}>
          MCP
        </button>
        {tab === "skills" ? (
          <div className="ml-auto flex items-center gap-1 pr-0.5">
            <button type="button" onClick={() => setGroup("user")} className={pillCls(group === "user")}>
              User <span className={group === "user" ? "text-muted-foreground" : "opacity-60"}>{userCount}</span>
            </button>
            <button type="button" onClick={() => setGroup("system")} className={pillCls(group === "system")}>
              System <span className={group === "system" ? "text-muted-foreground" : "opacity-60"}>{systemCount}</span>
            </button>
          </div>
        ) : (
          <span className="ml-auto flex items-center gap-2 pr-1 text-[10px] text-muted-foreground/70">
            <span>{servers.length} servers</span>
            <span className="font-mono text-muted-foreground/60">↻ refresh</span>
          </span>
        )}
      </div>

      {/* Faded panel — fixed height + shared bottom gradient. */}
      <div
        className="relative mt-3 h-[268px] overflow-hidden"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        {tab === "skills" ? (
          <div>
            {shown.map((s) => (
              <div key={s.name} className="flex flex-col gap-1 border-b border-border/50 py-2.5">
                <span className="truncate text-[12px] font-semibold text-foreground">
                  {s.name}
                </span>
                <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                  {s.desc}
                </p>
                {s.fired && (
                  <span className="text-[10px] text-muted-foreground/70">last fired {s.fired}</span>
                )}
                <code className="truncate font-mono text-[10px] text-muted-foreground/70">
                  {s.path}
                </code>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {servers.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between gap-3 border-b border-border/50 py-2.5"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[12px] font-semibold text-foreground">
                    {m.name}
                  </span>
                  <span className="truncate font-mono text-[10px] text-muted-foreground/70">
                    {m.url}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className={"h-1.5 w-1.5 rounded-full " + (m.ok ? "bg-chart-1" : "bg-ember")} />
                  <span className="text-[11px] text-muted-foreground">{m.status}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
