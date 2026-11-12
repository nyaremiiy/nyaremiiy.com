# nyaremiiy.com

Персональний сайт-портфоліо Назара Яремія — Software Engineer та ментора. Проєкт представляє досвід, навички, сертифікати, реалізовані роботи й формати менторства, а також містить форму для зв’язку.

## Основні можливості

- українська та англійська локалізації (`/` і `/en`);
- світла й темна теми зі збереженням вибору в `localStorage`;
- адаптивний інтерфейс без сторонніх UI-бібліотек;
- секції про досвід, навички, сертифікати, проєкти та менторство;
- завантаження резюме у PDF та адаптивний прев’ю першої сторінки;
- контактна форма з клієнтською і серверною валідацією;
- захист форми через honeypot і просте обмеження частоти запитів;
- SEO-метадані, canonical та `hreflang`, Open Graph і schema.org JSON-LD;
- автоматичні `sitemap.xml`, `robots.txt`, `manifest.webmanifest` і `llms.txt`;
- оптимізовані AVIF/WebP-зображення та HTTP-заголовки кешування і безпеки.

## Технології

- [Next.js](https://nextjs.org/) 16 з App Router;
- [React](https://react.dev/) 19;
- TypeScript у strict-режимі;
- CSS Modules і глобальні CSS-змінні;
- Playwright для візуальної перевірки.

## Локальний запуск

Потрібні Node.js і npm.

```bash
git clone https://github.com/nyaremiiy/nyaremiiy.com.git
cd nyaremiiy.com
npm install
npm run dev
```

Сайт буде доступний за адресою [http://localhost:3001](http://localhost:3001).

Для production-збірки:

```bash
npm run build
npm start
```

## Команди

| Команда | Призначення |
| --- | --- |
| `npm run dev` | Запускає development-сервер на порту `3001` |
| `npm run build` | Створює production-збірку |
| `npm start` | Запускає production-сервер на порту `3001` |
| `npm run lint` | Перевіряє типи через `tsc --noEmit` |

## Змінні середовища

Створіть `.env.local` у корені проєкту за потреби:

```env
SITE_URL=https://nyaremiiy.com
SUBMISSIONS_FILE=./data/submissions.jsonl
```

| Змінна | Опис |
| --- | --- |
| `SITE_URL` | Публічна адреса сайту для canonical, Open Graph, sitemap і JSON-LD |
| `SUBMISSIONS_FILE` | Шлях до JSONL-файлу із заявками з контактної форми |

Якщо `SUBMISSIONS_FILE` не задано, заявки зберігаються у `data/submissions.jsonl`. Каталог `data/` не потрапляє до Git.

> Контактна форма записує дані у файлову систему, тому в production потрібне постійне сховище. На serverless-платформах локальний файл може не зберігатися між запусками.

## Керування контентом

Основні дані винесені з компонентів:

| Контент | Файл |
| --- | --- |
| Переклади інтерфейсу | `src/i18n/uk.json`, `src/i18n/en.json` |
| Контакти та резюме | `src/data/profile.ts` |
| Проєкти | `src/data/projects.ts` |
| Досвід роботи | `src/data/experience.ts` |
| Навички | `src/data/skills.ts` |
| Сертифікати | `src/data/certificates.ts` |
| Менторські плани | `src/data/mentoring.ts` |

Зображення проєктів зберігаються у `public/images`, PDF-резюме — у `public/cv`. Після заміни PDF потрібно також оновити адаптивні прев’ю у `public/resume` та кількість сторінок у `src/data/profile.ts`.

## Контактна форма

Endpoint `POST /api/contact`:

- приймає ім’я та щонайменше один спосіб зв’язку — телефон або email/Telegram;
- повертає `422` для невалідних полів;
- повертає `429` після п’яти заявок з однієї IP-адреси протягом десяти хвилин;
- непомітно відсіює ботів через приховане honeypot-поле;
- зберігає кожну заявку окремим JSON-об’єктом у JSONL-файлі.

Формат запису містить ID, дату, локаль, ім’я, контактні дані, повідомлення та User-Agent. Дані заявок є персональними й не повинні потрапляти до репозиторію.

## Структура проєкту

```text
app/                    маршрути, metadata API та контактний endpoint
public/                 статичні зображення, іконка та резюме
scripts/                інструменти візуального порівняння
src/components/         компоненти сторінки та секцій
src/data/               структурований контент портфоліо
src/i18n/               словники локалізацій
src/lib/                SEO, навігація, валідація і збереження заявок
src/styles/             глобальні стилі й дизайн-токени
```

## Візуальна перевірка

У `scripts/` є допоміжні Playwright-скрипти для порівняння сторінки з референсними знімками та вимірювання блоків:

```bash
BASE_URL=http://localhost:3001 REF_DIR=path/to/refs node scripts/shoot.mjs projects 1440 output/
node scripts/measure.mjs path/to/reference.html http://localhost:3001/ '[["skills","#skills"]]'
```

Для запуску потрібен локально встановлений Chrome або значення `PW_CHANNEL` з назвою доступного браузерного каналу.
