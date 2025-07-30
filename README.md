# Sidewalks

A full-stack TypeScript application built with Next.js 15 and Express.js, featuring activity curation and discovery.

## Getting Started

### Development

Run the full-stack development environment:

```bash
bin/dev-all    # Frontend (port 3000) + Backend (port 3001)
```

Or run services individually:

```bash
bin/dev        # Frontend only (Next.js on port 3000)
bin/dev-server # Backend only (Express on port 3001)
```

### Testing

```bash
bin/test          # Run all tests
bin/test-watch    # Run tests in watch mode
bin/test-coverage # Run tests with coverage report
```

### Building & Quality

```bash
bin/build # Create production build
bin/lint  # Run ESLint code quality checks
```

Open [http://localhost:3000](http://localhost:3000) to view the frontend and [http://localhost:3001/api/health](http://localhost:3001/api/health) to check backend status.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Express.js 5, TypeScript, with CORS and Helmet security
- **Testing**: Jest with ts-jest and supertest
- **Development**: Hot reload with nodemon and ts-node

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
