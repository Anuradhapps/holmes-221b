# Holmes 221B

A fictional detective operations dashboard built with Next.js and React. The app presents a themed workspace for managing investigations, schedules, tasks, notifications, locations, and case intelligence in the style of Sherlock Holmes.

## Overview

This project is a personal intelligence system for 221B Baker Street, designed around the following workflow:

- monitor the daily dashboard
- review active cases and investigation notes
- coordinate appointments and schedule conflicts
- manage tasks and priorities
- track locations and evidence
- keep notifications and settings organized

## Features

- Dashboard landing page with an operational overview
- Case management views and investigation detail flows
- Daily schedule with event creation and conflict handling
- Task tracking and prioritization area
- Notifications center
- Location and route-related pages
- Settings screen and app shell navigation
- Dark detective-themed UI using Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```text
src/
  app/
    dashboard/
    cases/
    schedule/
    tasks/
    notifications/
    locations/
    settings/
    deduction-board/
  components/
    dashboard/
    layout/
    schedule/
    tasks/
    ui/
```

## Notes

- The app redirects the home route to the dashboard.
- The schedule page includes event creation and overlap detection logic.
- Styling is intentionally crafted around a dark, moody, Victorian-inspired interface.

## License

This project is currently unlicensed unless you add one explicitly.
