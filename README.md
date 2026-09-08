# PDrive

A Google Drive–style file storage app built with Next.js, AWS S3, and AWS Amplify. Upload, organize, and manage files through a web interface backed by cloud storage.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- sign-up/login via OTP methods
- Upload files to S3 via pre-signed URLs
- filtering based on file type (image, video, audio, etc.)

## Planned / Not Yet Implemented
- uploading images/videos/other files
- getting previews of files that are uploaded
- hammer out any fixes with the logins


## Tech Stack
Framework: Next.js 16 (App Router)
UI: React 19, Tailwind CSS 4, shadcn + Base UI components, Lucide icons
Storage: AWS S3 via @aws-sdk/client-s3, with pre-signed URL uploads (@aws-sdk/s3-request-presigner)
Auth/Cloud: AWS Amplify
Forms/Validation: React Hook Form + Zod

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
