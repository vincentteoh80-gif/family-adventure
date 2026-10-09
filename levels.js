/* 关卡数据 —— 想改关卡，直接改下面的文字和地图字符即可。
   地图图例：# 地面  B 砖块  = 单向平台  _ 桥(Xiang画画模式时消失)  ^ 尖刺
     o 金币  * 星星  i 物品  k 钥匙  C 存档点  G 终点  P 起点  e 走路敌人  f 飞行敌人
     ~ 左右移动平台  | 上下移动平台  N 同行角色起点  b 拿啤酒的朋友  D 酒桌  p 拍照点
     w 冷风区  L 灯笼  F 饮水机  M 家人  V 监控  H 厕所门(躲)  T 电视/手机  K 孩子
   roles: 不同角色的玩法和剧情（tat / yen / ze / xiang，parents=爸妈，kids=两兄弟） */
window.LEVELS = [
{
 "id": 1,
 "year": "2011",
 "title": "初次相遇",
 "gateName": "电影院",
 "theme": {
  "sky": [
   "#1d2b64",
   "#f8a5c2"
  ],
  "far": "city",
  "farColor": "#3d3a7a",
  "nearColor": "#5b4b9a",
  "groundTop": "#6c7a89",
  "groundBody": "#3b4252",
  "block": "#b0794a",
  "plank": "#e8c07a",
  "item": "heart",
  "enemy": "folder",
  "flyer": "germ"
 },
 "roles": {
  "tat": {
   "goal": "escort",
   "npc": "yen",
   "npcSpeed": 2.0,
   "need": 700,
   "item": "heart",
   "meterName": "约会勇气",
   "story": [
    "2011 年，Tat 和 Yen 在同一家公司上班。",
    "Tat 先喜欢上了 Yen，今天终于鼓起勇气约她去看电影！",
    "跟在 Yen 身边（别离太远），把勇气值存满，一起走到电影院。"
   ],
   "goalText": [
    "待在 Yen 附近，勇气值涨满",
    "陪她走到电影院"
   ],
   "lockMsg": "勇气还不够，多陪陪 Yen！"
  },
  "yen": {
   "goal": "follow",
   "npc": "tat",
   "npcSpeed": 2.6,
   "item": "heart",
   "meterName": "Tat 跟上了吗",
   "story": [
    "2011 年，Yen 发现公司里有个戴眼镜的男生老是“刚好”出现在她附近……",
    "他终于开口约她去看电影了！",
    "Yen 走在前面，可别走太快把 Tat 甩掉，一起到电影院。"
   ],
   "goalText": [
    "走在前面带路",
    "到电影院时 Tat 要在你身边"
   ],
   "lockMsg": "等等 Tat，他还没跟上来！"
  },
  "kids": {
   "goal": "collect",
   "item": "photo",
   "itemName": "爸妈的旧照片",
   "need": 5,
   "story": [
    "这是爸爸妈妈还没有你的时候……",
    "2011 年，Tat 和 Yen 在同一家公司认识，第一次约会是去看电影。",
    "收集 5 张爸妈的旧照片，拼出他们认识的故事！"
   ],
   "goalText": [
    "收集 5 张旧照片",
    "走到电影院"
   ],
   "lockMsg": "照片还没收集够！"
  }
 },
 "map": [
  "                                                                                                              ",
  "                                                                                                              ",
  "                                                                                                              ",
  "                                                                                                              ",
  "                                                                                                              ",
  "                                                                                                              ",
  "                                                                  *oo                                         ",
  "                                                                 ====                                         ",
  "                             *      ioo                      i                                                ",
  "                 oooo              =====                    ====           i                        *         ",
  "          oooo              BBBB              i                                         i   ooo i             ",
  "   P    N                 BBBBBB            e           C               ^^    e           BB            G     ",
  "##################  ##############################  ################################  ########################",
  "##################  ##############################  ################################  ########################"
 ]
},
{
 "id": 2,
 "year": "2012",
 "title": "婚礼日",
 "gateName": "婚礼礼堂",
 "theme": {
  "sky": [
   "#ffd6e0",
   "#fff5f8"
  ],
  "far": "hall",
  "farColor": "#f3c1d3",
  "nearColor": "#e9a6bf",
  "groundTop": "#8fd18f",
  "groundBody": "#c99a6b",
  "block": "#f7d9a8",
  "plank": "#ffffff",
  "item": "ring",
  "enemy": "gift",
  "flyer": "balloon"
 },
 "roles": {
  "tat": {
   "goal": "carry",
   "cargo": "bride",
   "cargoName": "抱着新娘",
   "speedMul": 0.78,
   "jumpMul": 0.9,
   "friendsDrop": true,
   "item": "ring",
   "story": [
    "2012 年，婚礼当天！",
    "朋友们拿着啤酒一直喊 Tat 去喝一杯，可是 Yen 的婚纱裙摆太长，走不快。",
    "Tat 决定抱着新娘走！跳过拿啤酒的朋友（碰到就会放下 Yen），把她平安抱进礼堂。"
   ],
   "goalText": [
    "抱着 Yen 走（变慢、跳得低）",
    "碰到拿啤酒的朋友或礼物盒会放下 Yen，要回去抱起来",
    "抱着她走进礼堂"
   ],
   "lockMsg": "新娘呢？回去把 Yen 抱过来！"
  },
  "yen": {
   "goal": "race",
   "npc": "tat",
   "npcSpeed": 1.9,
   "speed": 2.7,
   "item": "ring",
   "meterName": "抓住 Tat",
   "story": [
    "2012 年，婚礼当天！",
    "Tat 一溜烟跑去找朋友喝酒，Yen 拖着长长的婚纱裙摆追在后面。",
    "在 Tat 跑到酒桌之前抓住他，再一起走进礼堂！（按住“跳”可以让裙摆飘起来）"
   ],
   "goalText": [
    "在 Tat 到酒桌前追上他",
    "一起走进礼堂"
   ],
   "lockMsg": "新郎跑哪去了？先抓住 Tat！"
  },
  "kids": {
   "goal": "collect",
   "item": "photo",
   "itemName": "婚礼照片",
   "need": 5,
   "story": [
    "2012 年，爸爸妈妈结婚啦！",
    "听说那天爸爸急着去喝酒，妈妈的婚纱太长走不快。",
    "收集 5 张婚礼照片，走进礼堂看看那天的样子！"
   ],
   "goalText": [
    "收集 5 张婚礼照片",
    "走进礼堂"
   ],
   "lockMsg": "照片还没收集够！"
  }
 },
 "map": [
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                 i *                                            ",
  "                         oooo            *                      ====                              *             ",
  "        ooo       i                i     BB         i                         i       iooo                      ",
  "   P         N        e        b       BBBBBB   ^^     C    b         e           b          D         G        ",
  "##########################  ##############################################  ####################################",
  "##########################  ##############################################  ####################################"
 ]
},
{
 "id": 3,
 "year": "2012",
 "title": "巴厘岛蜜月",
 "gateName": "海边酒店",
 "theme": {
  "sky": [
   "#4fc3f7",
   "#e1f5fe"
  ],
  "far": "sea",
  "farColor": "#0288d1",
  "nearColor": "#26a69a",
  "groundTop": "#ffe08a",
  "groundBody": "#d9a95b",
  "block": "#a1683a",
  "plank": "#c8a165",
  "item": "food",
  "enemy": "crab",
  "flyer": "gull"
 },
 "base": {
  "autoscroll": 1.4
 },
 "roles": {
  "tat": {
   "goal": "collect",
   "item": "food",
   "itemName": "巴厘岛美食",
   "need": 8,
   "story": [
    "婚礼一周后，Tat 和 Yen 飞到了巴厘岛。",
    "两个人边走边吃，看风景、吃美食。",
    "画面会自己往前走！别掉队，沿路吃到 8 样美食。"
   ],
   "goalText": [
    "画面自动前进，别被甩在后面",
    "吃到 8 样美食",
    "回到海边酒店"
   ],
   "lockMsg": "还没吃够呢！"
  },
  "yen": {
   "goal": "photo",
   "item": "food",
   "need": 4,
   "story": [
    "婚礼一周后，Tat 和 Yen 飞到了巴厘岛。",
    "风景太美了，Yen 一路都想拍照！",
    "画面会自己往前走！站在相机标记上不动，拍下 4 张风景照。"
   ],
   "goalText": [
    "画面自动前进，别被甩在后面",
    "站在相机标记上不动，拍 4 张照",
    "回到海边酒店"
   ],
   "lockMsg": "照片还没拍够！"
  },
  "kids": {
   "goal": "collect",
   "item": "photo",
   "itemName": "蜜月照片",
   "need": 8,
   "story": [
    "爸妈结婚后去了巴厘岛度蜜月。",
    "他们看了很多地方，吃了很多东西。",
    "画面会自己往前走！收集 8 张蜜月照片。"
   ],
   "goalText": [
    "画面自动前进，别被甩在后面",
    "收集 8 张照片"
   ],
   "lockMsg": "照片还没收集够！"
  }
 },
 "map": [
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                                                                                  ",
  "                                                                          *                                                       ",
  "                            i *                                         i                                                         ",
  "                   i       ====               i            i           ====              i                       *                ",
  "      i ooo             i                i              i  B    i                   i         i        i      i     i             ",
  "   P         p                    p    e            p   BBBBB                p    e               p       ^^             G        ",
  "##################   ########################   ###################  ###################   #######################################",
  "##################   ########################   ###################  ###################   #######################################"
 ]
},
{
 "id": 4,
 "year": "2013",
 "title": "Ze 来了",
 "gateName": "温暖的家",
 "theme": {
  "sky": [
   "#81d4fa",
   "#e8f5e9"
  ],
  "far": "field",
  "farColor": "#7cb342",
  "nearColor": "#558b2f",
  "groundTop": "#66bb6a",
  "groundBody": "#8d6e63",
  "block": "#37474f",
  "plank": "#eeeeee",
  "item": "bottle",
  "enemy": "pawn",
  "flyer": "germ"
 },
 "roles": {
  "parents": {
   "goal": "carry",
   "cargo": "babyze",
   "cargoName": "抱着宝宝 Ze",
   "speedMul": 0.8,
   "jumpMul": 0.9,
   "item": "bottle",
   "story": [
    "2013 年，Ze 出生了！一家三口。",
    "抱着宝宝 Ze 回家。路上乱走的棋子兵会撞到你，宝宝会掉下来。",
    "跳过或踩扁棋子兵，把 Ze 平安抱回家。"
   ],
   "goalText": [
    "抱着宝宝 Ze（变慢、跳得低）",
    "被棋子兵撞到要回去抱起宝宝",
    "抱着宝宝回到家"
   ],
   "lockMsg": "宝宝呢？快回去抱 Ze！"
  },
  "ze": {
   "goal": "carry",
   "cargo": "ball",
   "cargoName": "带球",
   "speedMul": 0.8,
   "jumpMul": 0.9,
   "item": "bottle",
   "gateName": "球门",
   "story": [
    "Ze 最爱踢足球，也爱下棋。",
    "这次是一场足球加象棋的比赛！棋子兵会来抢球。",
    "带着足球闯过棋盘，一路带进球门！"
   ],
   "goalText": [
    "带着足球跑（变慢、跳得低）",
    "被棋子兵碰到球会掉，要回去捡",
    "带球冲进球门"
   ],
   "lockMsg": "球呢？把球带过来！"
  },
  "xiang": {
   "goal": "collect",
   "item": "photo",
   "itemName": "哥哥的宝宝照",
   "need": 5,
   "story": [
    "2013 年，哥哥 Ze 出生了。那时候还没有 Xiang 哦！",
    "收集 5 张哥哥小时候的照片。"
   ],
   "goalText": [
    "收集 5 张照片",
    "走到家门口"
   ],
   "lockMsg": "照片还没收集够！"
  }
 },
 "map": [
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                                                                                                ",
  "                                       i                               * i                                      ",
  "                          *           ====                   o        ====                    *                 ",
  "       ooo i             BB   i                         i    BB                      iooo    BB                 ",
  "   P           e       BBBB       e             C   ^^      BBBB  e              e         BBBB  e      G       ",
  "###################  #######################  ###############################  #################################",
  "###################  #######################  ###############################  #################################"
 ]
},
{
 "id": 5,
 "year": "2016",
 "title": "Xiang 来了",
 "gateName": "漫画屋",
 "theme": {
  "sky": [
   "#fff9c4",
   "#ffffff"
  ],
  "far": "paper",
  "farColor": "#ffcc80",
  "nearColor": "#ffb74d",
  "groundTop": "#4dd0e1",
  "groundBody": "#90a4ae",
  "block": "#ef5350",
  "plank": "#7e57c2",
  "item": "pencil",
  "enemy": "ink",
  "flyer": "ink"
 },
 "roles": {
  "xiang": {
   "goal": "reach",
   "draw": true,
   "ink": 3,
   "inkMax": 5,
   "item": "snack",
   "itemName": "零食",
   "story": [
    "2016 年，Xiang 出生了，一家四口到齐！",
    "Xiang 最爱画漫画，也很爱吃零食。",
    "遇到大坑时，跳起来按“画”在脚下画出一块平台！墨水用完就吃零食补充。"
   ],
   "goalText": [
    "大坑上方按“画”（电脑按 X 键）画出平台",
    "吃零食补充墨水",
    "走到漫画屋"
   ],
   "lockMsg": ""
  },
  "ze": {
   "goal": "escort",
   "npc": "babyxiang",
   "npcSpeed": 1.4,
   "need": 900,
   "item": "pencil",
   "meterName": "保护弟弟",
   "story": [
    "2016 年，弟弟 Xiang 出生了，Ze 当哥哥啦！",
    "小 Xiang 开始到处爬，Ze 要一路保护他。",
    "待在弟弟身边，踩扁靠近的墨水团，陪他爬到漫画屋。"
   ],
   "goalText": [
    "待在弟弟附近，保护值涨满",
    "陪他爬到漫画屋"
   ],
   "lockMsg": "再多陪陪弟弟！"
  },
  "tat": {
   "goal": "carry",
   "cargo": "babyxiang",
   "cargoName": "抱着宝宝 Xiang",
   "speedMul": 0.8,
   "jumpMul": 0.9,
   "item": "pencil",
   "story": [
    "2016 年，Xiang 出生了，一家四口到齐！",
    "Tat 抱着小 Xiang 去漫画屋。",
    "被墨水团碰到，宝宝会掉下来，要回去抱起来。"
   ],
   "goalText": [
    "抱着宝宝 Xiang",
    "被敌人碰到要回去抱起宝宝",
    "抱着宝宝到漫画屋"
   ],
   "lockMsg": "宝宝呢？快回去抱 Xiang！"
  },
  "yen": {
   "goal": "follow",
   "npc": "ze",
   "npcSpeed": 2.6,
   "item": "pencil",
   "meterName": "Ze 跟上了吗",
   "story": [
    "2016 年，Xiang 出生了，一家四口到齐！",
    "3 岁的 Ze 跟着妈妈出门，走得慢慢的。",
    "别把 Ze 甩在后面，一起走到漫画屋。"
   ],
   "goalText": [
    "带着 Ze 走，别走太快",
    "到漫画屋时 Ze 要在你身边"
   ],
   "lockMsg": "等等 Ze，他还没跟上来！"
  }
 },
 "map": [
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                                                                                                      ",
  "                                     f                        *   f                              f                    ",
  "                    o            *             o             ====                o                       *            ",
  "          i ooo           i     BB      i                i            i                i     i                        ",
  "   P   N                      BBBB                   C                   ^^                BB                 G       ",
  "#################______#####################______############################______#################  ###############",
  "#################      #####################      ############################      #################  ###############"
 ]
},
{
 "id": 6,
 "year": "云顶",
 "title": "云顶高原",
 "gateName": "免费酒店",
 "theme": {
  "sky": [
   "#90a4ae",
   "#eceff1"
  ],
  "far": "mountain",
  "farColor": "#78909c",
  "nearColor": "#546e7a",
  "groundTop": "#a5d6a7",
  "groundBody": "#6d4c41",
  "block": "#8d6e63",
  "plank": "#e53935",
  "item": "coat",
  "enemy": "price",
  "flyer": "germ"
 },
 "base": {
  "goal": "key",
  "temp": 0.04,
  "item": "coat",
  "keyName": "酒店房卡",
  "lockMsg": "先找到酒店房卡！"
 },
 "roles": {
  "tat": {
   "story": [
    "全家去云顶高原——有免费酒店可以住！",
    "山上好冷，冷风一吹体温就往下掉（看左上角的体温条）。",
    "捡外套保暖，坐缆车过山谷，躲开“太贵了”的价格牌，找到房卡和免费酒店！"
   ],
   "goalText": [
    "体温掉光会失去一条命，捡外套回暖",
    "冷风区（白色风线）掉得更快",
    "拿到房卡，走进免费酒店"
   ]
  },
  "yen": {
   "story": [
    "全家去云顶高原——Yen 最喜欢这里，因为天气凉快！",
    "Yen 不怕冷，体温掉得比别人慢一半。",
    "坐缆车过山谷，找到房卡，带全家住进免费酒店！"
   ],
   "goalText": [
    "Yen 不怕冷：体温掉得慢一半",
    "拿到房卡，走进免费酒店"
   ]
  },
  "kids": {
   "story": [
    "全家去云顶高原玩！",
    "山上好冷，冷风一吹体温就往下掉。",
    "捡外套保暖，找到房卡，住进免费酒店！"
   ],
   "goalText": [
    "体温掉光会失去一条命，捡外套回暖",
    "拿到房卡，走进免费酒店"
   ]
  }
 },
 "map": [
  "                                                                                                                            ",
  "                                                                                                                            ",
  "                                                                                                                            ",
  "                                                                                                                            ",
  "              wwwwww                    wwwwww                                wwwwww                                        ",
  "              wwwwww                    wwwwww                                wwwwww          k                             ",
  "              wwwwww                    wwwwww    *                           wwwwww         ===                            ",
  "              wwwwww                    wwwwww   i                            wwwwww      i                                 ",
  "              wwwwww                    wwwwww  BBBB      f                   wwwwww     ===                 f              ",
  "              wwwwww     ooo            wwwwww  BBBB                 ooo      wwwwww                  *         *           ",
  "       oooi   wwwwww              i     wwwwww  BBBB          i               wwiwww  ===                 i                 ",
  "   P          wwwwww  ~              e  wwww|w  BBBB   C          ~           wwwwww              e                 G       ",
  "######################         #############    ##################          ################################################",
  "######################         #############    ##################          ################################################"
 ]
},
{
 "id": 7,
 "year": "金马仑",
 "title": "金马仑高原",
 "gateName": "茶园小屋",
 "theme": {
  "sky": [
   "#b3e5fc",
   "#f1f8e9"
  ],
  "far": "tea",
  "farColor": "#689f38",
  "nearColor": "#33691e",
  "groundTop": "#7cb342",
  "groundBody": "#5d4037",
  "block": "#827717",
  "plank": "#a1887f",
  "item": "berry",
  "enemy": "snail",
  "flyer": "bee"
 },
 "base": {
  "goal": "collect",
  "fog": true,
  "item": "berry",
  "itemName": "草莓",
  "need": 8,
  "lockMsg": "草莓还没摘够！"
 },
 "roles": {
  "parents": {
   "story": [
    "下一站：金马仑高原。",
    "茶园起了大雾，只看得到身边一小圈。",
    "捡灯笼可以照亮更远，摘 8 颗草莓，到茶园小屋休息！"
   ],
   "goalText": [
    "大雾中只看得到附近，捡灯笼照亮",
    "摘 8 颗草莓",
    "走到茶园小屋"
   ]
  },
  "kids": {
   "story": [
    "全家来到金马仑高原的草莓园！",
    "大雾来了，只看得到身边一小圈。",
    "捡灯笼照亮，摘 8 颗草莓带回小屋给爸妈！"
   ],
   "goalText": [
    "大雾中只看得到附近，捡灯笼照亮",
    "摘 8 颗草莓",
    "走到茶园小屋"
   ]
  }
 },
 "map": [
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                *                         *                             ",
  "                                                               i                       i                                ",
  "                  i   f      *            i                   BBBB             f      ===                               ",
  "                 BB         ===          ====                 BBBB                                                      ",
  "      L  i     BBBB      i            L                i      BBBB      L  i       ===           i      i  L            ",
  "   P         BBBBBB         ^^^   e                 C     |   BBBB   e                              e           G       ",
  "###############################################   ########    ###############################  #########################",
  "###############################################   ########    ###############################  #########################"
 ]
},
{
 "id": 8,
 "year": "2026",
 "title": "合艾夜市",
 "gateName": "夜市大排档",
 "theme": {
  "sky": [
   "#0d1b3e",
   "#5c2a6e"
  ],
  "far": "market",
  "farColor": "#2c2357",
  "nearColor": "#4a2f6b",
  "groundTop": "#ff8a65",
  "groundBody": "#4e342e",
  "block": "#ffb300",
  "plank": "#ffca28",
  "item": "food",
  "enemy": "tuktuk",
  "flyer": "lantern"
 },
 "roles": {
  "tat": {
   "goal": "budget",
   "money0": 20,
   "need": 100,
   "item": "food",
   "story": [
    "2026 年 7 月 29 日，全家去合艾！",
    "Tat 是家里的“总管”，钱都是他管。夜市好吃的太多，钱包快不够了！",
    "捡金币存钱（每个 +RM5），被嘟嘟车撞到会掉 RM15。存够 RM100，请全家吃大排档！"
   ],
   "goalText": [
    "捡金币存钱，存够 RM100",
    "被嘟嘟车撞到会掉钱",
    "走到夜市大排档"
   ],
   "lockMsg": "钱还不够！再捡点金币"
  },
  "yen": {
   "goal": "key",
   "keyName": "番茄炒蛋",
   "keyKind": "dish",
   "item": "food",
   "story": [
    "2026 年 7 月 29 日，全家去合艾！",
    "Yen 最爱吃番茄炒蛋。",
    "在夜市里找到番茄炒蛋，再带全家去大排档！"
   ],
   "goalText": [
    "找到番茄炒蛋",
    "走到夜市大排档"
   ],
   "lockMsg": "还没找到番茄炒蛋！"
  },
  "xiang": {
   "goal": "collect",
   "item": "food",
   "itemName": "美食",
   "need": 10,
   "story": [
    "2026 年 7 月 29 日，全家去合艾！",
    "Xiang 最会吃，停不下来！",
    "吃遍夜市：吃到 10 样美食再去大排档！"
   ],
   "goalText": [
    "吃到 10 样美食",
    "走到夜市大排档"
   ],
   "lockMsg": "还没吃饱！"
  },
  "ze": {
   "goal": "reach",
   "slowFood": true,
   "item": "food",
   "itemName": "美食",
   "story": [
    "2026 年 7 月 29 日，全家去合艾！",
    "Ze 不太爱吃东西，看到食物就“吃不下了”。",
    "绕开路上的美食（碰到会撑得走不动），走到夜市大排档！"
   ],
   "goalText": [
    "避开美食：碰到会变慢一阵子",
    "走到夜市大排档"
   ],
   "lockMsg": ""
  }
 },
 "map": [
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                                        ",
  "                                                                                                   *                    ",
  "                                                                                                  k                     ",
  "                              oooo                                  ooo*                         ===                    ",
  "                ooo           ====         oo                       ====                      ooo            *          ",
  "      oooo i            i ooo         i    BB  i     oooo    i            i    oooo i      i  ===       i ooo  i        ",
  "   P          e                    e     BBBB      C      e                  e         ^^             e           G     ",
  "####################  ##########################################  ######################################################",
  "####################  ##########################################  ######################################################"
 ]
},
{
 "id": 9,
 "year": "日常",
 "title": "出门准备",
 "gateName": "大门",
 "theme": {
  "sky": [
   "#ffe0b2",
   "#fff8e1"
  ],
  "far": "home",
  "farColor": "#ffcc80",
  "nearColor": "#ffab91",
  "groundTop": "#bcaaa4",
  "groundBody": "#8d6e63",
  "block": "#a1887f",
  "plank": "#d7ccc8",
  "item": "mask",
  "enemy": "germwalk",
  "flyer": "germ"
 },
 "base": {
  "goal": "checklist",
  "itemKinds": [
   "wallet",
   "mask",
   "bottle"
  ],
  "order": [
   "mask",
   "bottle",
   "drink",
   "wallet",
   "key"
  ],
  "orderNames": [
   "戴口罩",
   "带水壶",
   "喝水",
   "带钱包",
   "带钥匙"
  ],
  "lockMsg": "还没准备好！看看下一步"
 },
 "roles": {
  "yen": {
   "goal": "deliver",
   "itemKinds": [
    "wallet",
    "mask",
    "bottle"
   ],
   "story": [
    "出门前，Yen 一定会说：",
    "“戴口罩、带水、喝水、带钱、带钥匙！”",
    "到处是流感病菌！跑到每个家人身边，帮他们戴好口罩，再一起出门。"
   ],
   "goalText": [
    "碰到家人 = 帮他戴好口罩（3 个人）",
    "躲开流感病菌",
    "走到大门"
   ],
   "lockMsg": "还有人没戴口罩！"
  },
  "parents": {
   "story": [
    "出门前，Yen 一定会说：",
    "“戴口罩、带水、喝水、带钱、带钥匙！”",
    "Tat 要按顺序一样一样准备好，顺序错了 Yen 会叫你回去！"
   ],
   "goalText": [
    "按顺序：戴口罩 → 带水壶 → 喝水 → 带钱包 → 带钥匙",
    "看左上角的“下一步”",
    "走到大门"
   ]
  },
  "kids": {
   "story": [
    "出门前，妈妈一定会说：",
    "“戴口罩、带水、喝水、带钱、带钥匙！”",
    "按顺序一样一样准备好，不然妈妈会叫你回去！"
   ],
   "goalText": [
    "按顺序：戴口罩 → 带水壶 → 喝水 → 带钱包 → 带钥匙",
    "看左上角的“下一步”",
    "走到大门"
   ]
  }
 },
 "map": [
  "                                                                                            ",
  "                                                                                            ",
  "                                                                                            ",
  "                                                                                            ",
  "                                                                                            ",
  "                                                                                            ",
  "                                                                        *                   ",
  "                                                                      k                     ",
  "                            f         oooo         f                 ===    f               ",
  "                        *             ====                                      *           ",
  "            ooo  i     BB      i            i            ooo      ===                       ",
  "   P     M           BBBB          M           C      F       M                      G      ",
  "############################################################################################",
  "############################################################################################"
 ]
},
{
 "id": 10,
 "year": "日常",
 "title": "妈妈回来了！",
 "gateName": "书桌",
 "theme": {
  "sky": [
   "#4a148c",
   "#f48fb1"
  ],
  "far": "home",
  "farColor": "#7b1fa2",
  "nearColor": "#ab47bc",
  "groundTop": "#ffcc80",
  "groundBody": "#795548",
  "block": "#5d4037",
  "plank": "#ffe082",
  "item": "trash",
  "enemy": "phone",
  "flyer": "germ"
 },
 "roles": {
  "kids": {
   "goal": "stealth",
   "time": 90,
   "item": "book",
   "story": [
    "爸妈出门了，电视和手机都偷偷开着……",
    "糟糕！Yen 快回来了，还会用监控 App 看家里！",
    "避开监控的光（躲进厕所门里），关掉 3 台电器，在时间内坐回书桌假装看书！"
   ],
   "goalText": [
    "别被监控的光照到（站在厕所门前可以躲）",
    "碰一下电视/手机 = 关掉（共 3 台）",
    "限时内坐回书桌"
   ],
   "lockMsg": "电视和手机还开着！"
  },
  "yen": {
   "goal": "catchkids",
   "time": 90,
   "item": "book",
   "story": [
    "Yen 打开监控 App 一看：两个孩子又在偷偷玩手机！",
    "Yen 回到家，孩子们马上假装在看书……",
    "看准他们偷偷拿起手机的时候抓住他们！两个都抓到再去书桌。"
   ],
   "goalText": [
    "孩子拿起手机（手机发光）时碰到他 = 抓到",
    "假装看书时抓不到",
    "两个都抓到后走到书桌"
   ],
   "lockMsg": "还有孩子没抓到！"
  },
  "tat": {
   "goal": "clean",
   "time": 80,
   "item": "trash",
   "itemName": "垃圾",
   "story": [
    "家里的家务几乎都是 Tat 包的。",
    "Yen 快回家了，家里还乱七八糟！",
    "限时内捡完全部垃圾，再坐到书桌前算账！"
   ],
   "goalText": [
    "限时内捡完全部垃圾",
    "走到书桌"
   ],
   "lockMsg": "还有垃圾没捡完！"
  }
 },
 "map": [
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                        V                       V                        V                          ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                           *                                       *    *           ",
  "        i         i            i       i          i          i             i          i             ",
  "   P          BBB    H      T      K   BB     H     T   C   BBB   K   H      T   BB          G      ",
  "####################################################################################################",
  "####################################################################################################"
 ]
},
{
 "id": 11,
 "year": "加分",
 "title": "番茄炒蛋大作战",
 "gateName": "",
 "theme": {
  "sky": [
   "#ffecb3",
   "#fff8e1"
  ],
  "far": "kitchen",
  "farColor": "#ffe0b2",
  "nearColor": "#ffcc80",
  "groundTop": "#bcaaa4",
  "groundBody": "#6d4c41",
  "block": "#a1887f",
  "plank": "#d7ccc8",
  "item": "tomato",
  "enemy": "germwalk",
  "flyer": "germ"
 },
 "base": {
  "goal": "catch",
  "need": 12,
  "every": 46
 },
 "roles": {
  "yen": {
   "story": [
    "Yen 最爱吃番茄炒蛋，最讨厌苦瓜！",
    "番茄和鸡蛋从天上掉下来了！",
    "接住 12 个番茄和鸡蛋，千万别碰到苦瓜！"
   ],
   "goalText": [
    "接住 12 个番茄 / 鸡蛋",
    "躲开苦瓜"
   ]
  },
  "parents": {
   "story": [
    "今晚 Tat 下厨，做老婆最爱的番茄炒蛋！",
    "番茄和鸡蛋从天上掉下来了！",
    "接住 12 个番茄和鸡蛋，千万别碰到 Yen 最讨厌的苦瓜！"
   ],
   "goalText": [
    "接住 12 个番茄 / 鸡蛋",
    "躲开苦瓜"
   ]
  },
  "kids": {
   "story": [
    "帮妈妈做她最爱的番茄炒蛋！",
    "番茄和鸡蛋从天上掉下来了！",
    "接住 12 个，千万别碰到苦瓜！"
   ],
   "goalText": [
    "接住 12 个番茄 / 鸡蛋",
    "躲开苦瓜"
   ]
  }
 },
 "map": [
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "             P            ",
  "##########################",
  "##########################"
 ]
},
];
