# Описание

В проекте для работы с evm-блокчейнами используются современные библиотеки [wagmi](https://wagmi.sh/) и [viem](https://viem.sh/).

## Используемые библиотеки

На самом низком уровне всё взаимодействие с блокчейном происходит путём вызова JSON-RPC процедур. Но так как напрямую обращаться к JSON-RPC довольно сложно, существуют библиотеки которые предоставляют более удобное API для работы с блокчейном (но под капотом они всё так же вызывают JSON-RPC) - web3.js, ethers.js и более современный аналог - **viem**. 

**Wagmi** же в свою очередь использует viem, дополняя его новыми полезными функциями и добавляя готовые хуки React для удобного использования. То есть выходит, что Wagmi React использует Wagmi Core, который в свою очередь использует viem.

Помимо этого, Wagmi так же интегрирован с **tanstack/query**, что позволяет кэшировать все запросы в блокчейн и даёт другие преимущества из [tanstack/query](https://tanstack.com/query/latest). Базово, вам не нужно ничего знать о работе этой библиотеки, хотя если вы всё ещё с ней не знакомы, рекомендуем изучить и использовать на своих проектах.

## Подключение кошелька

Что бы пользователь мог подключить свой крипто кошелёк на ваш сайт, необходимо воспользоваться одним из [готовых решений](https://wagmi.sh/react/guides/connect-wallet#third-party-libraries) или написать [своё](https://wagmi.sh/react/guides/connect-wallet#build-your-own).

Из готовых решений ConnectKit и RainbowKit самые простые, они позволят подключить уже существующий кошелёк пользователя. Privy, Dynamic и AppKit позволяют пользователю создать кошелёк используя привычные web2 миру логин/пароль или вход через соц. сети (Google, Discord, Facebook, etc.), но при этом они хранят у себя информацию о пользователях, их кошельки и просят за это деньги у владельца сайта. 

В данном проекте используется RainbowKit, его конфигурацию можно найти в файле [Providers](./src/Providers.tsx). А кнопку подключения в компоненте [ConnectButton](./src/components/ConnectButton.tsx)

## Работа со смарт контрактом

Что бы работать со смарт контрактом, вам понадобится его адрес в сети, а так же ABI контракта. Если контракт при деплое был верифицирован, то ABI можно найти в блокчейн-эксплорере, найдя там ваш контракт. В противном случае попросите ABI у разработчика смарт контракта. ABI находится в файле [TrustlessOTC](./src/abi/TrustlessOTC.ts). Важно в конце константы указать `as const`, что бы у `wagmi` и `viem` работал автоматический вывод типов и подсказки на основе его.

### Чтение

Wagmi позволяет вызывать методы смарт контракта на чтение и запись. В файлах [useGetOfferDetails](./src/api/read/useGetOfferDetails.ts) и [useToken](./src//api/read/useToken.ts) показаны примеры использования хуков `useReadContract` и `useReadContracts`. Второй хук позволяет прочитать несколько методов смарт контракта батчем, экономя количество вызовов. Данные запрашиваются в файле [OfferDetails](./src/components/OfferDetails.tsx).

### Запись

В файле [useInitiateTrade](./src/api/write/useInitiateTrade.ts) показан пример записи в смарт контракт путём вызова хука `useWriteContract`. Данный хук возвращает метод `writeContract`, который можно вызвать, например, по нажатию на кнопку, что бы инициировать транзакцию ([initiateTradeButton](./src/components/InitiateTradeButton.tsx)). Пользователю понадобится нативная валюта сети, что бы оплатить газ за выполнение транзакции. 

#### Состояния транзакции

При работе с `useWriteContract` важно понимать разницу между тремя основными состояниями:

- **isPending** - транзакция ожидает подтверждения в кошельке пользователя. Это состояние активно с момента вызова `writeContract` до момента, когда пользователь подтвердит или отклонит транзакцию в своём кошельке.

- **isLoading** - транзакция была подписана пользователем и отправлена в блокчейн, но ещё не включена в блок. В этот момент транзакция находится в mempool и ожидает майнинга. Это состояние получается из хука `useWaitForTransactionReceipt`.

- **isSuccess** - транзакция успешно включена в блок и подтверждена сетью. Только на этом этапе можно считать, что изменения в смарт контракте применены. Это состояние получается из хука `useWaitForTransactionReceipt`.

#### Асинхронная версия и работа с хэшем

Помимо `writeContract`, хук также предоставляет асинхронную версию - `writeContractAsync`. Она возвращает Promise с хэшем транзакции, что позволяет использовать `async/await` синтаксис:

```typescript
import { useWriteContract, waitForTransactionReceipt } from "wagmi";
import { useConfig } from "wagmi";

const { writeContractAsync } = useWriteContract();
const config = useConfig();

const handleTrade = async () => {
  try {
    const hash = await writeContractAsync({
      address: contractAddress,
      abi: TRUSTLESS_OTC_ABI,
      functionName: "initiateTrade",
      args: [/* ... */],
    });
    
    console.log("Transaction hash:", hash);
    
    // Ожидаем подтверждения транзакции в блокчейне
    const receipt = await waitForTransactionReceipt(config, {
      hash,
    });
    
    console.log("Transaction confirmed:", receipt);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
