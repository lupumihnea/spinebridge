import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const CATEGORY_WEIGHTS = {
  safetyLanguage: 25,
  demoCompleteness: 25,
  visualReadiness: 15,
  academicFidelity: 20,
  reliability: 15
};

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".css"]);
const SOURCE_DIRS = ["src/app", "src/components", "src/data", "src/lib", "src/tests"];
const USER_FACING_DIRS = ["src/app", "src/components", "src/data"];
const IGNORED_DIRS = new Set([".git", ".next", "node_modules", "coverage", "dist", "out"]);

const majorPages = [
  {
    route: "/",
    files: ["src/app/page.tsx", "src/components/demo/DemoLanding.tsx"]
  },
  {
    route: "/recovery-map",
    files: ["src/app/recovery-map/page.tsx", "src/components/framework/RecoveryMapPage.tsx"]
  },
  {
    route: "/journal",
    files: ["src/app/journal/page.tsx", "src/components/journal/PatientJournalPage.tsx"]
  },
  {
    route: "/teach-back",
    files: ["src/app/teach-back/page.tsx", "src/components/teach-back/TeachBackPage.tsx"]
  },
  {
    route: "/activities",
    files: ["src/app/activities/page.tsx", "src/components/work-vs-sport/WorkVsSportPage.tsx"]
  },
  {
    route: "/brief",
    files: ["src/app/brief/page.tsx", "src/components/brief/BriefGeneratorPage.tsx"]
  },
  {
    route: "/about",
    files: ["src/app/about/page.tsx"]
  },
  {
    route: "/jury",
    files: ["src/app/jury/page.tsx", "src/components/jury/JuryModePage.tsx"]
  }
];

const bannedAuthorizationPhrases = [
  /\bcleared\b/iu,
  /\bsafe\s+to\s+progress\b/iu,
  /\bapproved\s+for\s+sport\b/iu,
  /\btreatment\s+recommendation\b/iu,
  /\bapt\b/iu,
  /\bautorizat(?:ă|a|e|i)?\b/iu,
  /\bautorizeaz[ăa]\b/iu,
  /\bsigur(?:ă|a)?\s+pentru\s+progres\b/iu,
  /\baprobat(?:ă|a|e|i)?\s+pentru\s+sport\b/iu,
  /\brecomandare\s+de\s+tratament\b/iu,
  /\bsemn\s+de\s+alarmă\s+detectat\b/iu,
  /\baplicația\s+poate\s+decide\s+progresia\b/iu,
  /\bcriterii\s+universale\s+validate\s+pentru\s+acest\s+demo\b/iu
];

const placeholderPatterns = [
  /\bTODO\b/iu,
  /\bFIXME\b/iu,
  /\bTBD\b/iu,
  /\blorem\s+ipsum\b/iu,
  /\bcoming\s+soon\b/iu
];

const romanianMarkers = [
  /[ăâîșțĂÂÎȘȚ]/u,
  /\beducațional\b/iu,
  /\bclinică?\b/iu,
  /\bconsultație\b/iu,
  /\bmuncă\b/iu,
  /\bsport\b/iu,
  /\bsemnale?\s+de\s+alarmă\b/iu
];

const buildArtifactPatterns = [
  /\.next[\\/]/iu,
  /(^|[\\/])dist[\\/]/iu,
  /(^|[\\/])out[\\/]/iu,
  /(^|[\\/])coverage[\\/]/iu,
  /\.tsbuildinfo$/iu,
  /\.map$/iu
];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return "";
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function walk(directory) {
  const absoluteDirectory = path.join(root, directory);

  if (!fs.existsSync(absoluteDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(absoluteDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        files.push(...walk(path.join(directory, entry.name)));
      }
      continue;
    }

    const relativePath = path.join(directory, entry.name);
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(toPosix(relativePath));
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function makeFinding(severity, message, detail = "") {
  return { severity, message, detail };
}

function summarizeFinding(finding) {
  if (finding.detail) {
    return `${finding.severity.toUpperCase()} ${finding.message} (${finding.detail})`;
  }

  return `${finding.severity.toUpperCase()} ${finding.message}`;
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function hasAll(text, patterns) {
  return patterns.every((pattern) => pattern.test(text));
}

function isNegatedContext(line, matchIndex) {
  const before = line.slice(Math.max(0, matchIndex - 48), matchIndex);
  return /\b(nu|not|never|fără|fara|niciodată|niciodata)\b/iu.test(before);
}

function findBannedAuthorizationHits(files) {
  const hits = [];

  for (const file of files) {
    const lines = read(file).split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of bannedAuthorizationPhrases) {
        pattern.lastIndex = 0;
        const match = pattern.exec(line);

        if (!match) {
          continue;
        }

        if (isNegatedContext(line.toLocaleLowerCase("ro-RO"), match.index)) {
          continue;
        }

        hits.push(`${file}:${index + 1}: ${match[0]}`);
      }
    });
  }

  return hits;
}

