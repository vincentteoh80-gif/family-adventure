/* 第一章数据 —— 对话、任务、地图都在这里，直接改文字就能更新。
   地图：# 墙  , 地毯  . 地板  D 办公桌  V 售货机  K 咖啡机  T 桌子  p 盆栽  x 门口
   g 草地  r 马路  s 人行道  h 建筑  t 树  w 水  B 长椅  l 路灯  f 花  A 舞台  P 柱子  = 红地毯  L 锁住的门  M 镜子 */
window.RPG_DATA = {
 "chapter": 1,
 "title": "第一章：相遇与婚礼",
 "next": "第二章：巴厘岛与两个宝贝（制作中）",
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
   "t": "把报告交给 Yen",
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
   "t": "和 Yen 走进电影院",
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
         "say": "tat",
         "t": "（她就是新来的同事 Yen……好紧张。）"
        },
        {
         "say": "tat",
         "t": "你、你好！我是 Tat，坐在那边。"
        },
        {
         "say": "yen",
         "t": "你好～ 不好意思，我现在好烦……"
        },
        {
         "say": "yen",
         "t": "我的报告被文件怪抢走了！下班前一定要交。"
        },
        {
         "say": "tat",
         "t": "交给我！我帮你抢回来！"
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
         "t": "那个……下班以后，要不要……一起去看电影？"
        },
        {
         "say": "yen",
         "t": "……好啊！"
        },
        {
         "say": "tat",
         "t": "（耶！！！）"
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
         "t": "加油！打败加班大魔王，我们就可以下班了！"
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
         "t": "我看到你一直偷看 Yen 哦～ 嘻嘻。"
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
         "who": "sys",
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
       "t": "两人走进电影院，看了第一场电影……"
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
       "t": "就这样，Tat 和 Yen 开始约会了。"
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
     "type": "germ",
     "x": 6,
     "y": 22
    },
    {
     "type": "germ",
     "x": 14,
     "y": 23
    },
    {
     "type": "germ",
     "x": 18,
     "y": 19
    },
    {
     "type": "germ",
     "x": 40,
     "y": 13
    },
    {
     "type": "germ",
     "x": 33,
     "y": 21
    },
    {
     "type": "germ",
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
       "t": "晚上街上好多流感病菌！出门一定要戴口罩！"
      },
      {
       "say": "sys",
       "t": "Yen 加入了队伍！按“换人”可以切换 Tat / Yen。"
      },
      {
       "say": "sys",
       "t": "Yen 的普通攻击是远距离的“叮嘱声波”；技能是“口罩护盾”：一段时间不受伤，还会帮全队回血。"
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
         "say": "yen",
         "t": "Tat！不准喝！把它打跑！"
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
       "t": "（朋友们说在酒吧角等我喝一杯……）"
      },
      {
       "say": "yen",
       "t": "Tat！你哪里都不准去！"
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
};
