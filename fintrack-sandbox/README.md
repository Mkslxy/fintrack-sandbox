# FinTrack Sandbox

Застосунок для обліку особистих фінансів. Тут можна вести простий список доходів і витрат, швидко дивитися баланс та перевіряти історію операцій.

Проєкт зроблений як sandbox: без справжньої авторизації та без окремого backend. Дані для транзакцій зберігаються в `db.json` і віддаються через JSON Server.

## Що є в проєкті

- стартова сторінка з демо-формою входу та реєстрації;
- перехід у фінансовий кабінет після успішної демо-авторизації;
- список транзакцій з доходами та витратами;
- створення, редагування і видалення транзакцій;
- підтвердження перед видаленням;
- пошук, фільтр за типом операції та сортування;
- коротка статистика: баланс, доходи, витрати і кількість операцій.

## Стек

- React
- TypeScript
- Vite
- React Router
- Axios
- React Hook Form
- Zod
- Radix UI Alert Dialog
- JSON Server
- CSS Modules

## Запуск

Спочатку встановити залежності:

```bash
npm install
```

Запустити локальний API:

```bash
npm run server
```

JSON Server читає дані з `db.json` і за замовчуванням працює на `http://localhost:3000`.

В іншому терміналі запустити frontend:

```bash
npm run dev
```

Якщо потрібно змінити адресу API, можна задати `VITE_API_URL`. Якщо змінної немає, застосунок використовує `http://localhost:3000`.

## Скрипти

```bash
npm run dev
npm run server
npm run lint
npm run build
npm run preview
```

- `dev` - запуск Vite у режимі розробки.
- `server` - запуск JSON Server з `db.json`.
- `lint` - перевірка ESLint.
- `build` - TypeScript build і production-збірка Vite.
- `preview` - локальний перегляд production-збірки.

## Основна структура

```text
src/
  api/                 запити до JSON Server
  constants/           константи для транзакцій
  hooks/               логіка роботи зі state транзакцій
  pages/
    LandingPage/       стартова сторінка і демо-авторизація
    DashboardPage/     фінансовий кабінет
  schemas/             Zod-схеми для форм
  types/               TypeScript-типи
  utils/               форматування, фільтрація, мапери і розрахунки
```

Найважливіші файли:

- `src/App.tsx` - маршрути застосунку.
- `src/api/httpClient.ts` - налаштування Axios.
- `src/api/transactionsApi.ts` - CRUD-запити для транзакцій.
- `src/hooks/transaction/useTransaction.ts` - завантаження, створення, оновлення і видалення транзакцій.
- `src/pages/LandingPage/components/AuthPanel.tsx` - демо-форма входу/реєстрації.
- `src/pages/DashboardPage/DashboardPage.tsx` - основна сторінка фінансового кабінету.
- `db.json` - локальні дані для JSON Server.

## Нотатки

Авторизація тут мокова: форма перевіряє введені дані, імітує запит і після успіху переводить користувача на `/dashboard`.

Транзакції працюють через JSON Server. Це зручно для локальної розробки.
