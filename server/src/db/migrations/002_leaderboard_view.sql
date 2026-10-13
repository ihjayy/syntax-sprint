-- VIEW AGGREGATING TOP PERFORMANCE PER USER PER LANGUAGE
CREATE OR REPLACE VIEW v_leaderboards AS
SELECT DISTINCT ON (tr.user_id, s.language)
  tr.id AS test_result_id,
  u.id AS user_id,
  u.username,
  s.language,
  tr.wpm,
  tr.accuracy,
  tr.time_seconds,
  tr.created_at
FROM test_results tr
JOIN users u ON tr.user_id = u.id
JOIN snippets s ON tr.snippet_id = s.id
ORDER BY tr.user_id, s.language, tr.wpm DESC, tr.accuracy DESC;