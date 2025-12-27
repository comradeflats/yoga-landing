-- Clear existing data
DELETE FROM Booking;
DELETE FROM ClassSchedule;
DELETE FROM User;

-- Insert sample classes
INSERT INTO ClassSchedule (id, type, titleEn, titleRu, descEn, descRu, dayOfWeek, startTime, duration, capacity, isActive, createdAt) VALUES
('cls1', 'group', 'Morning Flow', 'Утренняя практика', 'Energizing vinyasa flow to start your day', 'Бодрящая виньяса-флоу для начала дня', 1, '09:00', 60, 15, 1, datetime('now')),
('cls2', 'group', 'Evening Relax', 'Вечерняя релаксация', 'Gentle stretches and relaxation', 'Мягкая растяжка и релаксация', 1, '19:00', 60, 15, 1, datetime('now')),
('cls3', 'group', 'Hatha Yoga', 'Хатха-йога', 'Traditional hatha practice for all levels', 'Традиционная практика хатха-йоги для всех уровней', 3, '10:00', 75, 12, 1, datetime('now')),
('cls4', 'recurring', 'Power Yoga', 'Силовая йога', 'Build strength and flexibility', 'Развитие силы и гибкости', 5, '18:00', 60, 20, 1, datetime('now')),
('cls5', 'group', 'Sunday Flow', 'Воскресная практика', 'Weekend vinyasa flow', 'Виньяса-флоу выходного дня', 0, '11:00', 90, 15, 1, datetime('now')),
('cls6', 'private', 'Private Session', 'Индивидуальное занятие', 'One-on-one personalized practice', 'Индивидуальная персонализированная практика', NULL, '14:00', 60, 1, 1, datetime('now'));
