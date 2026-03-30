// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { Platform } from "@/shared/types/global.types";
// import { FullscreenButton } from "@/shared/components/ui/fullscreenButton";
// import { gameAdaTimerTick, startCooldown } from "@/store/ad.slice";
// import { useAdsgram } from "@/features/ads/useAdsgram";
// import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
// import { saveActiveGame, saveGame } from "@/store/game.slice";
// import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
// import { useTelegramWebApp } from "../ads/useTelegramWebApp";

// const games = [
//   {
//     id: 1,
//     slug: "flappy",
//     title: "Flappy Bird",
//     url: "https://nebez.github.io/floppybird/",
//     description:
//       "Простая игра Flappy Bird. Управляй птичкой и избегай препятствий.",
//     img: "/images/flappy.jpg",
//   },
//   {
//     id: 2,
//     slug: "RIVALS FPS: Online Shooter",
//     title: "RIVALS FPS: Online Shooter",
//     url: "https://playgama.com/export/game/rivals-fps-online-shooter?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
//     description:
//       `💥Добро пожаловать в мир "RIVALS FPS: Online Shooter" — нового бесплатного многопользовательского онлайн-шутера, где вас ждут захватывающие сражения, крутое оружие и настоящая арена сражений! 🎮 Игра вдохновлена ​​такими топовыми шутерами, как Star Wars Battlefront и Battlefield. Здесь вы можете погрузиться в динамичные онлайн-сражения, объединиться с друзьями и продемонстрировать свои навыки стрельбы на арене. ⚙️ Особенности: - Онлайн-мультиплеер с друзьями - Шутер от первого лица - Яркая 3D-графика в красочном стиле - Множество интересных карт - Различные игровые режимы и таблицы лидеров - Играйте бесплатно прямо в браузере с вашего мобильного телефона или компьютера. Сражайтесь, улучшайте, меняйте оружие и получайте награды в эпических онлайн-битвах!`,
//     img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/aafa168c-5dd8-417e-2cde-f2e431aaeb00/w=800,fit=cover",
//   },
//   {
//     id: 3,
//     slug: "block-blast-puzzle-game",
//     title: "Block Blast",
//     url: "https://www.madkidgames.com/games/block-blast-puzzle-game",
//     description: "Собирай блоки и решай головоломки в Block Blast.",
//     img: "/images/blockblast.jpg",
//   },
//   {
//     id: 4,
//     slug: "Plants vs Zombies Fusion Mode",
//     title: "Plants vs Zombies Fusion Mode",
//     url: "https://playgama.com/export/game/plants-vs-zombies-fusion-mode?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
//     description:
//       "Добро пожаловать в обновлённый мир Plants vs. Zombies, где инновации переплетаются с традициями! В этой игре у вас есть возможность не только защищать свой дом от зомби с помощью армии растений, но и создавать уникальные гибридные растения, сочетающие в себе способности двух или более оригинальных растений. Эти гибриды предоставляют вам неограниченные тактические возможности для борьбы с новыми волнами зомби, которые стали умнее, сильнее и хитрее!",
//     img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/5a3c984d-4edd-4bf1-aebf-cf0e63e5c700/w=800,fit=cover",
//   },
//   {
//     id: 5,
//     slug: "Age of Tanks Warriors: TD War",
//     title: "Age of Tanks Warriors: TD War",
//     url: "https://playgama.com/export/game/age-of-tanks-warriors-td-war?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
//     description:
//       "Ведите своих танковых воинов к славе сквозь века! Добро пожаловать в Age of Tank Warriors: TD War, лучшую стратегическую игру про танковые сражения! Путешествуйте по эпохам войн, ведя свою танковую армию от воинов каменного века до научно-фантастического космического будущего. Улучшайте свои боевые танки, участвуйте в напряженных сражениях Clash of Tank Warriors и используйте стратегию защиты башен (TD), чтобы покорить каждую эпоху. Вас ждут сражения на выживание 100 на 100 — сможете ли вы переписать историю и стать величайшим танковым военачальником?",
//     img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/135c7e32-e800-4a05-9ea1-e40cae1ec400/w=800,fit=cover",
//   },
//   {
//     id: 6,
//     slug: "Tile Farm Story",
//     title: "Tile Farm Story",
//     url: "https://playgama.com/export/game/tile-farm-story?clid=p_7cdffc3d-c1ed-48f0-a15a-03452655879c",
//     description:
//       "Отправляйтесь в захватывающее приключение в Tile Farm Story, бесплатной онлайн-игре в жанре «три в ряд» с участием отважных сестер Стоун. Исследуйте уникальные локации, решайте головоломки и раскрывайте семейные тайны. Наслаждайтесь этой игрой в стиле маджонга на своем телефоне или компьютере, которая сочетает в себе увлекательные испытания и развлечения.",
//     img: "https://playgama.com/cdn-cgi/imagedelivery/LN2S-4p3-GgZvEx3IPaKUA/b3e8d7fc-f50f-4658-f90e-4a432541a600/w=800,fit=cover",
//   },
// ];




