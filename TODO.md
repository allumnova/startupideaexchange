# Startup Idea Exchange - Roadmap & TODO

This document tracks the progressive development of the platform across four key phases. 

> [!NOTE]
> AI features are intentionally excluded from this initial roadmap and will be added as a separate stage later.
> Deployment will happen at the **end of each phase** to ensure stability.

## Phase 1: Foundation (The Shell)
**Goal**: Establish the core architecture, design system, and user identity.
- [ ] **Database Setup**: Design and implement PostgreSQL schema (Users, Profiles).
- [ ] **Initial UI**: Setup Tailwind CSS with premium theme, fonts, and layout.
- [ ] **Authentication**: Secure Login/Signup/OAuth integration (Google/GitHub).
- [ ] **User Profile**: Basic dashboard for users to manage their identity.
- [ ] **Landing Page**: High-conversion hero section and "How it Works" guide.
- [ ] **STAGING DEPLOY**: Verify auth and UI on production server.

## Phase 2: Idea Management (The Core)
**Goal**: Enable the primary user action: sharing and browsing ideas.
- [ ] **Schema Update**: Add `ideas`, `categories`, and `votes` tables.
- [ ] **Idea Posting**: Multi-step form for sharing startup concepts.
- [ ] **Marketplace Feed**: Grid/List view with advanced filtering and sorting.
- [ ] **Idea Details**: dedicated page for each idea with discussion threads.
- [ ] **Search**: Implementation of full-text search for ideas.
- [ ] **PHASE 2 DEPLOY**: Live marketplace testing.

## Phase 3: Collaboration (The Matching)
**Goal**: Turn ideas into teams through cofounder matching and chat.
- [ ] **Cofounder Finder**: Matching algorithm based on skills and interests.
- [ ] **Messaging System**: Real-time chat (Socket.io) for collaborators.
- [ ] **Requests System**: "Interest" requests to collaborate on an idea.
- [ ] **Notifications**: In-app and email alerts for messages and matches.
- [ ] **PHASE 3 DEPLOY**: Test real-time features on server.

## Phase 4: Commerce & Polish (The Business)
**Goal**: Implement monetization, admin control, and education.
- [ ] **Marketplace Transactions**: Basic checkout flow for buying ideas.
- [ ] **Premium Plans**: Integration with payment gateway (Stripe/Razorpay).
- [ ] **Failed Startup Stories**: Educational blog/wiki section.
- [ ] **Admin Dashboard**: Moderation tools for users and idea listings.
- [ ] **SEO & Performance**: Final audit and production optimizations.
- [ ] **FINAL PRODUCTION LAUNCH**: Full feature set live.
