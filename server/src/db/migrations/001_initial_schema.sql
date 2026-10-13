-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

-- 2. SNIPPETS TABLE
CREATE TABLE IF NOT EXISTS snippets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    language VARCHAR(30) NOT NULL, -- 'typescript', 'sql', 'html', 'css', 'python'
    code_body TEXT NOT NULL,
    difficulty VARCHAR(15) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TEST RESULTS TABLE
CREATE TABLE IF NOT EXISTS test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    snippet_id UUID REFERENCES snippets(id) ON DELETE CASCADE,
    wpm NUMERIC(5, 2) NOT NULL,
    raw_wpm NUMERIC(5, 2) NOT NULL,
    accuracy NUMERIC(5, 2) NOT NULL,
    time_seconds INTEGER NOT NULL,
    total_mistakes INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. KEY MISS STATE TABLE (Symbol Heatmap Analytics)
CREATE TABLE IF NOT EXISTS key_miss_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_result_id UUID REFERENCES test_results(id) ON DELETE CASCADE, 
    char_expected VARCHAR(10) NOT NULL,
    char_typed VARCHAR(10) NOT NULL,
    miss_count INTEGER NOT NULL DEFAULT 1
);

-- PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_snippets_language ON snippets(language);
CREATE INDEX IF NOT EXISTS idx_test_results_user_snippet ON test_results(user_id, snippet_id);
CREATE INDEX IF NOT EXISTS idx_test_results_ranking ON test_results(wpm DESC, accuracy DESC);
CREATE INDEX IF NOT EXISTS idx_key_miss_result ON key_miss_stats(test_result_id);