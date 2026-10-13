INSERT INTO snippets (title, language, code_body, difficulty) VALUES
('TypeScript Interface', 'typescript', 'interface User {\n  id: string;\n  name: string;\n  email?: string;\n}', 'easy'),
('PostgreSQL Join', 'sql', 'SELECT u.username, COUNT(t.id) AS total_tests\nFROM users u\nLEFT JOIN test_results t ON u.id = t.user_id\nGROUP BY u.id;', 'medium'),
('CSS Flex Center', 'css', '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', 'easy'),
('Python List Comp', 'python', 'squares = [x**2 for x in range(10) if x % 2 == 0]', 'easy');