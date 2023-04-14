import {
  Icon28CarOutline,
  Icon28ComputerOutline,
  Icon28HomeOutline,
  Icon28HorseToyOutline,
  Icon28SmartphoneOutline,
  Icon28TshirtOutline,
} from '@vkontakte/icons';

export const CATEGROIES = [
  { key: 'merch', text: 'Мерч', counter: 2, Icon: Icon28TshirtOutline },
  { key: 'child', text: 'Детские вещи', counter: 0, Icon: Icon28HorseToyOutline },
  { key: 'computer', text: 'Компьютерная техника', counter: 0, Icon: Icon28ComputerOutline },
  { key: 'electronics', text: 'Электроника', counter: 0, Icon: Icon28SmartphoneOutline },
  { key: 'transport', text: 'Транспорт', counter: 1, Icon: Icon28CarOutline },
  { key: 'realty', text: 'Недвижимость', counter: 0, Icon: Icon28HomeOutline },
  { key: 'stationery', text: 'Канцелярия', counter: 3, Icon: Icon28HomeOutline },
];

export const IMAGES_SRCS = [
  './images/items/hse/notebook.jpg',
  './images/items/vk/light-vkontakte1.jpg',
  './images/items/xsolla/mug-up-your-game.jpg',
  './images/items/arrival/shopper.jpg',
  './images/items/arrival/notebook.jpg',
];

export const GOODS = [
  { category: 'Канцелярия', name: 'Блокнот 1', src: './images/items/hse/notebook.jpg' },
  { category: 'Транспорт', name: 'Резина зимняя', src: './images/items/transport/wheel.jpeg' },
  { category: 'Канцелярия', name: 'Блокнот 2', src: './images/items/arrival/notebook.jpg' },
  { category: 'Мерч', name: 'Кружка', src: './images/items/xsolla/mug-up-your-game.jpg' },
  { category: 'Канцелярия', name: 'Блокнот VK', src: './images/items/vk/notebook-vk-team.jpg' },
  { category: 'Мерч', name: 'Худи', src: './images/items/xsolla/hoodie-enjoy-your-game0.jpg' },
  { category: 'Канцелярия', name: 'Еще один блокнот', src: './images/items/vk/rebook-vk-team.jpg' },
];
