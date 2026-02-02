module.exports = {
  branches: ["main", "master"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
  bumpFiles: [
    "package.json",
    { filename: "src/constants/version.ts", type: "json" },
  ],
  header:
    "# Changelog\n\nAll notable changes to this project will be documented in this file.\n",
  types: [
    { type: "feat", section: "✨ Features" },
    { type: "fix", section: "🐛 Bug Fixes" },
    { type: "docs", section: "📝 Documentation" },
    { type: "chore", section: "⚙️ Chores" },
  ],
  skip: {
    tag: false,
  },
};
