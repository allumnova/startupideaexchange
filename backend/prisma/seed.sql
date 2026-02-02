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
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'sarah.miller@startup.io'), 'Sarah', 'Miller', 'Angel investor focused on early-stage B2B SaaS and Crypto infra.', ARRAY['Venture Capital', 'GTM Strategy', 'Finance'], ARRAY['SaaS', 'Web3'], NOW(), NOW(), 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'demo.founder@exchange.com'), 'Demo', 'Founder', 'Building the future of startup networking.', ARRAY['Full Stack', 'Design'], ARRAY['Startups'], NOW(), NOW(), 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo');

-- Ideas
INSERT INTO "Idea" (id, "founderId", title, description, category, stage, "equityOffer", status, "createdAt", "updatedAt", tags) VALUES
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'alex.chen@allumnova.com'), 'NeuralFleet', 'Decentralized autonomous drone swarm logistics platform.', 'Deep Tech', 'Concept', 15.0, 'OPEN', NOW(), NOW(), ARRAY['AI', 'Drones', 'Logistics']),
(gen_random_uuid(), (SELECT id FROM "User" WHERE email = 'demo.founder@exchange.com'), 'GreenLease', 'Peer-to-peer sustainable equipment leasing marketplace.', 'Sustainability', 'MVP', 10.0, 'OPEN', NOW(), NOW(), ARRAY['Sustainability', 'Marketplace', 'Sharing Economy']);
