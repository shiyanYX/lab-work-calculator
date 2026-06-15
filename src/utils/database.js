// 数据库操作工具
import { getAbnormalityData } from '../data/abnormalities.js';
import { getEgoArmorData } from '../data/ego-armor.js';

// 数据库名称和版本
const DB_NAME = 'lobotomy-corporation';
const DB_VERSION = 16;
let db = null;

// 打开数据库
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('数据库打开失败:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 创建异想体表
      if (!db.objectStoreNames.contains('abnormalities')) {
        const store = db.createObjectStore('abnormalities', { keyPath: 'id' });
        store.createIndex('level', 'level', { unique: false });
        store.createIndex('damageType', 'damageType', { unique: false });
      }

      // 创建E.G.O护甲表
      if (!db.objectStoreNames.contains('egoArmor')) {
        const store = db.createObjectStore('egoArmor', { keyPath: 'name' });
        store.createIndex('level', 'level', { unique: false });
      }
    };
  });
}

// 初始化数据库并添加游戏数据
async function initializeDatabase() {
  await openDatabase();

  // 检查是否已有异想体数据
  const count = await countAbnormalities();
  if (count === 0) {
    await addAbnormalities(getAbnormalityData());
  }

  // 检查是否已有E.G.O护甲数据
  const armorCount = await countEgoArmor();
  if (armorCount === 0) {
    await addEgoArmor(getEgoArmorData());
  }
}

// 统计异想体数量
function countAbnormalities() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 添加多个异想体
function addAbnormalities(abnormalities) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readwrite');
    const store = transaction.objectStore('abnormalities');

    let count = 0;
    const total = abnormalities.length;

    abnormalities.forEach(abnormality => {
      const request = store.put(abnormality);
      request.onsuccess = () => {
        count++;
        if (count === total) {
          resolve(count);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// 获取所有异想体
function getAllAbnormalities() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据等级获取异想体
function getAbnormalitiesByLevel(level) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const index = store.index('level');
    const request = index.getAll(level);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据ID获取异想体
function getAbnormalityById(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 统计E.G.O护甲数量
function countEgoArmor() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    // 检查egoArmor表是否存在
    if (!db.objectStoreNames.contains('egoArmor')) {
      resolve(0);
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 添加多个E.G.O护甲
function addEgoArmor(armors) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readwrite');
    const store = transaction.objectStore('egoArmor');

    let count = 0;
    const total = armors.length;

    armors.forEach(armor => {
      const request = store.put(armor);
      request.onsuccess = () => {
        count++;
        if (count === total) {
          resolve(count);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// 获取所有E.G.O护甲
function getAllEgoArmor() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据等级获取E.G.O护甲
function getEgoArmorByLevel(level) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const index = store.index('level');
    const request = index.getAll(level);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据名称获取E.G.O护甲
function getEgoArmorByName(name) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.get(name);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export {
  openDatabase,
  initializeDatabase,
  getAllAbnormalities,
  getAbnormalitiesByLevel,
  getAbnormalityById,
  getAllEgoArmor,
  getEgoArmorByLevel,
  getEgoArmorByName
};
