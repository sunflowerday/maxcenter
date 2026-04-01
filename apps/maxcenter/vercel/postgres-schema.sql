-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  member_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insights History
CREATE TABLE IF NOT EXISTS insights_history (
  id SERIAL PRIMARY KEY,
  member_id VARCHAR(255) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  insights JSONB NOT NULL,
  raw_html TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(member_id, period_start)
);

-- Deep Analysis Results
CREATE TABLE IF NOT EXISTS deep_analysis (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  result TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Discussions
CREATE TABLE IF NOT EXISTS discussions (
  id SERIAL PRIMARY KEY,
  member_id VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
