# Interaction with EVM blockchains

Данный проект содержит простые примеры подключения кошелька и вызова методов смарт-контракта (чтение и запись) в EVM-совместимых блокчейнах с использованием библиотек [wagmi](https://wagmi.sh/) и [viem](https://viem.sh/).

**Важно! Wagmi и viem работают только с EVM-совместимыми блокчейнами** (Ethereum, BSC, Arbitrum, Polygon и др.). Примеры не-EVM блокчейнов: Solana, TON, Tron, Bitcoin, Cardano.

Полный список поддерживаемых сетей: [wagmi.sh/react/api/chains](https://wagmi.sh/react/api/chains)

## Описание проекта

Подробное описание проекта доступно [здесь](./description.md). Крайне рекомендуется изучить разделы Introduction и Guides в [документации Wagmi](https://wagmi.sh/react/why).

## Установка

В корневой папке проекта выполните:

- `pnpm i` — установка зависимостей
- `pnpm run dev` — запуск dev-сервера

## Переменные окружения

Переменные заданы в файле `.env`, при необходимости замените на свои значения.

**Адреса контрактов:**

- `VITE_CONTRACT_ADDRESS_SEPOLIA` — адрес контракта в Sepolia (тестовая сеть Ethereum)
- `VITE_CONTRACT_ADDRESS_ETHEREUM` — адрес контракта в Ethereum (контракт отсутствует, но переменная нужна для наглядности работы с несколькими сетями)

**WalletConnect Project ID:**

- `VITE_WALLET_CONNECT_PROJECT_ID` — необходим для подключения кошелька через QR-код при помощи WalletConnect. Получить бесплатно можно [здесь](https://dashboard.reown.com). В production используйте Project ID заказчика.

**RPC эндпоинты:**

- `VITE_ETHEREUM_RPC_URL` — RPC URL для Ethereum
- `VITE_SEPOLIA_RPC_URL` — RPC URL для Sepolia

**Важно!** Не используйте публичные RPC URL — они нестабильны и имеют низкие лимиты. Если не указать собственные RPC URL, запросы будут отправляться через публичные ноды, что не рекомендуется. Получите приватные RPC URL у провайдеров, например [Alchemy](https://dashboard.alchemy.com) или [Quicknode](https://dashboard.quicknode.com). В production используйте RPC URL заказчика.
