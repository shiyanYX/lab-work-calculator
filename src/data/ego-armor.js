// E.G.O护甲基础数据
function getEgoArmorData() {
  return [
    // ZAYIN级
    { name: '忏悔', level: 'ZAYIN', resistances: { physical: 0.9, mental: 0.8, corrosion: 0.9, soul: 2.0 } },
    { name: '美味苏打', level: 'ZAYIN', resistances: { physical: 0.8, mental: 1.0, corrosion: 1.0, soul: 2.0 } },
    { name: '翅振', level: 'ZAYIN', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.0, soul: 2.0 } },
    { name: '谢顶之灾', level: 'ZAYIN', resistances: { physical: 1.0, mental: 1.0, corrosion: 0.8, soul: 2.0 } },

    // TETH级
    { name: '终末火柴之光', level: 'TETH', resistances: { physical: 0.6, mental: 1.0, corrosion: 1.2, soul: 2.0 } },
    { name: '孤独', level: 'TETH', resistances: { physical: 1.5, mental: 0.8, corrosion: 0.8, soul: 2.0 } },
    { name: '刺耳嚎叫', level: 'TETH', resistances: { physical: 1.2, mental: 0.6, corrosion: 1.0, soul: 2.0 } },
    { name: '噪音', level: 'TETH', resistances: { physical: 1.2, mental: 0.7, corrosion: 0.6, soul: 2.0 } },
    { name: '赤瞳', level: 'TETH', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 2.0 } },
    { name: '犄角', level: 'TETH', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.2, soul: 2.0 } },
    { name: '割腕者', level: 'TETH', resistances: { physical: 1.0, mental: 0.6, corrosion: 1.2, soul: 2.0 } },
    { name: '悔恨', level: 'TETH', resistances: { physical: 0.7, mental: 1.2, corrosion: 0.8, soul: 2.0 } },
    { name: '小喙', level: 'TETH', resistances: { physical: 0.7, mental: 0.8, corrosion: 1.2, soul: 2.0 } },
    { name: '彼方的裂片', level: 'TETH', resistances: { physical: 1.0, mental: 1.2, corrosion: 0.6, soul: 2.0 } },
    { name: '决死之心', level: 'TETH', resistances: { physical: 0.6, mental: 0.9, corrosion: 0.9, soul: 2.0 } },
    { name: '诱捕幻灯', level: 'TETH', resistances: { physical: 0.8, mental: 0.7, corrosion: 1.2, soul: 2.0 } },
    { name: '此刻的神色', level: 'TETH', resistances: { physical: 0.7, mental: 0.6, corrosion: 1.5, soul: 2.0 } },
    { name: '迷魂梦境', level: 'TETH', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.7, soul: 2.0 } },
    { name: '落樱', level: 'TETH', resistances: { physical: 1.2, mental: 0.6, corrosion: 0.7, soul: 2.0 } },
    { name: '超特么可爱！！！', level: 'TETH', resistances: { physical: 0.8, mental: 1.5, corrosion: 0.8, soul: 2.0 } },

    // HE级
    { name: '熊熊抱', level: 'HE', resistances: { physical: 0.8, mental: 1.0, corrosion: 1.0, soul: 1.5 } },
    { name: '血之渴望', level: 'HE', resistances: { physical: 0.5, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '泣婴', level: 'HE', resistances: { physical: 1.2, mental: 0.5, corrosion: 0.8, soul: 1.5 } },
    { name: '伐木工', level: 'HE', resistances: { physical: 0.8, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '霜之碎片', level: 'HE', resistances: { physical: 1.3, mental: 0.6, corrosion: 0.8, soul: 1.5 } },
    { name: '粉碎机Mk4', level: 'HE', resistances: { physical: 0.6, mental: 1.3, corrosion: 0.9, soul: 1.5 } },
    { name: '悲惨圣诞', level: 'HE', resistances: { physical: 0.8, mental: 0.6, corrosion: 1.3, soul: 1.5 } },
    { name: '小小银河', level: 'HE', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.2, soul: 1.5 } },
    { name: '蕾蒂希娅', level: 'HE', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '圣宣', level: 'HE', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.5, soul: 1.5 } },
    { name: '魔弹', level: 'HE', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '凝视', level: 'HE', resistances: { physical: 1.0, mental: 0.8, corrosion: 1.0, soul: 1.5 } },
    { name: '猎头长耙', level: 'HE', resistances: { physical: 0.6, mental: 0.8, corrosion: 1.3, soul: 1.5 } },
    { name: '因乐癫狂', level: 'HE', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.8, soul: 1.5 } },

    // WAW级
    { name: '以爱与恨之名', level: 'WAW', resistances: { physical: 0.7, mental: 0.8, corrosion: 0.4, soul: 2.0 } },
    { name: '目灯', level: 'WAW', resistances: { physical: 0.8, mental: 0.7, corrosion: 0.4, soul: 1.5 } },
    { name: '绿色枝干', level: 'WAW', resistances: { physical: 0.8, mental: 1.2, corrosion: 0.6, soul: 1.5 } },
    { name: '黄蜂', level: 'WAW', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '余香', level: 'WAW', resistances: { physical: 1.2, mental: 0.6, corrosion: 0.8, soul: 1.5 } },
    { name: '猩红创痕', level: 'WAW', resistances: { physical: 0.6, mental: 0.6, corrosion: 0.6, soul: 1.5 } },
    { name: '郁蓝创痕', level: 'WAW', resistances: { physical: 0.4, mental: 0.8, corrosion: 0.7, soul: 2.0 } },
    { name: '闪金冲锋', level: 'WAW', resistances: { physical: 0.4, mental: 0.7, corrosion: 0.8, soul: 2.0 } },
    { name: '荧光菌孢', level: 'WAW', resistances: { physical: 0.8, mental: 0.6, corrosion: 1.2, soul: 1.5 } },
    { name: '黑天鹅', level: 'WAW', resistances: { physical: 0.6, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '沉醉', level: 'WAW', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 1.5 } },
    { name: '穿刺极乐', level: 'WAW', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.6, soul: 1.5 } },
    { name: '盈泪之剑', level: 'WAW', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 0.8 } },
    { name: '脱落之皮', level: 'WAW', resistances: { physical: 0.6, mental: 0.8, corrosion: 1.2, soul: 1.5 } },
    { name: '荣耀之羽', level: 'WAW', resistances: { physical: 0.6, mental: 0.6, corrosion: 1.3, soul: 2.0 } },
    { name: '不和', level: 'WAW', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.6, soul: 1.5 } },
    { name: '月光', level: 'WAW', resistances: { physical: 0.8, mental: 0.4, corrosion: 0.7, soul: 2.0 } },
    { name: '伪善', level: 'WAW', resistances: { physical: 0.7, mental: 0.5, corrosion: 1.3, soul: 1.5 } },
    { name: '无量', level: 'WAW', resistances: { physical: 0.5, mental: 1.3, corrosion: 0.7, soul: 1.5 } },

    // ALEPH级
    { name: '拟态', level: 'ALEPH', resistances: { physical: 0.2, mental: 0.5, corrosion: 0.5, soul: 1.0 } },
    { name: 'Da Capo', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.2, corrosion: 0.5, soul: 1.5 } },
    { name: '失乐园', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.5, soul: 0.3 } },
    { name: '正义裁决者', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.5, soul: 0.5 } },
    { name: '薄暝', level: 'ALEPH', resistances: { physical: 0.3, mental: 0.3, corrosion: 0.3, soul: 0.5 } },
    { name: '笑靥', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.2, soul: 1.0 } },
    { name: '新星之声', level: 'ALEPH', resistances: { physical: 0.4, mental: 0.4, corrosion: 0.4, soul: 1.0 } },
    { name: '粉红军备', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.3, corrosion: 0.4, soul: 1.0 } },
    { name: '爱慕', level: 'ALEPH', resistances: { physical: 0.3, mental: 0.6, corrosion: 0.3, soul: 1.0 } }
  ];
}

export { getEgoArmorData };
