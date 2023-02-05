# Next.js 13 template

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

installed

- tailwind css
- eslint
- prettier


## What's new in next13


### New app Directory (Beta)

The app directory includes support for:


#### 【Layouts】

Easily share UI between routes while preserving state and avoiding expensive re-renders.

example ) ./app/layout.tsx && ./app/serverComponent/layout.tsx


#### 【Server Components】

Making server-first the default for the most dynamic applications.

example ) ./app/serverComponent/page.tsx


#### 【Streaming】

Display instant loading states and stream in units of UI as they are rendered.

example ) ./app/streaming/page.tsx && loading.tsx

