CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean
TRUNCATE TABLE "Interest", "Idea", "Profile", "User" CASCADE;

-- Users
INSERT INTO "User" (id, email, password, role, "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 'alex.chen@allumnova.com', '$2b$10$EeLBRnrs2htJaCyPYEqrlOCEqq6THocyE5oPFgQQAGx3A3oT83B4Qi', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'sarah.miller@startup.io', '$2b$10$EeLBRnrs2htJaCyPYEqrlOCEqq6THocyE5oPFgQQAGx3A3oT83B4Qi', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'demo.founder@exchange.com', '$2b$10$EeLBRnrs2htJaCyPYEqrlOCEqq6THocyE5oPFgQQAGx3A3oT83B4Qi', 'USER', NOW(), NOW());

-- Profiles
INSERT INTO "Profile" (id, "userId", "firstName", "lastName", bio, skills, interests, "createdAt", "updatedAt", "avatarUrl") VALUES
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'alex.chen@allumnova.com'), 'Alex', 'Chen', 'Ex-Google PM with 10 years in AI. Looking to build decentralized compute networks.', ARRAY['AI/ML', 'Product Strategy', 'Rust'], ARRAY['Decentralization', 'Sustainability'], NOW(), NOW(), 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'),
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'sarah.miller@startup.io'), 'Sarah', 'Miller', 'UX Designer turned founder. Passionate about green energy and consumer hardware.', ARRAY['Product Design', 'Hardware', 'Marketing'], ARRAY['Green Tech', 'Social Impact'], NOW(), NOW(), 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'demo.founder@exchange.com'), 'Demo', 'Founder', 'The default demonstration account for the Startup Idea Exchange platform.', ARRAY['Business Dev', 'Idea Validation'], ARRAY['Everything Startup'], NOW(), NOW(), 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo');

-- Ideas
INSERT INTO "Idea" (id, title, description, category, stage, "equityOffer", tags, status, "founderId", "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 'NeuralFleet: Autonomous Drone Logistics', 'A decentralized swarm intelligence platform for managing autonomous drone deliveries in urban environments. We optimize for high-density traffic and battery efficiency.', 'AI/ML', 'Concept', 15.0, ARRAY['Drones', 'Logistics', 'Robotics'], 'OPEN', (SELECT id FROM "User" WHERE email = 'alex.chen@allumnova.com'), NOW(), NOW()),
(gen_random_uuid(), 'EcoTrace: Real-time Carbon Credits', 'Blockchain-based platform that tracks micro-level carbon emissions for SMBs and instantly converts reductions into tradeable carbon credits.', 'GreenTech', 'MVP Ready', 10.5, ARRAY['Web3', 'Sustainability', 'Fintech'], 'OPEN', (SELECT id FROM "User" WHERE email = 'sarah.miller@startup.io'), NOW(), NOW()),
(gen_random_uuid(), 'MindMesh: Cognitive Enhancing Wearables', 'EEG-integrated headsets that use subtle haptic feedback to improve focus and reduce stress levels for high-performance knowledge workers.', 'Health', 'In-Dev', 12.0, ARRAY['MedTech', 'Wearables', 'BioHacking'], 'OPEN', (SELECT id FROM "User" WHERE email = 'alex.chen@allumnova.com'), NOW(), NOW()),
(gen_random_uuid(), 'FluxPay: Programmable Payroll', 'Smart contract based payroll system that allows employees to be paid in real-time, per minute, with automated tax and pension deductions.', 'Fintech', 'Concept', 8.0, ARRAY['DeFi', 'Payments', 'Enterprise'], 'OPEN', (SELECT id FROM "User" WHERE email = 'demo.founder@exchange.com'), NOW(), NOW());
