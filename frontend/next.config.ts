import type { NextConfig } from "next";
import withNextJsObfuscator from "nextjs-obfuscator";

// 1. Настройки обфускации
const obfuscatorOptions = {
  compact: true,
  stringArray: true,
  // stringArrayEncoding: ["base64"] as const, // TS требует уточнения для литералов
  rotateStringArray: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
};

// 2. Настройки самого плагина (какие файлы обрабатывать)
const pluginOptions = {
  enabled: true, // "detect" включит обфускацию только для build
  patterns: ["./.next/static/chunks/**/*.js"],
  obfuscateFiles: {
    buildManifest: true,
    ssgManifest: true,
    webpack: true,
    additionalModules: [], // Здесь можно указать пути к конкретным папкам, если не сработает
    log: true,
  },
};

// 3. Базовая конфигурация Next.js
const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BLOCK_ID: process.env.NEXT_PUBLIC_BLOCK_ID,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  // Успокаиваем Turbopack, если он захочет включиться
  turbopack: {},
};

// 4. Экспортируем обернутый конфиг
export default withNextJsObfuscator(
  obfuscatorOptions,
  pluginOptions
)(nextConfig);