function checkSafetyLanguage(files) {
  const userFacingFiles = files.filter((file) =>
    USER_FACING_DIRS.some((directory) => file.startsWith(`${directory}/`))
  );
  const safetyText = [
    read("src/data/safety.ts"),
    read("src/components/safety/DisclaimerCard.tsx"),
    read("src/components/demo/DemoLanding.tsx"),
    read("src/components/brief/BriefGeneratorPage.tsx"),
    read("src/components/journal/PatientJournalPage.tsx")
  ].join("\n");
  const appShellText = read("src/components/layout/AppShell.tsx");
  const layoutText = read("src/app/layout.tsx");

  const findings = [];
  const bannedHits = findBannedAuthorizationHits(userFacingFiles);

  if (bannedHits.length > 0) {
    findings.push(
      makeFinding(
        "fail",
        "Banned clinical authorization wording found in user-facing source",
        bannedHits.join("; ")
      )
    );
  }

  if (!hasAll(safetyText, [/Instrument educațional/iu, /Nu înlocuiește/iu, /echipa medicală/iu])) {
    findings.push(
      makeFinding("fail", "Core Romanian safety disclaimer text is missing or incomplete")
    );
  }

  if (!/TopNavigation/iu.test(appShellText) || !/AppShell/iu.test(layoutText)) {
    findings.push(
      makeFinding("fail", "Application shell is not mounted through the root layout")
    );
  }

  if (!/redFlags/iu.test(read("src/data/safety.ts")) || !/redFlagEscalation/iu.test(read("src/data/safety.ts"))) {
    findings.push(makeFinding("fail", "Red flag labels or escalation language are missing"));
  }

  return scoreCategory("Safety language", CATEGORY_WEIGHTS.safetyLanguage, findings);
}