// export default function IframeGames() {
//   const dispatch = useAppDispatch();

//   const fullscreen = useAppSelector((state) => state.ad.fullscreen);
//   const activeGame = useAppSelector((state) => state.game.activeGame);
//   const platform = useAppSelector((state) => state.ad.platform);
//   const secondsGameLeft = useAppSelector((state) => state.ad.secondsGameLeft);
//   const cooldownGame = useAppSelector((state) => state.ad.cooldownGame);

//   const [isLandscape, setIsLandscape] = useState(false);

//   const onReward = useCallback(() => {
//     const date = Date.now() + 240 * 1000;
//     dispatch(startCooldown({ timer: date, type: "game" }));
//   }, [dispatch]);

//   useEffect(() => {
//     if (!cooldownGame) return;

//     const interval = setInterval(() => {
//       dispatch(gameAdaTimerTick());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [cooldownGame, dispatch]);

//   const onError = useCallback(() => {}, []);

//   const { showAd, isPreparing, countdown } = useAdsgram({
//     blockId: process.env.NEXT_PUBLIC_BLOCK_ID_INIT!,
//     onReward,
//     onError,
//   });

//   // orientation
//   useEffect(() => {
//     const checkOrientation = () => {
//       setIsLandscape(window.innerWidth > window.innerHeight);
//     };

//     window.addEventListener("resize", checkOrientation);
//     checkOrientation();

//     return () => window.removeEventListener("resize", checkOrientation);
//   }, []);

//   const { isFullscreen } = useTelegramWebApp(fullscreen);

//   const showBanner =
//     (platform === Platform.TDESKTOP && !fullscreen) ||
//     (platform !== Platform.TDESKTOP && !isLandscape);

//   const startGame = (url: string, title: string, id: number) => {
//     if (secondsGameLeft <= 0) {
//       showAd();
//     }

//     dispatch(saveGame({ id, name: title, href: "/games", url }));
//     dispatch(saveActiveGame({ url }));
//   };

//   const handlerExist = () => {
//     dispatch(saveActiveGame({ url: null }));
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-3">
//       <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />

//       <PlatformBackButton>
//         <FullscreenButton className="static" isFullscreen={isFullscreen} />
//       </PlatformBackButton>

//       <h1 className="text-5xl font-bold mt-4 mb-10 text-center tracking-wide">
//         Мини-Игры
//       </h1>

//       {/* GAME GRID */}
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
//         {games.map((game) => (
//           <div
//             key={game.id}
//             className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer border-2 border-gray-800 hover:border-indigo-500"
//             onClick={() => startGame(game.url, game.title, game.id)}
//           >
//             {/* PREVIEW */}
//             <div className="w-full h-48 bg-black overflow-hidden">
//               <img
//                 src={game.img}
//                 alt={game.title}
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-4">
//               <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
//               <p className="text-gray-400 text-sm">{game.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* GAME MODAL */}
//       {activeGame && (
//         <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50 animate-fadeIn">
//           {/* close */}
//           {showBanner && (
//             <PlatformBackButton onclick={handlerExist}>
//               <div className="flex justify-start px-2">
//                 <button
//                   className="text-white font-bold cursor-pointer hover:text-red-500 transition"
//                   onClick={handlerExist}
//                 >
//                   Выйти
//                 </button>
//               </div>
//             </PlatformBackButton>
//           )}

//           {/* banner */}
//           {showBanner && (
//             <div className="flex items-center justify-center bg-gray-800 bg-opacity-90 text-yellow-300 py-2 text-center text-sm font-medium mb-2 animate-fadeIn">
//               {platform === Platform.TDESKTOP ? (
//                 <div className="">
//                   💻 Для лучшего опыта: попробуйте полноэкранный режим.{" "}
//                   <FullscreenButton
//                     className="static  px-2 py-1"
//                     isFullscreen={isFullscreen}
//                   />
//                 </div>
//               ) : (
//                 "📱 Для лучшего опыта: попробуйте развернуть телефон."
//               )}
//             </div>
//           )}

//           {platform === Platform.TDESKTOP && !showBanner && (
//             <div>
//               <FullscreenButton className="" isFullscreen={isFullscreen} />
//             </div>
//           )}

//           {/* GAME IFRAME */}
//           <iframe
//             src={activeGame}
//             className="flex-1 w-full animate-fadeIn"
//             frameBorder="0"
//             loading="lazy"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// }
