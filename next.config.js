module.exports = {
  // postcssをキャッシュを介してパフォーマンスあげる？
  future: { strictPostcssConfiguration: true },
  // 国際化対応
  // このアプリは日本だよ
  i18n: { locales: ["ja"], defaultLocale: "ja" },
  // Reactの厳密なチェック
  // アプリケーションの潜在的な問題を強調するための開発モードのみの機能
  // 安全でないライフサイクル,レガシーAPIの使用法,およびその他の多くの機能を特定するのに役立つ
  reactStrictMode: true,
  // TypeScriptエラーが存在する場合ビルドに失敗する
  typescript: { ignoreDevErrors: true },
  // ESlintエラーが存在する場合ビルドに失敗する（いらなそう）
  eslint: { ignoreDuringBuilds: true },
  // pageの拡張子変更
  pageExtensions: ["page.tsx"],
  // よくわからん
  poweredByHeader: false,
  // 外部URLの画像を使うためにホスト名を指定しなきゃいけないやつっぽい
  images: {
    domains: ["storage.googleapis.com", "secure.gravatar.com", "avatars.slack-edge.com"],
  },
};
// https://nextjs.org/docs/api-reference/next.config.js/introduction