function checkDemoCompleteness() {
  const findings = [];
  const patientData = read("src/data/demoPatients.ts");
  const seededPatientCount = (patientData.match(/\bid:\s*"/g) ?? []).length;

  if (seededPatientCount < 4 || !/seededPatients\s*=\s*demoPatients/iu.test(patientData)) {
    findings.push(
      makeFinding(
        "fail",
        "Seeded fictional patients are missing or too sparse",
        `found ${seededPatientCount}`
      )
    );
  }

  if (!exists("src/app/jury/page.tsx") || !/JuryModePage/iu.test(read("src/app/jury/page.tsx"))) {
    findings.push(makeFinding("fail", "Jury Mode route is missing"));
  }

  if (!exists("src/app/brief/page.tsx") || !/BriefGeneratorPage/iu.test(read("src/app/brief/page.tsx"))) {
    findings.push(makeFinding("fail", "Consultation brief route is missing"));
  }

  if (!exists("src/tests/redFlagTriggerPanel.test.tsx")) {
    findings.push(makeFinding("fail", "Red flag trigger tests are missing"));
  } else {
    const redFlagTest = read("src/tests/redFlagTriggerPanel.test.tsx");
    if (!hasAll(redFlagTest, [/Semn de alarmă selectat/iu, /slăbiciune nou apărută/iu, /brief/iu])) {
      findings.push(makeFinding("warn", "Red flag tests exist but do not cover the required demo flow"));
    }
  }

  if (!exists("src/data/seededJournalEntries.ts")) {
    findings.push(makeFinding("warn", "Seeded journal entries are missing"));
  }

  return scoreCategory("Demo completeness", CATEGORY_WEIGHTS.demoCompleteness, findings);
}

function checkVisualReadiness() {
  const findings = [];
  const tailwind = read("tailwind.config.ts");
  const globals = read("src/styles/globals.css");
  const topNavigation = read("src/components/layout/TopNavigation.tsx");
  const juryMode = read("src/components/jury/JuryModePage.tsx");
  const chart = read("src/components/framework/FrameworkChart.tsx");

  if (!hasAll(tailwind, [/clinical/iu, /graphite/iu, /signal/iu, /shadow/iu])) {
    findings.push(makeFinding("warn", "Professional Tailwind color or shadow tokens look incomplete"));
  }

  if (!/app-shell/iu.test(globals) || !/print-surface/iu.test(globals) || !/@media print/iu.test(globals)) {
    findings.push(makeFinding("warn", "Global shell or print styling proxy is incomplete"));
  }

  if (!/usePathname/iu.test(topNavigation) || !/aria-label/iu.test(topNavigation)) {
    findings.push(makeFinding("warn", "Top navigation readiness proxy is incomplete"));
  }

  if (!/2xl:text-7xl/iu.test(juryMode) || !/Jury Mode/iu.test(juryMode)) {
    findings.push(makeFinding("warn", "Jury Mode large-type readiness proxy is weak"));
  }

  if (!/role="list"/iu.test(chart) || !/emphasisByPatient/iu.test(chart)) {
    findings.push(makeFinding("warn", "Framework chart readability proxy is weak"));
  }

  return scoreCategory("Visual/presentation readiness proxy", CATEGORY_WEIGHTS.visualReadiness, findings);
}

function checkAcademicFidelity() {
  const findings = [];
  const about = read("src/app/about/page.tsx");
  const framework = read("src/data/framework.ts");
  const workSport = read("src/data/workVsSport.ts") + "\n" + read("src/components/work-vs-sport/WorkVsSportPage.tsx");
  const teachBack = read("src/components/teach-back/TeachBackPage.tsx") + "\n" + read("src/lib/teachBackAnalyzer.ts");
  const research = read("src/data/researchMaturity.ts") + "\n" + read("src/components/research/ResearchMaturityLadder.tsx");

  const frameworkDomainCount = (framework.match(/\border:\s*[1-5]/g) ?? []).length;
  if (frameworkDomainCount !== 5) {
    findings.push(
      makeFinding("fail", "The five educational domains are missing", `found ${frameworkDomainCount}`)
    );
  }

  if (
    !hasAll(about, [
      /18-40/iu,
      /fără leziune medulară/iu,
      /fără deficit neurologic obiectiv/iu,
      /educațional/iu,
      /nu prescriptiv/iu
    ])
  ) {
    findings.push(makeFinding("warn", "About page academic rationale proxy is incomplete"));
  }

  if (
    !hasAll(workSport, [/activitate/iu, /condus/iu, /ședere/iu, /sală/iu, /sport/iu]) ||
    !hasAny(workSport, [/fiecare\s+(alegere|activitate)/iu, /cerințe\s+diferite/iu])
  ) {
    findings.push(makeFinding("warn", "Activity-specific clarification framing is weak"));
  }

  if (!hasAll(teachBack, [/teach-back/iu, /durer/iu, /clinician/iu])) {
    findings.push(makeFinding("warn", "Teach-back educational boundary proxy is weak"));
  }

  if (!hasAll(research, [/Delphi/iu, /pilot/iu, /cohort/iu, /validare/iu])) {
    findings.push(makeFinding("warn", "Future validation roadmap proxy is incomplete"));
  }

  return scoreCategory("Academic fidelity", CATEGORY_WEIGHTS.academicFidelity, findings);
}

function checkReliability(files) {
  const findings = [];
  const packageJson = JSON.parse(read("package.json"));
  const userFacingFiles = files.filter((file) =>
    USER_FACING_DIRS.some((directory) => file.startsWith(`${directory}/`))
  );

  if (packageJson.scripts?.["demo:check"] !== "node scripts/demoQualityCheck.mjs") {
    findings.push(makeFinding("fail", "npm script demo:check is missing or points elsewhere"));
  }

  if (!exists("package-lock.json")) {
    findings.push(makeFinding("warn", "package-lock.json is missing"));
  }

  const placeholderHits = [];
  const artifactHits = [];

  for (const file of userFacingFiles) {
    const content = read(file);

    for (const pattern of placeholderPatterns) {
      if (pattern.test(content)) {
        placeholderHits.push(file);
        break;
      }
    }

    if (buildArtifactPatterns.some((pattern) => pattern.test(file))) {
      artifactHits.push(file);
    }
  }

  if (placeholderHits.length > 0) {
    findings.push(
      makeFinding(
        "fail",
        "Obvious placeholders found in user-facing source",
        unique(placeholderHits).join(", ")
      )
    );
  }

  if (artifactHits.length > 0) {
    findings.push(
      makeFinding("fail", "Build artifacts found inside user-facing source", unique(artifactHits).join(", "))
    );
  }

  if (!exists("src/tests/content.test.ts") || !exists("src/tests/safetyRules.test.ts")) {
    findings.push(makeFinding("warn", "Core content or safety tests are missing"));
  }

  return scoreCategory("Reliability", CATEGORY_WEIGHTS.reliability, findings);
}

function checkRomanianText() {
  const findings = [];

  for (const page of majorPages) {
    const missingFiles = page.files.filter((file) => !exists(file));
    if (missingFiles.length > 0) {
      findings.push(
        makeFinding("fail", `Core route ${page.route} is missing expected files`, missingFiles.join(", "))
      );
      continue;
    }

    const content = page.files.map((file) => read(file)).join("\n");
    if (!hasAny(content, romanianMarkers)) {
      findings.push(makeFinding("fail", `Core route ${page.route} does not expose Romanian UI text`));
    }
  }

  return findings;
}

function scoreCategory(name, weight, findings) {
  const failCount = findings.filter((finding) => finding.severity === "fail").length;
  const warnCount = findings.filter((finding) => finding.severity === "warn").length;
  const penalty = failCount * 8 + warnCount * 3;
  const points = Math.max(0, weight - penalty);

  return { name, weight, points, findings };
}

function printCategory(result) {
  const status = result.findings.some((finding) => finding.severity === "fail")
    ? "FAIL"
    : result.findings.length > 0
      ? "WARN"
      : "PASS";

  console.log(`${status} ${result.name}: ${result.points}/${result.weight}`);

  if (result.findings.length === 0) {
    console.log("  - No issues found.");
    return;
  }

  for (const finding of result.findings) {
    console.log(`  - ${summarizeFinding(finding)}`);
  }
}

function main() {
  const files = unique(SOURCE_DIRS.flatMap((directory) => walk(directory)));
  const romanianFindings = checkRomanianText();

  const results = [
    checkSafetyLanguage(files),
    checkDemoCompleteness(),
    checkVisualReadiness(),
    checkAcademicFidelity(),
    checkReliability(files)
  ];

  if (romanianFindings.length > 0) {
    const demoCompleteness = results.find((result) => result.name === "Demo completeness");
    demoCompleteness.findings.push(...romanianFindings);
    demoCompleteness.points = Math.max(0, demoCompleteness.points - romanianFindings.length * 4);
  }

  const score = results.reduce((total, result) => total + result.points, 0);
  const failCount = results.flatMap((result) => result.findings).filter((finding) => finding.severity === "fail").length;

  console.log("SpineBridge Live demo quality check");
  console.log("===================================");

  for (const result of results) {
    printCategory(result);
  }

  console.log("-----------------------------------");
  console.log(`Score: ${score}/100`);

  if (score < 90 || failCount > 0) {
    console.error(
      `Demo quality check failed: score must be at least 90 and critical failures must be fixed.`
    );
    process.exit(1);
  }

  console.log("Demo quality check passed.");
}

main();
