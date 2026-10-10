/* 全部章节数据 —— 对话、任务、问答、地图都在这里，直接改文字就能更新。
   say = 一句对话（tat / yen / ze / xiang / npc / sys）；quiz = 问答（ok 是正确答案序号，从 0 开始）
   地图：# 墙 . 地板 , 地毯 g 草地 r 马路 s 人行道/沙滩 d 小路 n 冷草地 q 茶园 j 草莓田 W 厕所地砖 x 出口
        D 桌子 V 售货机 K 机器/收银台 T 桌子 p 盆栽 h 建筑 t 树 y 椰子树 w 水 B 长椅 l 灯 P 柱子 M 镜子
        b 床 u 沙发 k 厨房台 v 电视 c 婴儿床 S 货架 C 小摊 F 围栏 O 石像 f 花 A 舞台 = 红地毯 L 锁住的门 */
window.RPG_DATA = {
 "chapters": [
  {
   "chapter": 1,
   "title": "第一章：相遇与婚礼",
   "years": "2011 – 2012",
   "yenSkill": "love",
   "power": 1,
   "start": {
    "area": "office",
    "x": 5,
    "y": 21
   },
   "party": [
    "tat"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2011 年，一间普通的公司。"
    },
    {
     "say": "tat",
     "t": "（今天也要努力上班……咦？茶水间那个女生是谁？）"
    },
    {
     "say": "sys",
     "t": "操作：移动走路，“攻击”打怪，靠近人物按“对话”。"
    },
    {
     "quest": "q_hello"
    }
   ],
   "endText": "Tat 和 Yen 结婚啦！",
   "quests": {
    "q_hello": {
     "t": "去茶水间（右上方）跟 Yen 打招呼",
     "area": "office",
     "npc": "yen"
    },
    "q_docs": {
     "t": "打败 5 个文件怪，抢回 Yen 的报告",
     "area": "office",
     "group": "docs"
    },
    "q_report": {
     "t": "把报告交给 Yen，鼓起勇气约她",
     "area": "office",
     "npc": "yen"
    },
    "q_boss1": {
     "t": "打败大门口的加班大魔王",
     "area": "office",
     "enemy": "bossOT"
    },
    "q_go": {
     "t": "下班啦！从右边大门和 Yen 去街上",
     "area": "street",
     "x": 3,
     "y": 13
    },
    "q_tickets": {
     "t": "到电影院旁的售票处买票",
     "area": "street",
     "npc": "booth"
    },
    "q_queue": {
     "t": "赶走售票处的插队怪",
     "area": "street",
     "group": "queue"
    },
    "q_buy": {
     "t": "回售票处拿电影票",
     "area": "street",
     "npc": "booth"
    },
    "q_cinema": {
     "t": "和 Yen 走进电影院（第一次约会）",
     "area": "street",
     "x": 34,
     "y": 8
    },
    "q_ring": {
     "t": "打败礼物盒怪，打开化妆间的门",
     "area": "hall",
     "group": "gifts"
    },
    "q_ring2": {
     "t": "去右边的化妆间找戒指",
     "area": "hall",
     "x": 30,
     "y": 11
    },
    "q_host": {
     "t": "把戒指交给舞台上的主持人",
     "area": "hall",
     "npc": "host"
    },
    "q_boss2": {
     "t": "打败劝酒大王！",
     "area": "hall",
     "enemy": "bossBeer"
    },
    "q_vow": {
     "t": "回到舞台，完成婚礼",
     "area": "hall",
     "npc": "host"
    }
   },
   "areas": {
    "office": {
     "name": "公司 · 2011",
     "theme": "office",
     "map": [
      "####################################",
      "#p,,,,,,,,,,,,,,,,,p#..V.K........p#",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#,,DD,,DD,,DD,,DD,,,#..............#",
      "#,,,,,,,,,,,,,,,,,,,#........TT....#",
      "#,,,,,,,,,,,,,,,,,,,#........TT....#",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#,,DD,,DD,,DD,,DD,,,#p.............#",
      "#,,,,,,,,,,,,,,,,,,,#######..#######",
      "#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,p#",
      "#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#",
      "#,,DD,,DD,,DD,,DD,,,,,,,,,,,,,,,,,,x",
      "#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x",
      "#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#",
      "#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,p#",
      "#,,DD,,DD,,DD,,DD,,,######..########",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#,,,,,,,,,,,,,,,,,,,#....TTTTTT....#",
      "#,,DD,,DD,,DD,,DD,,,#....TTTTTT....#",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#,,,,,,,,,,,,,,,,,,,#..............#",
      "#p,,,,,,,,,,,,,,,,,p#p............p#",
      "####################################"
     ],
     "saves": [
      [
       2,
       21
      ]
     ],
     "exits": [
      {
       "x": 35,
       "y": 11,
       "w": 1,
       "h": 2,
       "need": "defeated_bossOT",
       "lock": "加班大魔王挡住了大门！",
       "script": [
        {
         "say": "yen",
         "t": "终于下班了！走吧，看电影去！"
        },
        {
         "goto": "street",
         "x": 2,
         "y": 13
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "yen",
       "look": "yen",
       "name": "Yen",
       "x": 28,
       "y": 3,
       "hideIf": "defeated_bossOT",
       "talks": [
        {
         "ifNot": "met",
         "script": [
          {
           "say": "sys",
           "t": "Tat 第一眼看到 Yen，就喜欢上她了。"
          },
          {
           "say": "tat",
           "t": "（要说什么好……我真的不太会说话……）"
          },
          {
           "say": "tat",
           "t": "你、你好！我是 Tat，坐在那边……那个……今天天气很好！"
          },
          {
           "say": "yen",
           "t": "（笑）你好～ 可是我现在好烦……"
          },
          {
           "say": "yen",
           "t": "我的报告被文件怪抢走了！下班前一定要交。"
          },
          {
           "say": "tat",
           "t": "交、交给我！我帮你抢回来！"
          },
          {
           "flag": "met"
          },
          {
           "quest": "q_docs"
          }
         ]
        },
        {
         "if": "gotReport",
         "ifNot": "dateYes",
         "script": [
          {
           "say": "tat",
           "t": "你的报告，全部抢回来了！"
          },
          {
           "say": "yen",
           "t": "哇，谢谢你！你人真好。"
          },
          {
           "say": "tat",
           "t": "那个……我、我喜欢你！下班以后……要不要一起去看电影？"
          },
          {
           "say": "yen",
           "t": "……好啊！"
          },
          {
           "say": "tat",
           "t": "（耶！！！她答应了！）"
          },
          {
           "flag": "dateYes"
          },
          {
           "spawn": true
          },
          {
           "say": "sys",
           "t": "糟糕！加班大魔王出现在大门口，不让任何人下班！"
          },
          {
           "quest": "q_boss1"
          }
         ]
        },
        {
         "if": "dateYes",
         "script": [
          {
           "say": "yen",
           "t": "加油！打败加班大魔王，我们就可以去看电影了！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "yen",
           "t": "文件怪就在办公室里乱跑，小心哦！"
          }
         ]
        }
       ]
      },
      {
       "id": "amin",
       "look": "amin",
       "name": "阿明",
       "x": 9,
       "y": 13,
       "talks": [
        {
         "if": "cleared_meeting",
         "ifNot": "gearGlasses",
         "script": [
          {
           "say": "npc",
           "t": "会议室终于安全了！谢谢你，Tat！"
          },
          {
           "say": "npc",
           "t": "这副新眼镜送你，戴上看得更清楚，攻击力 +2！"
          },
          {
           "gear": "glasses"
          },
          {
           "flag": "gearGlasses"
          }
         ]
        },
        {
         "if": "gearGlasses",
         "script": [
          {
           "say": "npc",
           "t": "新眼镜很适合你！听说你要约 Yen？加油啊～"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "Tat，救命！会议室被咖啡杯怪占领了，它们会喷咖啡！"
          },
          {
           "say": "npc",
           "t": "（支线任务）帮我把会议室的怪赶走，我送你好东西。"
          }
         ]
        }
       ]
      },
      {
       "id": "lily",
       "look": "lily",
       "name": "八卦同事",
       "x": 31,
       "y": 6,
       "talks": [
        {
         "ifNot": "quiz1",
         "script": [
          {
           "say": "npc",
           "t": "嘿嘿，Tat，我什么八卦都知道！考考你："
          },
          {
           "quiz": "Tat 和 Yen 是哪一年认识的？",
           "who": "npc",
           "a": [
            "2009 年",
            "2011 年",
            "2013 年"
           ],
           "ok": 1,
           "good": [
            {
             "say": "npc",
             "t": "答对了！就是今年，2011 年！奖励你 20 经验和一个便当。"
            },
            {
             "exp": 20
            },
            {
             "give": "bento",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "哈哈，不对～ 是 2011 年，就是今年啦！"
            }
           ]
          },
          {
           "flag": "quiz1"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "我看到你一直偷看 Yen 哦～ 是你先喜欢她的吧？嘻嘻。"
          }
         ]
        }
       ]
      },
      {
       "id": "vend",
       "look": "none",
       "name": "自动售货机",
       "x": 23,
       "y": 2,
       "talks": [
        {
         "script": [
          {
           "choice": "自动售货机：要买便当吗？（回复一半体力）",
           "who": "npc",
           "opts": [
            {
             "t": "买便当（15 金币）",
             "ops": [
              {
               "buy": "bento",
               "price": 15
              }
             ]
            },
            {
             "t": "不用了",
             "ops": []
            }
           ]
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "folder",
       "x": 6,
       "y": 5,
       "group": "docs"
      },
      {
       "type": "folder",
       "x": 14,
       "y": 5,
       "group": "docs"
      },
      {
       "type": "folder",
       "x": 17,
       "y": 9,
       "group": "docs"
      },
      {
       "type": "folder",
       "x": 9,
       "y": 9,
       "group": "docs"
      },
      {
       "type": "folder",
       "x": 13,
       "y": 17,
       "group": "docs"
      },
      {
       "type": "folder",
       "x": 17,
       "y": 21
      },
      {
       "type": "folder",
       "x": 2,
       "y": 13
      },
      {
       "type": "cup",
       "x": 23,
       "y": 17,
       "group": "meeting"
      },
      {
       "type": "cup",
       "x": 32,
       "y": 20,
       "group": "meeting"
      },
      {
       "type": "folder",
       "x": 28,
       "y": 21,
       "group": "meeting"
      },
      {
       "type": "bossOT",
       "x": 31,
       "y": 11,
       "id": "bossOT",
       "boss": true,
       "if": "dateYes",
       "onDefeat": [
        {
         "say": "sys",
         "t": "加班大魔王被打败了！大门打开了。"
        },
        {
         "say": "yen",
         "t": "Tat，你好厉害！我们走吧！"
        },
        {
         "quest": "q_go"
        }
       ]
      }
     ],
     "groups": {
      "docs": [
       {
        "say": "sys",
        "t": "你抢回了 Yen 的报告！"
       },
       {
        "flag": "gotReport"
       },
       {
        "quest": "q_report"
       }
      ],
      "meeting": [
       {
        "say": "sys",
        "t": "会议室安全了！回去告诉阿明吧。"
       }
      ]
     },
     "chests": [
      {
       "id": "o1",
       "x": 33,
       "y": 21,
       "give": "bento",
       "n": 1,
       "coins": 10
      }
     ],
     "triggers": []
    },
    "street": {
     "name": "街上 · 2011 晚上",
     "theme": "street",
     "night": true,
     "map": [
      "tttttttttttttttttttttttttttttttttttttttttttt",
      "tggggggggggggggggggggggggggggggggggggggggggt",
      "tghhhhhhhhhhhhhhhhhhhggggggghhhhhhhhhhhhhhgt",
      "tghhhhhhhhhhhhhhhhhhhggggggghhhhhhhhhhhhhhgt",
      "tghhhhhhhhhhhhhhhhhhhgfffffghhhhhhhhhhhhhhgt",
      "tghhhhhhhhhhhhhhhhhhhggggggghhhhhhhhhhhhhhgt",
      "tghhhhhhhhhhhhhhhhhhhggggggghhhhhhhhhhhhhhgt",
      "tghhhhhhhhhhhhhhhhhhhggggggghhhhhhhhhhhhhhgt",
      "tggggggggggggggggggggggggggghhhhhhxxhhhhhhgt",
      "tggggggggggggggggggggggggggggggggggggggggggt",
      "tssssslssssssssslsssssssssssssssssssssssssst",
      "tsssssssssssssssssssssssssssssssssssssssssst",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "tssssssssssssssssssssssssslssssssssssslsssst",
      "tsssssssssssssssssssssssssssssssssssssssssst",
      "tggggggggggggggggggggggggggggggggggggggggggt",
      "tggggBgggggggggBggggggtggggtgggggggggggggggt",
      "tgggggggwwwwwgggggggggggggggggggggggggggtggt",
      "tggtggggwwwwwggggggtggggggggggtggggggggggggt",
      "tgggggggwwwwwgtggggggggggggggggggggggggggggt",
      "tgggggggggggggggggggggggggggggggggggtggggggt",
      "tgtgggtgggggggggggggggggtggggggggggggggggggt",
      "tggggggggggggggggggggggggggggggggggggggggggt",
      "tttttttttttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       4,
       16
      ]
     ],
     "exits": [
      {
       "x": 34,
       "y": 8,
       "w": 2,
       "h": 1,
       "need": "tickets",
       "lock": "要先买电影票！",
       "script": [
        {
         "say": "sys",
         "t": "两人走进电影院，一起看了第一场电影。这是他们的第一次约会！"
        },
        {
         "say": "yen",
         "t": "电影好好看！"
        },
        {
         "say": "tat",
         "t": "（其实我一直在偷看你……）"
        },
        {
         "say": "sys",
         "t": "就这样，Tat 和 Yen 开始交往了。"
        },
        {
         "say": "sys",
         "t": "一年后……2012 年，婚礼当天！"
        },
        {
         "look": "yen",
         "v": "bride"
        },
        {
         "goto": "hall",
         "x": 16,
         "y": 25
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "booth",
       "look": "booth",
       "name": "售票员",
       "x": 31,
       "y": 10,
       "talks": [
        {
         "if": "cleared_queue",
         "ifNot": "tickets",
         "script": [
          {
           "say": "npc",
           "t": "谢谢你们赶走插队怪！两张电影票，祝你们约会愉快～"
          },
          {
           "flag": "tickets"
          },
          {
           "quest": "q_cinema"
          }
         ]
        },
        {
         "if": "tickets",
         "script": [
          {
           "say": "npc",
           "t": "电影快开始了，快进去吧！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "救命！一群插队怪把售票处挤爆了，我没办法卖票！"
          },
          {
           "say": "tat",
           "t": "交给我们！"
          },
          {
           "flag": "askedBooth"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_queue"
          }
         ]
        }
       ]
      },
      {
       "id": "pop",
       "look": "pop",
       "name": "爆米花阿伯",
       "x": 22,
       "y": 10,
       "talks": [
        {
         "script": [
          {
           "say": "npc",
           "t": "看电影怎么能没有吃的？"
          },
          {
           "choice": "爆米花阿伯：要买便当吗？",
           "who": "npc",
           "opts": [
            {
             "t": "买便当（15 金币）",
             "ops": [
              {
               "buy": "bento",
               "price": 15
              }
             ]
            },
            {
             "t": "不用了",
             "ops": []
            }
           ]
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "cutter",
       "x": 27,
       "y": 10,
       "group": "queue",
       "if": "askedBooth"
      },
      {
       "type": "cutter",
       "x": 30,
       "y": 9,
       "group": "queue",
       "if": "askedBooth"
      },
      {
       "type": "cutter",
       "x": 33,
       "y": 11,
       "group": "queue",
       "if": "askedBooth"
      },
      {
       "type": "cutter",
       "x": 36,
       "y": 9,
       "group": "queue",
       "if": "askedBooth"
      },
      {
       "type": "mosquito",
       "x": 6,
       "y": 22
      },
      {
       "type": "mosquito",
       "x": 14,
       "y": 23
      },
      {
       "type": "mosquito",
       "x": 18,
       "y": 19
      },
      {
       "type": "mosquito",
       "x": 40,
       "y": 13
      },
      {
       "type": "mosquito",
       "x": 33,
       "y": 21
      },
      {
       "type": "mosquito",
       "x": 12,
       "y": 13
      }
     ],
     "groups": {
      "queue": [
       {
        "say": "sys",
        "t": "插队怪全部被赶走了！"
       },
       {
        "say": "yen",
        "t": "我们去买票吧！"
       },
       {
        "quest": "q_buy"
       }
      ]
     },
     "chests": [
      {
       "id": "s1",
       "x": 17,
       "y": 23,
       "give": "eggs",
       "n": 1,
       "coins": 30
      },
      {
       "id": "s2",
       "x": 41,
       "y": 24,
       "give": "bento",
       "n": 1,
       "coins": 10
      }
     ],
     "triggers": [
      {
       "id": "join",
       "x": 1,
       "y": 10,
       "w": 5,
       "h": 7,
       "script": [
        {
         "join": "yen"
        },
        {
         "say": "yen",
         "t": "晚上街上好多蚊子！小心别被咬到～"
        },
        {
         "say": "sys",
         "t": "Yen 加入了队伍！按“换人”可以切换 Tat / Yen。"
        },
        {
         "say": "sys",
         "t": "Yen 的攻击是远距离的“叮嘱声波”；技能是“爱心护盾”：一段时间不受伤，还会帮全队回血。"
        },
        {
         "quest": "q_tickets"
        }
       ]
      }
     ]
    },
    "hall": {
     "name": "婚礼礼堂 · 2012",
     "theme": "hall",
     "map": [
      "##################################",
      "#.......AAAAAAAAAAAAAAAAAA.......#",
      "#......PAAAAAAAAAAAAAAAAAAP......#",
      "#.......AAAAAAAAAAAAAAAAAA.......#",
      "#.......AAAAAAAAAAAAAAAAAA.......#",
      "#......PAAAAAAAAAAAAAAAAAAP......#",
      "#...............==...............#",
      "########........==........########",
      "#......#.......f==f.......#......#",
      "#.TT...#..BBBBB.==.BBBBB..#.....M#",
      "#.TT...#........==........#......#",
      "#.TT...#........==........#......#",
      "#......#..BBBBB.==.BBBBB..#......#",
      "#...............==........L......#",
      "#...............==........L......#",
      "#.........BBBBB.==.BBBBB..#......#",
      "#......#........==........#......#",
      "#......#........==........#......#",
      "#......#..BBBBB.==.BBBBB..#......#",
      "#......#........==........#......#",
      "#......#........==........#......#",
      "########..BBBBB.==.BBBBB..########",
      "#...............==...............#",
      "#...............==...............#",
      "#........f.....f==f.....f........#",
      "#...............==...............#",
      "#...............==...............#",
      "##################################"
     ],
     "doors": {
      "L": "cleared_gifts"
     },
     "saves": [
      [
       13,
       25
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "host",
       "look": "host",
       "name": "婚礼主持人",
       "x": 16,
       "y": 3,
       "talks": [
        {
         "if": "defeated_bossBeer",
         "script": [
          {
           "say": "npc",
           "t": "各位来宾！新郎终于回来了！"
          },
          {
           "say": "npc",
           "t": "请新郎新娘交换戒指！"
          },
          {
           "say": "tat",
           "t": "Yen，以后家里的事……我全包了！"
          },
          {
           "say": "yen",
           "t": "这是你说的哦！"
          },
          {
           "say": "npc",
           "t": "恭喜 Tat 和 Yen，正式成为夫妻！"
          },
          {
           "say": "yen",
           "t": "下个星期，我们去巴厘岛度蜜月吧！"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "bossBeerOn",
         "script": [
          {
           "say": "npc",
           "t": "劝酒大王还在捣乱！新郎，快打败它！"
          }
         ]
        },
        {
         "if": "gotRing",
         "ifNot": "bossBeerOn",
         "script": [
          {
           "say": "npc",
           "t": "戒指找到了！太好了。在婚礼开始前，我要考考新郎："
          },
          {
           "quiz": "Tat 和 Yen 是哪一年结婚的？",
           "who": "npc",
           "a": [
            "2011 年",
            "2012 年",
            "2016 年"
           ],
           "ok": 1,
           "good": [
            {
             "say": "npc",
             "t": "答对！就是今天，2012 年！送你一份番茄炒蛋（Yen 的最爱），回满体力！"
            },
            {
             "exp": 30
            },
            {
             "give": "eggs",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "不对哦，是 2012 年——就是今天呀！"
            }
           ]
          },
          {
           "say": "npc",
           "t": "好！婚礼马上开始——"
          },
          {
           "say": "sys",
           "t": "砰！劝酒大王带着一群朋友冲进礼堂：“新郎！先来喝一杯！”"
          },
          {
           "say": "tat",
           "t": "（其实我刚才也很想跑去跟朋友喝一杯……）"
          },
          {
           "say": "yen",
           "t": "Tat！不准喝！我的裙摆太长了走不快，你快把它打跑！"
          },
          {
           "flag": "bossBeerOn"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_boss2"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "新人还在等戒指哦！花童说戒指盒掉在化妆间里了。"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "gift",
       "x": 11,
       "y": 10,
       "group": "gifts"
      },
      {
       "type": "gift",
       "x": 22,
       "y": 13,
       "group": "gifts"
      },
      {
       "type": "gift",
       "x": 12,
       "y": 16,
       "group": "gifts"
      },
      {
       "type": "gift",
       "x": 21,
       "y": 19,
       "group": "gifts"
      },
      {
       "type": "gift",
       "x": 10,
       "y": 23,
       "group": "gifts"
      },
      {
       "type": "drinker",
       "x": 3,
       "y": 14
      },
      {
       "type": "drinker",
       "x": 4,
       "y": 18
      },
      {
       "type": "bossBeer",
       "x": 16,
       "y": 11,
       "id": "bossBeer",
       "boss": true,
       "if": "bossBeerOn",
       "onDefeat": [
        {
         "say": "sys",
         "t": "劝酒大王被打败了！"
        },
        {
         "say": "tat",
         "t": "我不喝了！老婆最重要！"
        },
        {
         "say": "yen",
         "t": "哼，这还差不多～ 快回舞台！"
        },
        {
         "quest": "q_vow"
        }
       ]
      }
     ],
     "groups": {
      "gifts": [
       {
        "say": "sys",
        "t": "礼物盒里掉出一把钥匙！化妆间的门打开了。"
       },
       {
        "quest": "q_ring2"
       }
      ]
     },
     "chests": [
      {
       "id": "ring",
       "x": 30,
       "y": 10,
       "give": "ring",
       "n": 1,
       "look": "ring",
       "script": [
        {
         "say": "sys",
         "t": "找到戒指盒了！"
        },
        {
         "say": "yen",
         "t": "太好了，快拿去给主持人！"
        },
        {
         "flag": "gotRing"
        },
        {
         "quest": "q_host"
        }
       ]
      },
      {
       "id": "h2",
       "x": 2,
       "y": 19,
       "give": "bento",
       "n": 2,
       "coins": 20
      }
     ],
     "triggers": [
      {
       "id": "hallIntro",
       "x": 13,
       "y": 23,
       "w": 8,
       "h": 4,
       "script": [
        {
         "say": "sys",
         "t": "2012 年，婚礼当天！"
        },
        {
         "say": "tat",
         "t": "（朋友们说在酒吧角等我喝一杯……好想去……）"
        },
        {
         "say": "yen",
         "t": "Tat！你哪里都不准去！我的裙摆这么长，走都走不快……"
        },
        {
         "say": "yen",
         "t": "花童把戒指盒弄丢了，好像掉在化妆间。可是门被锁住了……"
        },
        {
         "say": "sys",
         "t": "礼物盒怪在礼堂里乱跳。打败它们，也许能找到钥匙！"
        },
        {
         "quest": "q_ring"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 2,
   "title": "第二章：巴厘岛蜜月",
   "years": "2012",
   "yenSkill": "love",
   "power": 1.6,
   "level": 6,
   "start": {
    "area": "beach",
    "x": 3,
    "y": 11
   },
   "party": [
    "tat",
    "yen"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2012 年，婚礼一个星期后，Tat 和 Yen 飞到了巴厘岛度蜜月！"
    },
    {
     "say": "yen",
     "t": "我们要去很多地方、吃很多好吃的！"
    },
    {
     "say": "tat",
     "t": "全部听老婆的！"
    },
    {
     "quest": "q_bali"
    }
   ],
   "endText": "蜜月旅行好开心！",
   "quests": {
    "q_bali": {
     "t": "拍 3 张风景照（相机标记），吃 3 样美食（上方小摊）",
     "area": "beach",
     "chests": [
      "view1",
      "view2",
      "view3"
     ],
     "npcs": [
      [
       "satay",
       "food1"
      ],
      [
       "nasi",
       "food2"
      ],
      [
       "coco",
       "food3"
      ]
     ]
    },
    "q_temple": {
     "t": "去海边的寺庙看看",
     "area": "temple",
     "x": 16,
     "y": 12
    },
    "q_monkey": {
     "t": "打败猴王，抢回 Yen 的眼镜！",
     "area": "temple",
     "enemy": "monkeyKing"
    },
    "q_guide": {
     "t": "回去找导游阿姨",
     "area": "temple",
     "npc": "guide"
    }
   },
   "areas": {
    "beach": {
     "name": "巴厘岛 · 海滩",
     "theme": "beach",
     "map": [
      "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "ydddddddCCCdddddddCCCdddddddCCCddddddddy",
      "yddddddddddddddddddddddddddddddddddddddy",
      "yddddddddddddddddddddddddddddddddddddddy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "ysssyssssssssssssssssssssysssssssssssssy",
      "yssssssssssssysssssssssssssssssssssysssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "yssssssssssssssssssssssssssssssssssssssx",
      "ysssssssssssssssysssssssssssBssssssssssx",
      "yssssssssssssssssssssssssssssssssssssssx",
      "yssssssssssssssssssssssssssssssssssssssy",
      "yssssssysssssssssssssssssssssssysssssssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "ysssssssssBBssssssssssBBsssssssssssssssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "yssssssssssssssssssssssssssssssssssssssy",
      "ywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwy",
      "ywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwy",
      "ywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwy",
      "ywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwy",
      "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
     ],
     "saves": [
      [
       3,
       11
      ]
     ],
     "exits": [
      {
       "x": 39,
       "y": 10,
       "w": 1,
       "h": 3,
       "need": "beachDone",
       "lock": "还没看够风景、吃够美食呢！",
       "script": [
        {
         "say": "yen",
         "t": "下一站：海边的寺庙！听说那里有好多猴子。"
        },
        {
         "goto": "temple",
         "x": 2,
         "y": 12
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "satay",
       "look": "pop",
       "name": "沙爹摊",
       "x": 9,
       "y": 3,
       "talks": [
        {
         "ifNot": "food1",
         "script": [
          {
           "say": "npc",
           "t": "来！刚烤好的沙爹！"
          },
          {
           "say": "yen",
           "t": "好香！"
          },
          {
           "say": "tat",
           "t": "老婆你先吃～"
          },
          {
           "flag": "food1"
          },
          {
           "give": "bento",
           "n": 1
          },
          {
           "exp": 15
          },
          {
           "when": {
            "if": [
             "food1",
             "food2",
             "food3",
             "view1",
             "view2",
             "view3"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
            },
            {
             "flag": "beachDone"
            },
            {
             "quest": "q_temple"
            }
           ]
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "好吃再来哦！"
          }
         ]
        }
       ]
      },
      {
       "id": "nasi",
       "look": "auntie",
       "name": "炒饭摊",
       "x": 19,
       "y": 3,
       "talks": [
        {
         "ifNot": "food2",
         "script": [
          {
           "say": "npc",
           "t": "巴厘岛炒饭，加一颗荷包蛋！"
          },
          {
           "say": "yen",
           "t": "我只吃菜就好，饭给你～"
          },
          {
           "say": "tat",
           "t": "（老婆晚餐真的从来不吃饭……）"
          },
          {
           "flag": "food2"
          },
          {
           "exp": 15
          },
          {
           "when": {
            "if": [
             "food1",
             "food2",
             "food3",
             "view1",
             "view2",
             "view3"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
            },
            {
             "flag": "beachDone"
            },
            {
             "quest": "q_temple"
            }
           ]
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "慢慢吃～"
          }
         ]
        }
       ]
      },
      {
       "id": "coco",
       "look": "booth",
       "name": "椰子水摊",
       "x": 29,
       "y": 3,
       "talks": [
        {
         "ifNot": "food3",
         "script": [
          {
           "say": "npc",
           "t": "新鲜椰子水，凉凉的！"
          },
          {
           "say": "yen",
           "t": "好甜！"
          },
          {
           "flag": "food3"
          },
          {
           "exp": 15
          },
          {
           "when": {
            "if": [
             "food1",
             "food2",
             "food3",
             "view1",
             "view2",
             "view3"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
            },
            {
             "flag": "beachDone"
            },
            {
             "quest": "q_temple"
            }
           ]
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "再来一个？"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "crab",
       "x": 8,
       "y": 17
      },
      {
       "type": "crab",
       "x": 18,
       "y": 18
      },
      {
       "type": "crab",
       "x": 27,
       "y": 17
      },
      {
       "type": "crab",
       "x": 34,
       "y": 18
      },
      {
       "type": "crab",
       "x": 14,
       "y": 13
      },
      {
       "type": "crab",
       "x": 24,
       "y": 10
      },
      {
       "type": "mosquito",
       "x": 33,
       "y": 5
      },
      {
       "type": "mosquito",
       "x": 5,
       "y": 9
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "view1",
       "x": 6,
       "y": 17,
       "look": "camera",
       "script": [
        {
         "say": "sys",
         "t": "咔嚓！拍下了蓝色的大海。"
        },
        {
         "flag": "view1"
        },
        {
         "exp": 15
        },
        {
         "when": {
          "if": [
           "food1",
           "food2",
           "food3",
           "view1",
           "view2",
           "view3"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
          },
          {
           "flag": "beachDone"
          },
          {
           "quest": "q_temple"
          }
         ]
        }
       ]
      },
      {
       "id": "view2",
       "x": 20,
       "y": 17,
       "look": "camera",
       "script": [
        {
         "say": "sys",
         "t": "咔嚓！拍下了两个人在沙滩上的合照。"
        },
        {
         "say": "yen",
         "t": "这张好看！"
        },
        {
         "flag": "view2"
        },
        {
         "exp": 15
        },
        {
         "when": {
          "if": [
           "food1",
           "food2",
           "food3",
           "view1",
           "view2",
           "view3"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
          },
          {
           "flag": "beachDone"
          },
          {
           "quest": "q_temple"
          }
         ]
        }
       ]
      },
      {
       "id": "view3",
       "x": 34,
       "y": 15,
       "look": "camera",
       "script": [
        {
         "say": "sys",
         "t": "咔嚓！拍下了海边的日落。"
        },
        {
         "flag": "view3"
        },
        {
         "exp": 15
        },
        {
         "when": {
          "if": [
           "food1",
           "food2",
           "food3",
           "view1",
           "view2",
           "view3"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "风景看了、东西也吃了，好满足！我们去寺庙吧。"
          },
          {
           "flag": "beachDone"
          },
          {
           "quest": "q_temple"
          }
         ]
        }
       ]
      },
      {
       "id": "b1",
       "x": 37,
       "y": 5,
       "give": "eggs",
       "n": 1,
       "coins": 30
      }
     ],
     "triggers": []
    },
    "temple": {
     "name": "巴厘岛 · 海边寺庙",
     "theme": "temple",
     "map": [
      "tttttttttttttttttttttttttttttttttttt",
      "tggggggggghhhhhhhhhhhhhhhhggggwwwwwt",
      "tggggggggghhhhhhhhhhhhhhhhggggwwwwwt",
      "tggggggggghhhhhhhhhhhhhhhhggggwwwwwt",
      "tgggtggggghhhhhhhhhhhhhhhhtgggwwwwwt",
      "tggggggggghhhhhhhhhhhhhhhhggggwwwwwt",
      "tgggggggtghhhhhh....hhhhhhggggwwwwwt",
      "tggggggggggggg........ggggggggwwwwwt",
      "tggggggggggggO........Ogggggggwwwwwt",
      "tggggfgggggggg........ggggggggwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tddddddddddddddd....ddddddddddwwwwwt",
      "tddddddddddddddd....ddddddddddwwwwwt",
      "tddddddddddddddd....ddddddddddwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tggggggggggggOgg....ggOgggggggwwwwwt",
      "tggggggggggggggg....ggggfgggggwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tgggggtggggggggg....gggggggtggwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tggggggggtgggOgg....ggOgggggggwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tggtgggggggggggg....gggggtggggwwwwwt",
      "tggggggggggfgggg....ggggggggggwwwwwt",
      "tggggggggggggggg....ggggggggggwwwwwt",
      "tttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "guide",
       "look": "auntie",
       "name": "导游阿姨",
       "x": 15,
       "y": 12,
       "talks": [
        {
         "if": "defeated_monkeyKing",
         "ifNot": "quizB",
         "script": [
          {
           "say": "npc",
           "t": "眼镜拿回来啦！你们是新婚夫妻吧？考你们一题："
          },
          {
           "quiz": "Tat 和 Yen 结婚后，过了多久去巴厘岛？",
           "who": "npc",
           "a": [
            "一个星期",
            "一个月",
            "一年"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "答对了！婚礼一个星期后就来啦！"
            },
            {
             "exp": 40
            },
            {
             "give": "eggs",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是婚礼一个星期后哦！"
            }
           ]
          },
          {
           "flag": "quizB"
          },
          {
           "say": "yen",
           "t": "这一趟看了好多地方、吃了好多东西，好开心！"
          },
          {
           "say": "tat",
           "t": "以后每年都带你去旅行！"
          },
          {
           "say": "yen",
           "t": "你说的哦～"
          },
          {
           "say": "sys",
           "t": "蜜月结束，两人回到了马来西亚……"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "glassesGone",
         "script": [
          {
           "say": "npc",
           "t": "猴王就在寺庙门口！它最喜欢偷游客的眼镜了！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "小心，这里的猴子很调皮，会偷东西哦！"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "monkey",
       "x": 6,
       "y": 12
      },
      {
       "type": "monkey",
       "x": 10,
       "y": 11
      },
      {
       "type": "monkey",
       "x": 24,
       "y": 12
      },
      {
       "type": "monkey",
       "x": 27,
       "y": 12
      },
      {
       "type": "monkey",
       "x": 17,
       "y": 18
      },
      {
       "type": "monkey",
       "x": 8,
       "y": 22
      },
      {
       "type": "monkey",
       "x": 24,
       "y": 21
      },
      {
       "type": "monkeyKing",
       "x": 17,
       "y": 8,
       "id": "monkeyKing",
       "boss": true,
       "if": "glassesGone",
       "onDefeat": [
        {
         "say": "sys",
         "t": "猴王被打败了！它把 Yen 的眼镜丢了回来。"
        },
        {
         "say": "yen",
         "t": "我又看得清楚了！Tat 最帅了～"
        },
        {
         "quest": "q_guide"
        }
       ]
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "t1",
       "x": 2,
       "y": 23,
       "give": "bento",
       "n": 2,
       "coins": 30
      },
      {
       "id": "t2",
       "x": 27,
       "y": 2,
       "give": "eggs",
       "n": 1
      }
     ],
     "triggers": [
      {
       "id": "steal",
       "x": 13,
       "y": 10,
       "w": 10,
       "h": 5,
       "script": [
        {
         "say": "sys",
         "t": "一只大猴子突然跳下来——一把抢走了 Yen 的眼镜！"
        },
        {
         "say": "yen",
         "t": "啊！我的眼镜！我什么都看不清楚了！"
        },
        {
         "say": "tat",
         "t": "可恶！老婆，我帮你抢回来！"
        },
        {
         "flag": "glassesGone"
        },
        {
         "spawn": true
        },
        {
         "quest": "q_monkey"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 3,
   "title": "第三章：新手爸妈",
   "years": "2013 – 2016",
   "yenSkill": "love",
   "power": 2.2,
   "level": 8,
   "start": {
    "area": "home13",
    "x": 15,
    "y": 7
   },
   "party": [
    "tat",
    "yen"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2013 年，Ze 出生了！Tat 和 Yen 当爸爸妈妈了。"
    },
    {
     "say": "yen",
     "t": "宝宝好可爱……可是家里好乱！"
    },
    {
     "say": "tat",
     "t": "家务交给我！先把灰尘怪赶走！"
    },
    {
     "quest": "q_dust"
    }
   ],
   "endText": "一家四口到齐啦！",
   "quests": {
    "q_dust": {
     "t": "打扫家里：打败灰尘怪",
     "area": "home13",
     "group": "dust"
    },
    "q_milk": {
     "t": "在厨房找到奶瓶",
     "area": "home13",
     "chests": [
      "milk"
     ]
    },
    "q_feed": {
     "t": "把奶瓶拿给宝宝 Ze",
     "area": "home13",
     "npc": "babyze"
    },
    "q_cry": {
     "t": "安抚哭闹怪",
     "area": "home13",
     "group": "cry"
    },
    "q_sleep": {
     "t": "打败熬夜大魔王！",
     "area": "home13",
     "enemy": "sleepless"
    },
    "q_out": {
     "t": "出门（右边门口）",
     "area": "home16",
     "x": 29,
     "y": 7
    },
    "q_ze": {
     "t": "跟 3 岁的 Ze 说话",
     "area": "home16",
     "npc": "kidze"
    },
    "q_ball": {
     "t": "找到 Ze 的足球",
     "area": "home16",
     "chests": [
      "ball"
     ]
    },
    "q_ball2": {
     "t": "把足球还给 Ze",
     "area": "home16",
     "npc": "kidze"
    }
   },
   "areas": {
    "home13": {
     "name": "家 · 2013",
     "theme": "home",
     "map": [
      "################################",
      "#...........#..................#",
      "#.bbb....cc.#...............p..#",
      "#.bbb.......#...uuuu...........#",
      "#...........#..................#",
      "#...........#..................#",
      "#.............................x#",
      "#.............................x#",
      "#...........#..................#",
      "#...........#....vv............#",
      "#...........#.p................#",
      "#...........#..................#",
      "######..############..##########",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#...TTT...............#WWWWWWWW#",
      "#...TTT................WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.kkkkkkkkk...........#WWWWWWWW#",
      "#..........p..........#WWWWWWWW#",
      "################################"
     ],
     "saves": [
      [
       15,
       6
      ]
     ],
     "exits": [
      {
       "x": 30,
       "y": 6,
       "w": 1,
       "h": 2,
       "need": "defeated_sleepless",
       "lock": "宝宝还在哭，现在不能出门！",
       "script": [
        {
         "say": "sys",
         "t": "日子一天一天过去……"
        },
        {
         "say": "sys",
         "t": "三年后，2016 年——Xiang 出生了！"
        },
        {
         "goto": "home16",
         "x": 28,
         "y": 7
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "babyze",
       "look": "ze",
       "baby": true,
       "name": "宝宝 Ze",
       "x": 9,
       "y": 4,
       "talks": [
        {
         "if": "chest_milk",
         "ifNot": "fedZe",
         "script": [
          {
           "say": "yen",
           "t": "来，宝宝喝奶奶～"
          },
          {
           "say": "sys",
           "t": "宝宝 Ze 喝完奶，可是……天黑了，他又开始哭了！"
          },
          {
           "say": "tat",
           "t": "什么声音？好多哭闹怪跑出来了！"
          },
          {
           "flag": "fedZe"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_cry"
          }
         ]
        },
        {
         "if": "fedZe",
         "script": [
          {
           "say": "sys",
           "t": "宝宝 Ze 睁着大眼睛看着你。"
          }
         ]
        },
        {
         "script": [
          {
           "say": "sys",
           "t": "宝宝 Ze：哇——哇——（肚子饿了）"
          }
         ]
        }
       ]
      },
      {
       "id": "nanny",
       "look": "auntie",
       "name": "隔壁阿姨",
       "x": 17,
       "y": 15,
       "talks": [
        {
         "ifNot": "quizC",
         "script": [
          {
           "say": "npc",
           "t": "恭喜恭喜！生了个儿子！考考爸爸："
          },
          {
           "quiz": "Ze 是哪一年出生的？",
           "who": "npc",
           "a": [
            "2012 年",
            "2013 年",
            "2016 年"
           ],
           "ok": 1,
           "good": [
            {
             "say": "npc",
             "t": "对！2013 年！"
            },
            {
             "exp": 50
            },
            {
             "give": "bento",
             "n": 2
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是 2013 年啦，新手爸爸要记好！"
            }
           ]
          },
          {
           "flag": "quizC"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "带孩子很辛苦，要互相帮忙哦！"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "dust",
       "x": 15,
       "y": 4,
       "group": "dust"
      },
      {
       "type": "dust",
       "x": 25,
       "y": 4,
       "group": "dust"
      },
      {
       "type": "dust",
       "x": 27,
       "y": 9,
       "group": "dust"
      },
      {
       "type": "dust",
       "x": 8,
       "y": 16,
       "group": "dust"
      },
      {
       "type": "dust",
       "x": 16,
       "y": 18,
       "group": "dust"
      },
      {
       "type": "cry",
       "x": 5,
       "y": 7,
       "group": "cry",
       "if": "fedZe"
      },
      {
       "type": "cry",
       "x": 20,
       "y": 6,
       "group": "cry",
       "if": "fedZe"
      },
      {
       "type": "cry",
       "x": 27,
       "y": 17,
       "group": "cry",
       "if": "fedZe"
      },
      {
       "type": "cry",
       "x": 14,
       "y": 16,
       "group": "cry",
       "if": "fedZe"
      },
      {
       "type": "sleepless",
       "x": 17,
       "y": 6,
       "id": "sleepless",
       "boss": true,
       "if": "cleared_cry",
       "onDefeat": [
        {
         "say": "sys",
         "t": "熬夜大魔王被打败了！天亮了……"
        },
        {
         "say": "yen",
         "t": "宝宝终于睡着了……"
        },
        {
         "say": "tat",
         "t": "老婆你也去睡吧，我来洗奶瓶。"
        },
        {
         "quest": "q_out"
        }
       ]
      }
     ],
     "groups": {
      "dust": [
       {
        "say": "sys",
        "t": "家里干干净净！"
       },
       {
        "say": "tat",
        "t": "家务交给我！"
       },
       {
        "say": "yen",
        "t": "我去外面买晚餐，我想自己挑想吃的～ 你帮我找奶瓶和尿布。"
       },
       {
        "quest": "q_milk"
       }
      ],
      "cry": [
       {
        "say": "sys",
        "t": "哭闹怪都安静了……可是——"
       },
       {
        "say": "sys",
        "t": "熬夜大魔王出现了！它不让任何人睡觉！"
       },
       {
        "spawn": true
       },
       {
        "quest": "q_sleep"
       }
      ]
     },
     "chests": [
      {
       "id": "milk",
       "x": 3,
       "y": 17,
       "give": "bento",
       "n": 1,
       "look": "bottle",
       "script": [
        {
         "say": "sys",
         "t": "找到奶瓶和奶粉了！"
        },
        {
         "say": "tat",
         "t": "快拿去给宝宝 Ze！"
        },
        {
         "quest": "q_feed"
        }
       ]
      },
      {
       "id": "h1",
       "x": 29,
       "y": 2,
       "give": "eggs",
       "n": 1,
       "coins": 20
      }
     ],
     "triggers": []
    },
    "home16": {
     "name": "家 · 2016",
     "theme": "home",
     "map": [
      "################################",
      "#...........#..................#",
      "#.bbb....cc.#...........cc..p..#",
      "#.bbb.......#...uuuu...........#",
      "#...........#..................#",
      "#...........#..................#",
      "#.............................x#",
      "#.............................x#",
      "#...........#..................#",
      "#...........#....vv............#",
      "#...........#.p................#",
      "#...........#..................#",
      "######..############..##########",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#...TTT...............#WWWWWWWW#",
      "#...TTT................WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.kkkkkkkkk...........#WWWWWWWW#",
      "#..........p..........#WWWWWWWW#",
      "################################"
     ],
     "saves": [
      [
       15,
       6
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "babyxiang",
       "look": "xiang",
       "baby": true,
       "name": "宝宝 Xiang",
       "x": 10,
       "y": 4,
       "talks": [
        {
         "script": [
          {
           "say": "sys",
           "t": "宝宝 Xiang 咯咯笑。"
          }
         ]
        }
       ]
      },
      {
       "id": "kidze",
       "look": "ze",
       "small": 0.7,
       "name": "Ze（3 岁）",
       "x": 17,
       "y": 7,
       "talks": [
        {
         "if": "chest_ball",
         "ifNot": "zeHappy",
         "script": [
          {
           "say": "ze",
           "t": "我的足球！谢谢爸爸！"
          },
          {
           "say": "ze",
           "t": "弟弟！以后我教你踢足球！"
          },
          {
           "say": "yen",
           "t": "我们是一家四口了！"
          },
          {
           "say": "tat",
           "t": "以后的日子会越来越热闹……"
          },
          {
           "say": "sys",
           "t": "一家四口的冒险，正式开始！"
          },
          {
           "flag": "zeHappy"
          },
          {
           "end": true
          }
         ]
        },
        {
         "script": [
          {
           "say": "ze",
           "t": "爸爸，我的足球不见了……"
          },
          {
           "quest": "q_ball"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "dust",
       "x": 6,
       "y": 8
      },
      {
       "type": "dust",
       "x": 26,
       "y": 9
      },
      {
       "type": "gift",
       "x": 14,
       "y": 17
      },
      {
       "type": "gift",
       "x": 25,
       "y": 17
      },
      {
       "type": "dust",
       "x": 3,
       "y": 15
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "ball",
       "x": 27,
       "y": 18,
       "give": "bento",
       "n": 1,
       "look": "ball",
       "script": [
        {
         "say": "sys",
         "t": "在厕所里找到 Ze 的足球了！"
        },
        {
         "quest": "q_ball2"
        }
       ]
      }
     ],
     "triggers": [
      {
       "id": "in16",
       "x": 25,
       "y": 4,
       "w": 6,
       "h": 6,
       "script": [
        {
         "say": "sys",
         "t": "2016 年，Xiang 出生了！哥哥 Ze 已经 3 岁了。"
        },
        {
         "say": "yen",
         "t": "Ze 最喜欢踢足球了。"
        },
        {
         "quest": "q_ze"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 4,
   "title": "第四章：疫情来了",
   "years": "2020",
   "yenSkill": "mask",
   "power": 3,
   "level": 10,
   "start": {
    "area": "home20",
    "x": 15,
    "y": 7
   },
   "party": [
    "tat",
    "yen",
    "ze",
    "xiang"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2020 年，新冠疫情来了。Ze 7 岁，Xiang 4 岁。"
    },
    {
     "say": "yen",
     "t": "从今天开始，出门一定要：戴口罩、带水、喝水、带钱、带钥匙！"
    },
    {
     "say": "sys",
     "t": "Yen 学会新技能“口罩护盾”！比爱心护盾更久、回血更多。"
    },
    {
     "say": "sys",
     "t": "Ze 和 Xiang 加入队伍！Ze 会踢足球（远距离），技能“将军！”冻住附近的敌人；Xiang 会甩墨水，技能是画出一个小帮手。"
    },
    {
     "say": "tat",
     "t": "我们去超市买番茄和鸡蛋！"
    },
    {
     "quest": "q_ready"
    }
   ],
   "endText": "疫情中，一家人更团结了！",
   "quests": {
    "q_ready": {
     "t": "出门准备：口罩、水壶、钱包、钥匙，再去厨房饮水机喝水",
     "area": "home20",
     "chests": [
      "mask",
      "bottle",
      "wallet",
      "key"
     ],
     "npcs": [
      [
       "water",
       "drank"
      ]
     ]
    },
    "q_go4": {
     "t": "出门去超市（右边门口）",
     "area": "mart",
     "x": 3,
     "y": 12
    },
    "q_food": {
     "t": "在货架找到番茄和鸡蛋",
     "area": "mart",
     "chests": [
      "tomato",
      "egg"
     ]
    },
    "q_virus": {
     "t": "打败结账区的病毒大王！",
     "area": "mart",
     "enemy": "virusKing"
    },
    "q_pay": {
     "t": "去收银员那里结账",
     "area": "mart",
     "npc": "cashier"
    }
   },
   "areas": {
    "home20": {
     "name": "家 · 2020 疫情",
     "theme": "home",
     "map": [
      "################################",
      "#...........#..................#",
      "#.bbb....cc.#...............p..#",
      "#.bbb.......#...uuuu...........#",
      "#...........#..................#",
      "#...........#..................#",
      "#.............................x#",
      "#.............................x#",
      "#...........#..................#",
      "#...........#....vv............#",
      "#...........#.p................#",
      "#...........#..................#",
      "######..############..##########",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#...TTT...............#WWWWWWWW#",
      "#...TTT................WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.kkkkkkkkk...........#WWWWWWWW#",
      "#..........p..........#WWWWWWWW#",
      "################################"
     ],
     "saves": [
      [
       15,
       6
      ]
     ],
     "exits": [
      {
       "x": 30,
       "y": 6,
       "w": 1,
       "h": 2,
       "need": "ready",
       "lock": "Yen：还没准备好！口罩、水、钱、钥匙！",
       "script": [
        {
         "say": "yen",
         "t": "出门啦！记得不要乱摸东西！"
        },
        {
         "goto": "mart",
         "x": 2,
         "y": 12
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "water",
       "look": "none",
       "name": "饮水机",
       "x": 3,
       "y": 18,
       "talks": [
        {
         "ifNot": "drank",
         "script": [
          {
           "say": "sys",
           "t": "咕噜咕噜……喝了一大杯水。"
          },
          {
           "say": "yen",
           "t": "很好！"
          },
          {
           "flag": "drank"
          },
          {
           "heal": true
          },
          {
           "when": {
            "if": [
             "chest_mask",
             "chest_bottle",
             "chest_wallet",
             "chest_key",
             "drank"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "全部准备好了！出门！"
            },
            {
             "flag": "ready"
            },
            {
             "quest": "q_go4"
            }
           ]
          }
         ]
        },
        {
         "script": [
          {
           "say": "sys",
           "t": "已经喝过水了。"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "virus",
       "x": 15,
       "y": 4
      },
      {
       "type": "virus",
       "x": 25,
       "y": 8
      },
      {
       "type": "virus",
       "x": 8,
       "y": 16
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "mask",
       "x": 5,
       "y": 6,
       "look": "mask",
       "script": [
        {
         "say": "sys",
         "t": "戴上口罩！"
        },
        {
         "when": {
          "if": [
           "chest_mask",
           "chest_bottle",
           "chest_wallet",
           "chest_key",
           "drank"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "全部准备好了！出门！"
          },
          {
           "flag": "ready"
          },
          {
           "quest": "q_go4"
          }
         ]
        }
       ]
      },
      {
       "id": "bottle",
       "x": 9,
       "y": 17,
       "look": "bottle",
       "script": [
        {
         "say": "sys",
         "t": "带上水壶！"
        },
        {
         "when": {
          "if": [
           "chest_mask",
           "chest_bottle",
           "chest_wallet",
           "chest_key",
           "drank"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "全部准备好了！出门！"
          },
          {
           "flag": "ready"
          },
          {
           "quest": "q_go4"
          }
         ]
        }
       ]
      },
      {
       "id": "wallet",
       "x": 26,
       "y": 2,
       "look": "wallet",
       "coins": 30,
       "script": [
        {
         "say": "sys",
         "t": "带上钱包！"
        },
        {
         "when": {
          "if": [
           "chest_mask",
           "chest_bottle",
           "chest_wallet",
           "chest_key",
           "drank"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "全部准备好了！出门！"
          },
          {
           "flag": "ready"
          },
          {
           "quest": "q_go4"
          }
         ]
        }
       ]
      },
      {
       "id": "key",
       "x": 29,
       "y": 10,
       "look": "key",
       "script": [
        {
         "say": "sys",
         "t": "带上钥匙！"
        },
        {
         "when": {
          "if": [
           "chest_mask",
           "chest_bottle",
           "chest_wallet",
           "chest_key",
           "drank"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "全部准备好了！出门！"
          },
          {
           "flag": "ready"
          },
          {
           "quest": "q_go4"
          }
         ]
        }
       ]
      }
     ],
     "triggers": []
    },
    "mart": {
     "name": "超市 · 2020",
     "theme": "mart",
     "masks": true,
     "map": [
      "######################################",
      "#....................................#",
      "#p...................................#",
      "#..............................#.....#",
      "#.....SSSSSSSSS...SSSSSSSSS....#.....#",
      "#..............................#.....#",
      "#.................................K..#",
      "#....................................#",
      "#.....SSSSSSSSS...SSSSSSSSS....#.....#",
      "#..............................#.....#",
      "#..............................#.....#",
      "#..............................#.....#",
      "#.....SSSSSSSSS...SSSSSSSSS....#.....#",
      "#.................................K..#",
      "#....................................#",
      "#..............................#.....#",
      "#.....SSSSSSSSS...SSSSSSSSS....#.....#",
      "#..............................#.....#",
      "#..............................#.....#",
      "#..............................#.....#",
      "#..............................#.....#",
      "#....................................#",
      "#p..................................p#",
      "######################################"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "cashier",
       "look": "booth",
       "name": "收银员",
       "x": 35,
       "y": 10,
       "talks": [
        {
         "if": "defeated_virusKing",
         "ifNot": "quizD",
         "script": [
          {
           "say": "npc",
           "t": "谢谢你们赶走了病毒大王！结账前考你们一题："
          },
          {
           "quiz": "Yen 出门前最常说的是哪一句？",
           "who": "npc",
           "a": [
            "戴口罩、带水、喝水、带钱、带钥匙！",
            "早点回家！",
            "不要乱花钱！"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "答对了！你们家真有纪律！"
            },
            {
             "exp": 80
            },
            {
             "give": "eggs",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是“戴口罩、带水、喝水、带钱、带钥匙”啦！"
            }
           ]
          },
          {
           "flag": "quizD"
          },
          {
           "say": "yen",
           "t": "回家煮番茄炒蛋！"
          },
          {
           "say": "tat",
           "t": "老婆最爱的番茄炒蛋，我来煮！"
          },
          {
           "say": "yen",
           "t": "我晚餐不吃饭，只吃菜就好～"
          },
          {
           "say": "sys",
           "t": "疫情的日子，一家四口在家一起度过。"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "chest_tomato",
         "script": [
          {
           "say": "npc",
           "t": "病毒大王挡在结账区！小心！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "番茄和鸡蛋在货架那边，快被抢光了！"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "hoarder",
       "x": 10,
       "y": 6,
       "group": "hoard"
      },
      {
       "type": "hoarder",
       "x": 22,
       "y": 10,
       "group": "hoard"
      },
      {
       "type": "hoarder",
       "x": 12,
       "y": 14,
       "group": "hoard"
      },
      {
       "type": "hoarder",
       "x": 24,
       "y": 18,
       "group": "hoard"
      },
      {
       "type": "virus",
       "x": 4,
       "y": 6
      },
      {
       "type": "virus",
       "x": 28,
       "y": 14
      },
      {
       "type": "virus",
       "x": 16,
       "y": 20
      },
      {
       "type": "virus",
       "x": 28,
       "y": 3
      },
      {
       "type": "virusKing",
       "x": 33,
       "y": 18,
       "id": "virusKing",
       "boss": true,
       "if": "gotFood",
       "onDefeat": [
        {
         "say": "sys",
         "t": "病毒大王被打败了！"
        },
        {
         "say": "yen",
         "t": "回家要洗手！"
        },
        {
         "quest": "q_pay"
        }
       ]
      }
     ],
     "groups": {
      "hoard": [
       {
        "say": "sys",
        "t": "抢购怪都被赶走了！货架上还剩最后的番茄和鸡蛋。"
       }
      ]
     },
     "chests": [
      {
       "id": "tomato",
       "x": 10,
       "y": 17,
       "look": "tomato",
       "script": [
        {
         "say": "sys",
         "t": "拿到最后一盒番茄！"
        },
        {
         "when": {
          "if": [
           "chest_tomato",
           "chest_egg"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "番茄和鸡蛋都买齐了！可是……"
          },
          {
           "flag": "gotFood"
          },
          {
           "spawn": true
          },
          {
           "say": "sys",
           "t": "病毒大王出现在结账区！"
          },
          {
           "quest": "q_virus"
          }
         ]
        }
       ]
      },
      {
       "id": "egg",
       "x": 22,
       "y": 13,
       "look": "egg",
       "script": [
        {
         "say": "sys",
         "t": "拿到一盒鸡蛋！"
        },
        {
         "when": {
          "if": [
           "chest_tomato",
           "chest_egg"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "番茄和鸡蛋都买齐了！可是……"
          },
          {
           "flag": "gotFood"
          },
          {
           "spawn": true
          },
          {
           "say": "sys",
           "t": "病毒大王出现在结账区！"
          },
          {
           "quest": "q_virus"
          }
         ]
        }
       ]
      },
      {
       "id": "m1",
       "x": 2,
       "y": 21,
       "give": "bento",
       "n": 2,
       "coins": 30
      }
     ],
     "triggers": [
      {
       "id": "inmart",
       "x": 1,
       "y": 9,
       "w": 4,
       "h": 6,
       "script": [
        {
         "say": "sys",
         "t": "超市里好多人在抢购！"
        },
        {
         "say": "yen",
         "t": "大家保持距离！"
        },
        {
         "quest": "q_food"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 5,
   "title": "第五章：家里的日常",
   "years": "2025",
   "yenSkill": "mask",
   "power": 3.6,
   "level": 12,
   "start": {
    "area": "home25",
    "x": 15,
    "y": 7
   },
   "party": [
    "ze",
    "xiang"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2025 年。Ze 12 岁，Xiang 9 岁。"
    },
    {
     "say": "sys",
     "t": "今天爸妈出门了！两兄弟开心得不得了——"
    },
    {
     "say": "xiang",
     "t": "看电视！"
    },
    {
     "say": "ze",
     "t": "玩手机！"
    },
    {
     "say": "sys",
     "t": "可是电视和手机里跑出了屏幕怪！"
    },
    {
     "quest": "q_screens"
    }
   ],
   "endText": "平凡的日子，也是最好的冒险。",
   "quests": {
    "q_screens": {
     "t": "打败屏幕怪",
     "area": "home25",
     "group": "screens"
    },
    "q_off": {
     "t": "爸妈快到家了！关掉 2 台电视和 2 部手机",
     "area": "home25",
     "chests": [
      "tv1",
      "tv2",
      "ph1",
      "ph2"
     ]
    },
    "q_door": {
     "t": "Xiang 去门口帮妈妈开门、拿东西",
     "area": "home25",
     "npc": "door"
    },
    "q_exam": {
     "t": "考试周！打败考试周大魔王（左边房间）",
     "area": "home25",
     "enemy": "examKing"
    },
    "q_park": {
     "t": "周末去公园（右边门口）",
     "area": "park",
     "x": 3,
     "y": 12
    },
    "q_coachT": {
     "t": "找足球教练",
     "area": "park",
     "npc": "coach"
    },
    "q_match": {
     "t": "比赛：打败球场上的棋子兵",
     "area": "park",
     "group": "pawns"
    },
    "q_coach": {
     "t": "回去找足球教练",
     "area": "park",
     "npc": "coach"
    }
   },
   "areas": {
    "home25": {
     "name": "家 · 2025",
     "theme": "home",
     "map": [
      "################################",
      "#...........#..................#",
      "#.bbb....cc.#...............p..#",
      "#.bbb.......#...uuuu...........#",
      "#...........#..................#",
      "#...........#..................#",
      "#.............................x#",
      "#.............................x#",
      "#...........#..................#",
      "#...DDD.....#....vv............#",
      "#...........#.p................#",
      "#...........#..................#",
      "######..############..##########",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#...TTT...............#WWWWWWWW#",
      "#...TTT................WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.....................#WWWWWWWW#",
      "#.kkkkkkkkk...........#WWWWWWWW#",
      "#..........p..........#WWWWWWWW#",
      "################################"
     ],
     "saves": [
      [
       15,
       6
      ]
     ],
     "exits": [
      {
       "x": 30,
       "y": 6,
       "w": 1,
       "h": 2,
       "need": "defeated_examKing",
       "lock": "考试周还没结束！",
       "script": [
        {
         "say": "yen",
         "t": "考完试了！周末全家去公园！"
        },
        {
         "goto": "park",
         "x": 2,
         "y": 12
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "door",
       "look": "yen",
       "name": "Yen",
       "x": 28,
       "y": 7,
       "hideIf": "momHome",
       "showIf": "screensOff",
       "talks": [
        {
         "if": "screensOff",
         "ifNot": "momHome",
         "script": [
          {
           "say": "xiang",
           "t": "妈妈回来了！我来开门！我帮你拿东西！"
          },
          {
           "say": "yen",
           "t": "Xiang 最乖了～"
          },
          {
           "say": "yen",
           "t": "嗯？电视怎么是热的？"
          },
          {
           "say": "ze",
           "t": "（装作在看书）……我们一直在看书啊。"
          },
          {
           "say": "yen",
           "t": "关闭电视和电话！"
          },
          {
           "say": "tat",
           "t": "（这是我们家最常听到的一句话。）"
          },
          {
           "join": "tat"
          },
          {
           "join": "yen"
          },
          {
           "flag": "momHome"
          },
          {
           "say": "yen",
           "t": "下个星期 Ze 考试，从今天开始好好复习！"
          },
          {
           "say": "sys",
           "t": "考试周开始了……Yen 变得好严格！"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_exam"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "tv",
       "x": 17,
       "y": 7,
       "group": "screens"
      },
      {
       "type": "phone",
       "x": 6,
       "y": 4,
       "group": "screens"
      },
      {
       "type": "phone",
       "x": 25,
       "y": 9,
       "group": "screens"
      },
      {
       "type": "tv",
       "x": 15,
       "y": 16,
       "group": "screens"
      },
      {
       "type": "phone",
       "x": 27,
       "y": 17,
       "group": "screens"
      },
      {
       "type": "examKing",
       "x": 7,
       "y": 6,
       "id": "examKing",
       "boss": true,
       "if": "momHome",
       "onDefeat": [
        {
         "say": "sys",
         "t": "考试周大魔王被打败了！"
        },
        {
         "say": "ze",
         "t": "考完了！"
        },
        {
         "say": "yen",
         "t": "考得不错！周末带你们去公园。"
        },
        {
         "quest": "q_park"
        }
       ]
      }
     ],
     "groups": {
      "screens": [
       {
        "say": "sys",
        "t": "屏幕怪都被打败了！可是电视和手机还开着……"
       },
       {
        "say": "sys",
        "t": "叮——门口传来钥匙的声音！爸妈回来了！"
       },
       {
        "say": "ze",
        "t": "快！把电视和手机全部关掉！"
       },
       {
        "quest": "q_off"
       }
      ]
     },
     "chests": [
      {
       "id": "tv1",
       "x": 19,
       "y": 8,
       "look": "tv",
       "script": [
        {
         "say": "sys",
         "t": "关掉电视！"
        },
        {
         "when": {
          "if": [
           "chest_tv1",
           "chest_tv2",
           "chest_ph1",
           "chest_ph2"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "全部关好了！两兄弟赶快坐好，假装在看书……"
          },
          {
           "flag": "screensOff"
          },
          {
           "quest": "q_door"
          }
         ]
        }
       ]
      },
      {
       "id": "tv2",
       "x": 2,
       "y": 8,
       "look": "tv",
       "script": [
        {
         "say": "sys",
         "t": "关掉卧室的电视！"
        },
        {
         "when": {
          "if": [
           "chest_tv1",
           "chest_tv2",
           "chest_ph1",
           "chest_ph2"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "全部关好了！两兄弟赶快坐好，假装在看书……"
          },
          {
           "flag": "screensOff"
          },
          {
           "quest": "q_door"
          }
         ]
        }
       ]
      },
      {
       "id": "ph1",
       "x": 15,
       "y": 17,
       "look": "phone",
       "script": [
        {
         "say": "sys",
         "t": "关掉手机！"
        },
        {
         "when": {
          "if": [
           "chest_tv1",
           "chest_tv2",
           "chest_ph1",
           "chest_ph2"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "全部关好了！两兄弟赶快坐好，假装在看书……"
          },
          {
           "flag": "screensOff"
          },
          {
           "quest": "q_door"
          }
         ]
        }
       ]
      },
      {
       "id": "ph2",
       "x": 26,
       "y": 17,
       "look": "phone",
       "script": [
        {
         "say": "ze",
         "t": "（躲在厕所里玩手机……其实也在玩橡皮擦和发呆。）"
        },
        {
         "say": "sys",
         "t": "关掉手机！"
        },
        {
         "when": {
          "if": [
           "chest_tv1",
           "chest_tv2",
           "chest_ph1",
           "chest_ph2"
          ]
         },
         "do": [
          {
           "say": "sys",
           "t": "全部关好了！两兄弟赶快坐好，假装在看书……"
          },
          {
           "flag": "screensOff"
          },
          {
           "quest": "q_door"
          }
         ]
        }
       ]
      }
     ],
     "triggers": []
    },
    "park": {
     "name": "公园 · 周末",
     "theme": "park",
     "map": [
      "tttttttttttttttttttttttttttttttttttttttt",
      "tggggggggggggggggggggggggggggggggggggggt",
      "tgggggggggggggggggggggFFFFFFFFFFFFFFFFgt",
      "tgggggggggggggtgggggggFggggggggggggggFgt",
      "tgggtgggggggggggggggggFggggggggggggggFgt",
      "tggggggggggggggggggggggggggggggggggggFgt",
      "tggggggggggggggggggggggggggggggggggggFgt",
      "tgggggggtgggggggggggggFggggggggggggggFgt",
      "tgggggggggggggggggggggFggggggggggggggFgt",
      "tgggggggggggggggggggggFFFFFFFFFFFFFFFFgt",
      "tggggggggggggggggggggggggggggggggggggggt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tggggggggggggggggggggggggggggggggggggggt",
      "tgggggggggggggggggggggggggggggwwwwgggggt",
      "tgggggggggggggggggggggggggggggwwwwgtgggt",
      "tggggTgggTgggTggggggggggggggggwwwwgggggt",
      "tggggggggggggggggggggggggggggggggggggggt",
      "tgggggggggggggggggggggggggggggtggggggggt",
      "tgggggggggggggggggtggggggggggggggggggggt",
      "tggggggggggggggggggggggggggggggggggggggt",
      "tgggggggggggggggggggggggggtggggggggggggt",
      "tttttttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "coach",
       "look": "amin",
       "name": "足球教练",
       "x": 29,
       "y": 5,
       "talks": [
        {
         "if": "cleared_pawns",
         "ifNot": "quizE",
         "script": [
          {
           "say": "npc",
           "t": "赢了！Ze 踢得真好！考考你们："
          },
          {
           "quiz": "Ze 最喜欢的两样东西是什么？",
           "who": "npc",
           "a": [
            "足球和下棋",
            "打游戏和看电视",
            "唱歌和跳舞"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "对！足球和下棋！"
            },
            {
             "exp": 80
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是足球和下棋啦！"
            }
           ]
          },
          {
           "flag": "quizE"
          },
          {
           "say": "xiang",
           "t": "我把今天画成漫画了！你们看！"
          },
          {
           "say": "yen",
           "t": "画得好好看！"
          },
          {
           "say": "tat",
           "t": "（一家人在一起，真好。）"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "talkCoach",
         "script": [
          {
           "say": "npc",
           "t": "把场上的棋子兵都打败！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "今天是足球加象棋大赛！对手是棋子兵！"
          },
          {
           "say": "ze",
           "t": "交给我！"
          },
          {
           "flag": "talkCoach"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_match"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "pawn",
       "x": 25,
       "y": 4,
       "group": "pawns",
       "if": "talkCoach"
      },
      {
       "type": "pawn",
       "x": 34,
       "y": 4,
       "group": "pawns",
       "if": "talkCoach"
      },
      {
       "type": "pawn",
       "x": 25,
       "y": 8,
       "group": "pawns",
       "if": "talkCoach"
      },
      {
       "type": "pawn",
       "x": 34,
       "y": 8,
       "group": "pawns",
       "if": "talkCoach"
      },
      {
       "type": "pawn",
       "x": 30,
       "y": 6,
       "group": "pawns",
       "if": "talkCoach"
      },
      {
       "type": "mosquito",
       "x": 8,
       "y": 20
      },
      {
       "type": "mosquito",
       "x": 20,
       "y": 16
      },
      {
       "type": "mosquito",
       "x": 36,
       "y": 21
      }
     ],
     "groups": {
      "pawns": [
       {
        "say": "sys",
        "t": "比赛赢了！"
       },
       {
        "quest": "q_coach"
       }
      ]
     },
     "chests": [
      {
       "id": "p1",
       "x": 37,
       "y": 22,
       "give": "eggs",
       "n": 1,
       "coins": 40
      }
     ],
     "triggers": [
      {
       "id": "inpark",
       "x": 1,
       "y": 9,
       "w": 4,
       "h": 6,
       "script": [
        {
         "say": "ze",
         "t": "球场在右上方！"
        },
        {
         "quest": "q_coachT"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 6,
   "title": "第六章：云顶高原",
   "years": "全家旅行",
   "yenSkill": "mask",
   "power": 4.2,
   "level": 14,
   "start": {
    "area": "genting",
    "x": 3,
    "y": 13
   },
   "party": [
    "tat",
    "yen",
    "ze",
    "xiang"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "全家去云顶高原——因为有免费酒店！"
    },
    {
     "say": "yen",
     "t": "云顶天气凉凉的，我最喜欢了！"
    },
    {
     "say": "sys",
     "t": "可是缆车站被冷风怪占领了……"
    },
    {
     "quest": "q_cableT"
    }
   ],
   "endText": "云顶凉凉的，好舒服！",
   "quests": {
    "q_cableT": {
     "t": "找缆车站员（右上方）",
     "area": "genting",
     "npc": "cable"
    },
    "q_cold": {
     "t": "赶走冷风怪",
     "area": "genting",
     "group": "cold"
    },
    "q_cable0": {
     "t": "回去找缆车站员",
     "area": "genting",
     "npc": "cable"
    },
    "q_cable": {
     "t": "坐缆车上山顶（缆车站门口）",
     "area": "genting",
     "x": 33,
     "y": 8
    },
    "q_food6": {
     "t": "在美食街问问价钱（面档、饭档）",
     "area": "hotel",
     "npcs": [
      [
       "st1",
       "ask1"
      ],
      [
       "st2",
       "ask2"
      ]
     ]
    },
    "q_cheap": {
     "t": "找找角落有没有便宜的小店（右下）",
     "area": "hotel",
     "npc": "st3"
    },
    "q_price": {
     "t": "打败天价大王！",
     "area": "hotel",
     "enemy": "priceKing"
    },
    "q_eat": {
     "t": "回角落小店吃晚餐",
     "area": "hotel",
     "npc": "st3"
    }
   },
   "areas": {
    "genting": {
     "name": "云顶高原 · 山上",
     "theme": "mountain",
     "map": [
      "tttttttttttttttttttttttttttttttttttttttt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnhhhhhhhhhhht",
      "tnnnnnnnnnnntnnnnnnnnnnnnnnnhhhhhhhhhhht",
      "tnnntnnnnnnnnnnnnnnntnnnnnnnhhhhhhhhhhht",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnhhhhhhhhhhht",
      "tnnnnnnntnnnnnnnnnnnnnnnnnnnhhhhhhhhhhht",
      "tnnnnnnnnnnnnnnntnnnnnnnnnnnhhhhhhhhhhht",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnhhhhhxxhhhht",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnlnnnnnnnnnnnlnnnnnnnnnnnnnnnnnnt",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnlnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnntnnt",
      "tnnnnnnnnnnnnnntnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnntnnnnnnnnnnnt",
      "tnnnntnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnntnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnntnnnnnnnnnnnnnnnnnnnnnntnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      "tttttttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       3,
       13
      ]
     ],
     "exits": [
      {
       "x": 33,
       "y": 8,
       "w": 2,
       "h": 1,
       "need": "cableOK",
       "lock": "先找缆车站员！",
       "script": [
        {
         "say": "sys",
         "t": "全家坐上缆车，到了山顶的酒店！"
        },
        {
         "goto": "hotel",
         "x": 18,
         "y": 21
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "cable",
       "look": "booth",
       "name": "缆车站员",
       "x": 31,
       "y": 10,
       "talks": [
        {
         "if": "cleared_cold",
         "ifNot": "cableOK",
         "script": [
          {
           "say": "npc",
           "t": "冷风怪被赶走了，缆车可以开了！"
          },
          {
           "say": "tat",
           "t": "我们住的是免费酒店哦！"
          },
          {
           "flag": "cableOK"
          },
          {
           "quest": "q_cable"
          }
         ]
        },
        {
         "ifNot": "cleared_cold",
         "script": [
          {
           "say": "npc",
           "t": "冷风怪把缆车冻住了！帮帮忙！"
          },
          {
           "quest": "q_cold"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "请上缆车！"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "wind",
       "x": 10,
       "y": 8,
       "group": "cold"
      },
      {
       "type": "wind",
       "x": 18,
       "y": 6,
       "group": "cold"
      },
      {
       "type": "wind",
       "x": 24,
       "y": 17,
       "group": "cold"
      },
      {
       "type": "wind",
       "x": 12,
       "y": 19,
       "group": "cold"
      },
      {
       "type": "wind",
       "x": 32,
       "y": 18,
       "group": "cold"
      },
      {
       "type": "wind",
       "x": 25,
       "y": 9,
       "group": "cold"
      }
     ],
     "groups": {
      "cold": [
       {
        "say": "sys",
        "t": "冷风怪都被打跑了！"
       },
       {
        "say": "yen",
        "t": "其实我喜欢冷冷的～ 云顶最舒服了！"
       },
       {
        "quest": "q_cable0"
       }
      ]
     },
     "chests": [
      {
       "id": "g1",
       "x": 2,
       "y": 24,
       "give": "bento",
       "n": 2,
       "coins": 40
      }
     ],
     "triggers": []
    },
    "hotel": {
     "name": "云顶 · 酒店与美食街",
     "theme": "mall",
     "map": [
      "####################################",
      "#..................................#",
      "#...CCC...CCC...CCC...CCC...CCC....#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "#.....TTT.....TTT.....TTT..........#",
      "#.....TTT.....TTT.....TTT..........#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "#.............................CCCC.#",
      "#..................................#",
      "#################...#######........#",
      "#..................................#",
      "#..................................#",
      "#.b...b...b........................#",
      "#..................................#",
      "#..................................#",
      "#..................................#",
      "####################################"
     ],
     "saves": [
      [
       18,
       20
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "st1",
       "look": "pop",
       "name": "面档",
       "x": 5,
       "y": 3,
       "talks": [
        {
         "script": [
          {
           "say": "npc",
           "t": "一碗面 RM48！"
          },
          {
           "say": "tat",
           "t": "太贵了！！"
          },
          {
           "flag": "ask1"
          },
          {
           "when": {
            "if": [
             "ask1",
             "ask2"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "全部都好贵……再找找看。"
            },
            {
             "quest": "q_cheap"
            }
           ]
          }
         ]
        }
       ]
      },
      {
       "id": "st2",
       "look": "auntie",
       "name": "饭档",
       "x": 17,
       "y": 3,
       "talks": [
        {
         "script": [
          {
           "say": "npc",
           "t": "一盘饭 RM55！"
          },
          {
           "say": "tat",
           "t": "太贵了……我们找不到吃饭的地方！"
          },
          {
           "flag": "ask2"
          },
          {
           "when": {
            "if": [
             "ask1",
             "ask2"
            ]
           },
           "do": [
            {
             "say": "yen",
             "t": "全部都好贵……再找找看。"
            },
            {
             "quest": "q_cheap"
            }
           ]
          }
         ]
        }
       ]
      },
      {
       "id": "st3",
       "look": "host",
       "name": "角落小店",
       "x": 31,
       "y": 15,
       "talks": [
        {
         "if": "defeated_priceKing",
         "ifNot": "quizF",
         "script": [
          {
           "say": "npc",
           "t": "价格大王走了！我的店价钱最公道！"
          },
          {
           "quiz": "Yen 为什么最喜欢云顶？",
           "who": "npc",
           "a": [
            "因为天气冷",
            "因为有游乐园",
            "因为可以购物"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "对啦，凉凉的最舒服！"
            },
            {
             "exp": 100
            },
            {
             "give": "eggs",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是因为天气冷啦！"
            }
           ]
          },
          {
           "flag": "quizF"
          },
          {
           "say": "yen",
           "t": "终于吃到东西了！"
          },
          {
           "say": "tat",
           "t": "免费酒店 + 便宜晚餐，完美！"
          },
          {
           "say": "sys",
           "t": "全家在凉凉的云顶睡了一个好觉。"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "priceOn",
         "script": [
          {
           "say": "npc",
           "t": "天价大王不让我做生意！"
          }
         ]
        },
        {
         "ifNot": "priceOn",
         "if": [
          "ask1",
          "ask2"
         ],
         "script": [
          {
           "say": "npc",
           "t": "我这里便宜！可是……"
          },
          {
           "say": "sys",
           "t": "天价大王出现了：“这里的东西全部要涨价！”"
          },
          {
           "flag": "priceOn"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_price"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "欢迎光临～"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "price",
       "x": 8,
       "y": 6
      },
      {
       "type": "price",
       "x": 20,
       "y": 7
      },
      {
       "type": "price",
       "x": 28,
       "y": 6
      },
      {
       "type": "price",
       "x": 12,
       "y": 13
      },
      {
       "type": "price",
       "x": 24,
       "y": 12
      },
      {
       "type": "priceKing",
       "x": 28,
       "y": 11,
       "id": "priceKing",
       "boss": true,
       "if": "priceOn",
       "onDefeat": [
        {
         "say": "sys",
         "t": "天价大王被打败了！价格恢复正常！"
        },
        {
         "quest": "q_eat"
        }
       ]
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "ht1",
       "x": 3,
       "y": 21,
       "give": "bento",
       "n": 2,
       "coins": 40
      }
     ],
     "triggers": [
      {
       "id": "inhotel",
       "x": 15,
       "y": 18,
       "w": 7,
       "h": 5,
       "script": [
        {
         "say": "sys",
         "t": "免费酒店！可是肚子好饿……"
        },
        {
         "say": "tat",
         "t": "去美食街找吃的！"
        },
        {
         "quest": "q_food6"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 7,
   "title": "第七章：金马仑 · 太平 · 怡保",
   "years": "全家旅行",
   "yenSkill": "mask",
   "power": 4.8,
   "level": 16,
   "start": {
    "area": "cameron",
    "x": 3,
    "y": 12
   },
   "party": [
    "tat",
    "yen",
    "ze",
    "xiang"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "全家来到金马仑高原！一层一层的茶园好漂亮。"
    },
    {
     "say": "xiang",
     "t": "我要吃草莓！"
    },
    {
     "quest": "q_farm"
    }
   ],
   "endText": "茶园、草莓、动物园，好好玩！",
   "quests": {
    "q_farm": {
     "t": "去找草莓园主",
     "area": "cameron",
     "npc": "farmer"
    },
    "q_berry": {
     "t": "摘 4 盒草莓（下面的草莓田）",
     "area": "cameron",
     "chests": [
      "s1",
      "s2",
      "s3",
      "s4"
     ]
    },
    "q_farmer": {
     "t": "把草莓拿给园主",
     "area": "cameron",
     "npc": "farmer"
    },
    "q_bee": {
     "t": "打败蜂后！",
     "area": "cameron",
     "enemy": "beeQueen"
    },
    "q_farmer2": {
     "t": "回去找草莓园主",
     "area": "cameron",
     "npc": "farmer"
    },
    "q_next7": {
     "t": "出发去太平（右边）",
     "area": "zoo",
     "x": 3,
     "y": 12
    },
    "q_keeperT": {
     "t": "找动物园管理员",
     "area": "zoo",
     "npc": "keeper"
    },
    "q_zoo": {
     "t": "把跑出来的猴子赶回去",
     "area": "zoo",
     "group": "zoo"
    },
    "q_keeper": {
     "t": "回去找管理员",
     "area": "zoo",
     "npc": "keeper"
    }
   },
   "areas": {
    "cameron": {
     "name": "金马仑高原 · 草莓园",
     "theme": "farm",
     "map": [
      "tttttttttttttttttttttttttttttttttttttttt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqhhhhhhhhhhhqt",
      "tqqqqqqqqqqqqqqqqqqqtqqqqqqhhhhhhhhhhhqt",
      "tqqqqqtqqqqqqqqqqqqqqqqqqqqhhhhhhhhhhhqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqhhhhhhhhhhhqt",
      "tqqqqqqqqqqqqqtqqqqqqqqqqqqhhhhhhhhhhhqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqhhhhhxhhhhhqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tddddddddddddddddddddddddddddddddddddddx",
      "tddddddddddddddddddddddddddddddddddddddx",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqjjjjjjjjjjjjjqqqqqjjjjjjjjjjjjjqqqqt",
      "tqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqt",
      "tttttttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [
      {
       "x": 39,
       "y": 11,
       "w": 1,
       "h": 2,
       "need": "defeated_beeQueen",
       "lock": "蜂后还在捣乱！",
       "script": [
        {
         "say": "sys",
         "t": "下一站：太平动物园！路上经过怡保。"
        },
        {
         "goto": "zoo",
         "x": 2,
         "y": 12
        }
       ]
      }
     ],
     "npcs": [
      {
       "id": "farmer",
       "look": "amin",
       "name": "草莓园主",
       "x": 25,
       "y": 10,
       "talks": [
        {
         "if": "defeated_beeQueen",
         "script": [
          {
           "say": "npc",
           "t": "谢谢你们！草莓送给你们！"
          },
          {
           "give": "bento",
           "n": 2
          },
          {
           "quest": "q_next7"
          }
         ]
        },
        {
         "if": "berries",
         "ifNot": "beeOn",
         "script": [
          {
           "say": "npc",
           "t": "摘了好多草莓！可是——小心！"
          },
          {
           "say": "sys",
           "t": "蜂后从温室里飞出来了！"
          },
          {
           "flag": "beeOn"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_bee"
          }
         ]
        },
        {
         "if": "beeOn",
         "script": [
          {
           "say": "npc",
           "t": "快打败蜂后！"
          }
         ]
        },
        {
         "if": "toldBerry",
         "script": [
          {
           "say": "npc",
           "t": "草莓田在下面，摘 4 盒哦！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "欢迎来金马仑！去下面的草莓田摘 4 盒草莓吧！"
          },
          {
           "flag": "toldBerry"
          },
          {
           "quest": "q_berry"
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "bee",
       "x": 8,
       "y": 17
      },
      {
       "type": "bee",
       "x": 14,
       "y": 19
      },
      {
       "type": "bee",
       "x": 26,
       "y": 18
      },
      {
       "type": "bee",
       "x": 31,
       "y": 16
      },
      {
       "type": "bee",
       "x": 10,
       "y": 5
      },
      {
       "type": "bee",
       "x": 22,
       "y": 6
      },
      {
       "type": "beeQueen",
       "x": 32,
       "y": 9,
       "id": "beeQueen",
       "boss": true,
       "if": "beeOn",
       "onDefeat": [
        {
         "say": "sys",
         "t": "蜂后飞走了！"
        },
        {
         "say": "xiang",
         "t": "我要把蜂后画进漫画里！"
        },
        {
         "quest": "q_farmer2"
        }
       ]
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "s1",
       "x": 6,
       "y": 16,
       "look": "berry",
       "script": [
        {
         "say": "sys",
         "t": "摘到一盒草莓！"
        },
        {
         "when": {
          "if": [
           "chest_s1",
           "chest_s2",
           "chest_s3",
           "chest_s4"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "4 盒都摘好了！拿给园主吧。"
          },
          {
           "flag": "berries"
          },
          {
           "quest": "q_farmer"
          }
         ]
        }
       ]
      },
      {
       "id": "s2",
       "x": 14,
       "y": 20,
       "look": "berry",
       "script": [
        {
         "say": "sys",
         "t": "摘到一盒草莓！"
        },
        {
         "when": {
          "if": [
           "chest_s1",
           "chest_s2",
           "chest_s3",
           "chest_s4"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "4 盒都摘好了！拿给园主吧。"
          },
          {
           "flag": "berries"
          },
          {
           "quest": "q_farmer"
          }
         ]
        }
       ]
      },
      {
       "id": "s3",
       "x": 24,
       "y": 20,
       "look": "berry",
       "script": [
        {
         "say": "sys",
         "t": "摘到一盒草莓！"
        },
        {
         "when": {
          "if": [
           "chest_s1",
           "chest_s2",
           "chest_s3",
           "chest_s4"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "4 盒都摘好了！拿给园主吧。"
          },
          {
           "flag": "berries"
          },
          {
           "quest": "q_farmer"
          }
         ]
        }
       ]
      },
      {
       "id": "s4",
       "x": 33,
       "y": 16,
       "look": "berry",
       "script": [
        {
         "say": "sys",
         "t": "摘到一盒草莓！"
        },
        {
         "when": {
          "if": [
           "chest_s1",
           "chest_s2",
           "chest_s3",
           "chest_s4"
          ]
         },
         "do": [
          {
           "say": "yen",
           "t": "4 盒都摘好了！拿给园主吧。"
          },
          {
           "flag": "berries"
          },
          {
           "quest": "q_farmer"
          }
         ]
        }
       ]
      }
     ],
     "triggers": []
    },
    "zoo": {
     "name": "太平动物园",
     "theme": "zoo",
     "map": [
      "tttttttttttttttttttttttttttttttttttttttt",
      "tgggggggggggggggddddddddgggggggggggggggt",
      "tggFFFFFFFFFFgggddddddddgggFFFFFFFFFFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFgwwwggggFgggddddddddgggFggtgggggFggt",
      "tggFgwwwggggFgggddddddddgggFggggggggFggt",
      "tggFgwwwggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFFFFFdFFFFgggddddddddgggFFFFdFFFFFggt",
      "tgggggggggggggggddddddddgggggggggggggggt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tddddddddddddddddddddddddddddddddddddddt",
      "tgggggggggggggggddddddddgggggggggggggggt",
      "tgggggggggggggggddddddddgggggggggggggggt",
      "tggFFFFFdFFFFgggddddddddgggFFFFdFFFFFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggtgFggt",
      "tggFggtgggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFggggggggFgggddddddddgggFggggggggFggt",
      "tggFFFFFFFFFFgggddddddddgggFFFFFFFFFFggt",
      "tgggggggggggggggddddddddgggggggggggggggt",
      "tttttttttttttttttttttttttttttttttttttttt"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "keeper",
       "look": "host",
       "name": "动物园管理员",
       "x": 19,
       "y": 12,
       "talks": [
        {
         "if": "cleared_zoo",
         "ifNot": "quizG",
         "script": [
          {
           "say": "npc",
           "t": "猴子都回笼子了！谢谢你们！"
          },
          {
           "quiz": "全家去过的这个动物园在哪里？",
           "who": "npc",
           "a": [
            "太平",
            "怡保",
            "合艾"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "对，太平动物园！"
            },
            {
             "exp": 120
            },
            {
             "give": "eggs",
             "n": 1
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "这里是太平啦！"
            }
           ]
          },
          {
           "flag": "quizG"
          },
          {
           "say": "yen",
           "t": "下一次旅行去哪里？"
          },
          {
           "say": "tat",
           "t": "去合艾！"
          },
          {
           "end": true
          }
         ]
        },
        {
         "ifNot": "cleared_zoo",
         "script": [
          {
           "say": "npc",
           "t": "糟糕！猴子跑出笼子了，帮我把它们赶回去！"
          },
          {
           "quest": "q_zoo"
          }
         ]
        }
       ]
      },
      {
       "id": "ipoh",
       "look": "auntie",
       "name": "怡保阿姨",
       "x": 12,
       "y": 12,
       "talks": [
        {
         "script": [
          {
           "say": "npc",
           "t": "从怡保带来的芽菜鸡！好好吃哦！"
          },
          {
           "choice": "怡保阿姨：要买芽菜鸡吗？（回满体力）",
           "who": "npc",
           "opts": [
            {
             "t": "买芽菜鸡（30 金币）",
             "ops": [
              {
               "buy": "chicken",
               "price": 30
              }
             ]
            },
            {
             "t": "不用了",
             "ops": []
            }
           ]
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "monkey",
       "x": 10,
       "y": 6,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 31,
       "y": 6,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 7,
       "y": 19,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 31,
       "y": 20,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 26,
       "y": 12,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 19,
       "y": 20,
       "group": "zoo"
      },
      {
       "type": "monkey",
       "x": 19,
       "y": 4,
       "group": "zoo"
      }
     ],
     "groups": {
      "zoo": [
       {
        "say": "sys",
        "t": "猴子全部回笼子了！"
       },
       {
        "quest": "q_keeper"
       }
      ]
     },
     "chests": [
      {
       "id": "z1",
       "x": 37,
       "y": 24,
       "give": "bento",
       "n": 2,
       "coins": 50
      }
     ],
     "triggers": [
      {
       "id": "inzoo",
       "x": 1,
       "y": 9,
       "w": 4,
       "h": 6,
       "script": [
        {
         "say": "sys",
         "t": "太平动物园到了！"
        },
        {
         "quest": "q_keeperT"
        }
       ]
      }
     ]
    }
   }
  },
  {
   "chapter": 8,
   "title": "第八章：合艾之旅",
   "years": "2026",
   "yenSkill": "mask",
   "power": 5.4,
   "level": 18,
   "start": {
    "area": "hhotel",
    "x": 2,
    "y": 7
   },
   "party": [
    "tat",
    "yen",
    "ze",
    "xiang"
   ],
   "intro": [
    {
     "say": "sys",
     "t": "2026 年 7 月 29 日，全家出发去合艾！"
    },
    {
     "say": "sys",
     "t": "晚上，酒店走廊黑漆漆的……"
    },
    {
     "say": "yen",
     "t": "Tat……我怕鬼……你走前面！"
    },
    {
     "say": "tat",
     "t": "别怕，有我在！"
    },
    {
     "quest": "q_ghost"
    }
   ],
   "endText": "全家一起的旅行，最开心！",
   "quests": {
    "q_ghost": {
     "t": "赶走走廊里的小鬼",
     "area": "hhotel",
     "group": "ghosts"
    },
    "q_go8": {
     "t": "去夜市（走廊右边）",
     "area": "market",
     "x": 3,
     "y": 12
    },
    "q_eggs": {
     "t": "找番茄炒蛋摊（右边）",
     "area": "market",
     "npc": "egg8"
    },
    "q_gourd": {
     "t": "最终决战：打败苦瓜大王！",
     "area": "market",
     "enemy": "gourdKing"
    },
    "q_final": {
     "t": "回番茄炒蛋摊",
     "area": "market",
     "npc": "egg8"
    }
   },
   "areas": {
    "hhotel": {
     "name": "合艾 · 酒店走廊（晚上）",
     "theme": "hotel",
     "night": true,
     "map": [
      "####################################",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "#l.................................#",
      "#..................................#",
      "#.........p.................p......x",
      "#..................................x",
      "#...................p..............#",
      "#..................................#",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "#..bbb..bbb..bbb..bbb..bbb..bbb....#",
      "####################################"
     ],
     "saves": [
      [
       2,
       7
      ]
     ],
     "exits": [
      {
       "x": 35,
       "y": 6,
       "w": 1,
       "h": 2,
       "need": "cleared_ghosts",
       "lock": "Yen：走廊有鬼……我不敢过去！",
       "script": [
        {
         "say": "sys",
         "t": "天亮了！全家出发去夜市……其实是先睡到晚上再去！"
        },
        {
         "goto": "market",
         "x": 2,
         "y": 12
        }
       ]
      }
     ],
     "npcs": [],
     "enemies": [
      {
       "type": "ghost",
       "x": 9,
       "y": 7,
       "group": "ghosts"
      },
      {
       "type": "ghost",
       "x": 15,
       "y": 5,
       "group": "ghosts"
      },
      {
       "type": "ghost",
       "x": 21,
       "y": 8,
       "group": "ghosts"
      },
      {
       "type": "ghost",
       "x": 27,
       "y": 7,
       "group": "ghosts"
      },
      {
       "type": "ghost",
       "x": 31,
       "y": 5,
       "group": "ghosts"
      }
     ],
     "groups": {
      "ghosts": [
       {
        "say": "sys",
        "t": "小鬼全部被赶跑了！"
       },
       {
        "say": "yen",
        "t": "……今晚我还是要抱着你睡。"
       },
       {
        "say": "tat",
        "t": "好啦好啦，有我在。"
       },
       {
        "quest": "q_go8"
       }
      ]
     },
     "chests": [
      {
       "id": "hh1",
       "x": 33,
       "y": 4,
       "give": "bento",
       "n": 2,
       "coins": 40
      }
     ],
     "triggers": []
    },
    "market": {
     "name": "合艾夜市 · 2026",
     "theme": "market",
     "night": true,
     "map": [
      "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hssssssssssssssssssssssssssssssssssssssssssh",
      "hsslssssssslssssssslssssssslssssssslsssssssh",
      "hssssssssssssssssssssssssssssssssssssssssssh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrrrrh",
      "hrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrrrrh",
      "hrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrCCCrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh",
      "hssssssssssssssssssssssssssssssssssssssssssh",
      "hsslssssssslssssssslssssssslssssssslsssssssh",
      "hssssssssssssssssssssssssssssssssssssssssssh",
      "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
     ],
     "saves": [
      [
       3,
       12
      ]
     ],
     "exits": [],
     "npcs": [
      {
       "id": "egg8",
       "look": "auntie",
       "name": "番茄炒蛋摊",
       "x": 35,
       "y": 9,
       "talks": [
        {
         "if": "defeated_gourdKing",
         "ifNot": "quizH",
         "script": [
          {
           "say": "npc",
           "t": "苦瓜大王走了！番茄炒蛋马上好！最后一题："
          },
          {
           "quiz": "全家是哪一天出发去合艾的？",
           "who": "npc",
           "a": [
            "2026 年 7 月 29 日",
            "2025 年 12 月 25 日",
            "2026 年 1 月 1 日"
           ],
           "ok": 0,
           "good": [
            {
             "say": "npc",
             "t": "答对了！"
            },
            {
             "exp": 150
            }
           ],
           "bad": [
            {
             "say": "npc",
             "t": "是 2026 年 7 月 29 日啦！"
            }
           ]
          },
          {
           "flag": "quizH"
          },
          {
           "say": "yen",
           "t": "番茄炒蛋！我的最爱！"
          },
          {
           "say": "xiang",
           "t": "我还要吃！我还要吃！"
          },
          {
           "say": "ze",
           "t": "我吃一点点就好……"
          },
          {
           "say": "tat",
           "t": "我常常开玩笑说，你应该去找一个有钱的丈夫……"
          },
          {
           "say": "yen",
           "t": "傻瓜，一家四口在一起就够了。"
          },
          {
           "say": "tat",
           "t": "（我不太会说话，但是我会一直任劳任怨，照顾这个家。）"
          },
          {
           "say": "sys",
           "t": "从 2011 年到 2026 年，Tat、Yen、Ze 和 Xiang 的冒险……还在继续！"
          },
          {
           "end": true
          }
         ]
        },
        {
         "if": "gourdOn",
         "script": [
          {
           "say": "npc",
           "t": "苦瓜大王把我的番茄全部换成苦瓜了！"
          }
         ]
        },
        {
         "script": [
          {
           "say": "npc",
           "t": "番茄炒蛋？今天的番茄……"
          },
          {
           "say": "sys",
           "t": "苦瓜大王跳了出来：“今天全部吃苦瓜！”"
          },
          {
           "say": "yen",
           "t": "我最讨厌苦瓜了！！"
          },
          {
           "flag": "gourdOn"
          },
          {
           "spawn": true
          },
          {
           "quest": "q_gourd"
          }
         ]
        }
       ]
      },
      {
       "id": "food8",
       "look": "pop",
       "name": "烧烤摊",
       "x": 11,
       "y": 9,
       "talks": [
        {
         "script": [
          {
           "say": "npc",
           "t": "合艾烧烤！"
          },
          {
           "say": "xiang",
           "t": "好吃！"
          },
          {
           "say": "ze",
           "t": "我不饿……"
          },
          {
           "choice": "烧烤摊：买一份？（回一半体力）",
           "who": "npc",
           "opts": [
            {
             "t": "买烧烤（20 金币）",
             "ops": [
              {
               "buy": "bento",
               "price": 20
              }
             ]
            },
            {
             "t": "不用了",
             "ops": []
            }
           ]
          }
         ]
        }
       ]
      }
     ],
     "enemies": [
      {
       "type": "tuktuk",
       "x": 10,
       "y": 12
      },
      {
       "type": "tuktuk",
       "x": 24,
       "y": 11
      },
      {
       "type": "tuktuk",
       "x": 36,
       "y": 13
      },
      {
       "type": "gourd",
       "x": 16,
       "y": 10
      },
      {
       "type": "gourd",
       "x": 30,
       "y": 18
      },
      {
       "type": "gourd",
       "x": 20,
       "y": 4
      },
      {
       "type": "mosquito",
       "x": 8,
       "y": 18
      },
      {
       "type": "mosquito",
       "x": 38,
       "y": 4
      },
      {
       "type": "gourdKing",
       "x": 26,
       "y": 12,
       "id": "gourdKing",
       "boss": true,
       "if": "gourdOn",
       "onDefeat": [
        {
         "say": "sys",
         "t": "苦瓜大王被打败了！番茄回来了！"
        },
        {
         "quest": "q_final"
        }
       ]
      }
     ],
     "groups": {},
     "chests": [
      {
       "id": "mk1",
       "x": 42,
       "y": 22,
       "give": "eggs",
       "n": 2,
       "coins": 60
      }
     ],
     "triggers": [
      {
       "id": "inmk",
       "x": 1,
       "y": 9,
       "w": 4,
       "h": 6,
       "script": [
        {
         "say": "sys",
         "t": "2026 年 7 月 29 日，合艾夜市！"
        },
        {
         "say": "yen",
         "t": "我要吃番茄炒蛋！"
        },
        {
         "quest": "q_eggs"
        }
       ]
      }
     ]
    }
   }
  }
 ]
};
